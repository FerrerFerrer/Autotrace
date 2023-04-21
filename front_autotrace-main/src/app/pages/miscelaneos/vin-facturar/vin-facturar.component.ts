import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioServiceService } from '@services/usuario-service.service';
import { VinService } from '@services/vin.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-vin-facturar',
  templateUrl: './vin-facturar.component.html',
  styleUrls: ['./vin-facturar.component.scss']
})
export class VinFacturarComponent implements OnInit {
  form: FormGroup;
  dtTrigger = new Subject<any>();
  dtOptions: any = {};
  public mostrarTabla = true;
  public listaFiltroTabla: any[] = [];
  listUsuarios: any[] = [];

  constructor(private fb: FormBuilder, private _serviceUsaurios: UsuarioServiceService,
    private _serviceVin: VinService,
    private spinner: NgxSpinnerService) {
    this.form = this.fb.group({
      fechaIni: ['', Validators.required],
      fechaFin: ['', Validators.required],
      usuarios: ['']
    });
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

    this.obtenerListaUsuarios();
  }

  filtro() {

    let cadenaUsuraios: string = '';

    this.mostrarTabla = false;
    const fechaIn = this.form.get('fechaIni')?.value + " 00:00:00";
    const fechaFin = this.form.get('fechaFin')?.value + " 23:59:59";
    let usuarios = this.form.get('usuarios')?.value;
    let localidad = (localStorage.getItem('idlocalidad'));


    if (!usuarios || usuarios == '') {
      usuarios = 0;
      cadenaUsuraios = '0';
    }

    for (let i = 0; i < usuarios.length; i++) {
      if (i == usuarios.length - 1) {
        cadenaUsuraios = cadenaUsuraios + "'" + usuarios[i] + "'";
      } else {
        cadenaUsuraios = cadenaUsuraios + "'" + usuarios[i] + "',";
      }

    }

    console.log(cadenaUsuraios);

    if (fechaFin && fechaIn && this.form.valid) {
      if (fechaFin > fechaIn) {
        this.spinner.show();
        this._serviceVin.vinsFacturar(fechaIn, fechaFin, localidad, cadenaUsuraios).subscribe(data => {
          this.listaFiltroTabla = data[0];
          this.mostrarTabla = true;
          this.spinner.hide();
        }, error => {
          this.spinner.hide();
          console.log(error);
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Verificar Fechas Seleccionadas'
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Es necesario introducir fechas'
      });
    }
  }

  obtenerListaUsuarios() {
    this._serviceUsaurios.getListUsuarios().subscribe(
      (data) => {
        this.listUsuarios = data[0];
      },
      (error) => {
        console.log(error);
      }
    );
  }


  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
