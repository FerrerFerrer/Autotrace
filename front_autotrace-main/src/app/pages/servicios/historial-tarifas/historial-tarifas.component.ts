import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { HistorialTarifasService } from '@services/historial-tarifas.service';
import { TipoServicioService } from '@services/tipo-servicio.service';
import { UsuarioServiceService } from '@services/usuario-service.service';

@Component({
  selector: 'app-historial-tarifas',
  templateUrl: './historial-tarifas.component.html',
  styleUrls: ['./historial-tarifas.component.scss']
})
export class HistorialTarifasComponent implements OnInit {

  mostrarTabla: boolean = false;
  dtOptions: any = {};
  listUsuarios: any[];
  dtTrigger = new Subject<any>();
  formBusqueda: FormGroup;

  listTipoServicio: any[] = [];
  listResultBusqueda: any[] = [];

  constructor(private fb: FormBuilder,
    private _historialTarifasServices: HistorialTarifasService,
    private _tipoServicio: TipoServicioService,
    private spinner: NgxSpinnerService,
    private _serviceUsaurios: UsuarioServiceService) {
    this.formBusqueda = this.fb.group({
      TipoServicio: [],
      FechaInicial: ['', [Validators.required]],
      FechaFinal: ['', [Validators.required]],
      Usuarios: []
    })
  }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      serverSide: false,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        'csv',
        'excel',
        {
          extend: 'pdfHtml5',
          orientation: 'landscape',
          pageSize: 'LEGAL',
          title: 'AutoTracePDF',
          filename: 'AutoTracePDF',
        },
        'colvis'
      ],
      language: {
        "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
      }
    };
    this.obtenerUsuarios();
    this.obtenerTipoServicio();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  obtenerUsuarios() {
    this._serviceUsaurios.getListUsuarios().subscribe(
      (data) => {
        this.listUsuarios = data[0];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  obtenerTipoServicio() {
    this._tipoServicio.getListTipoServicio().subscribe(data => {
      this.listTipoServicio = data[0];
    })
  }

  buscar() {
    this.spinner.show();
    this.mostrarTabla = false;
    const fechaIn = this.formBusqueda.get('FechaInicial')?.value + " 00:00:00";
    const fechaFin = this.formBusqueda.get('FechaFinal')?.value + " 23:59:59";
    let tipoServicio = this.formBusqueda.get('TipoServicio')?.value;
    let usuario = this.formBusqueda.get('Usuarios').value;


    if (!tipoServicio) {
      tipoServicio = null;
    }
    if (!usuario) {
      usuario = null;
    }

    if (fechaFin && fechaIn) {
      if (fechaFin > fechaIn) {
        this._historialTarifasServices.busqueda(fechaIn, fechaFin, usuario, tipoServicio).
          subscribe(data => {
            this.mostrarTabla = true;
            this.listResultBusqueda = data[0];
            this.spinner.hide();
          }, error => {
            this.spinner.hide();
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.message
            });
          });
      } else {
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Verificar Fechas Seleccionadas'
        });
      }
    } else {
      this.spinner.hide();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Es necesario introducir fechas'
      });
    }
  }
}
