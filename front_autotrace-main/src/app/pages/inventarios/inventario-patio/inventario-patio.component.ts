import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalHistorialVinComponent } from '@pages/historial/modal-historial-vin/modal-historial-vin.component';
import { ClientesService } from '@services/clientes.service';
import { GeocercasService } from '@services/geocercas.service';
import { InventariopatioService } from '@services/inventariopatio.service';
import { SelectLocalidadService } from '@services/select-localidad.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-inventario-patio',
  templateUrl: './inventario-patio.component.html',
  styleUrls: ['./inventario-patio.component.scss']
})
export class InventarioPatioComponent implements OnInit {

  public listMarcas: any[] = [];
  public listTabla: any[] = [];
  public listLocalidad: any[] = [];
  public geocercasList: any[] = [];
  public mostrarTabla: boolean = true;

  form: FormGroup;

  dtOptions: any = {};
  modalOptions: { backdrop: string; backdropClass: string; };
  constructor(private router: Router, private modalService: NgbModal,
    private _geocercaService: GeocercasService,
    private selectService: SelectLocalidadService,
    private _clientesService: ClientesService, private fb: FormBuilder,
    private _inventarioPatioService: InventariopatioService,
    private spinner: NgxSpinnerService) {
    this.form = this.fb.group({
      marcas: [''],
      geocercaControl: [''],
      holdMarker: ['']

    });


  }

  ngOnInit(): void {
    this.obtenerMarcas();
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

    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
    }
    this.geocercasLocalidad(localStorage.getItem('idlocalidad'));
    this.selectService.cambioLocalidad.subscribe((cambio) => {
      this.geocercasLocalidad(
        localStorage.getItem('idlocalidad')
      );
    });
  }

  obtenerMarcas() {
    this._clientesService.getListClientes().subscribe(
      (data) => {
        //this.listMarcas = [];
        this.listMarcas = data[0];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  filtroTabla() {
    this.spinner.show();
    let marcas: number;
    let holdMarker: number;
    let geocercas: string;

    if (this.form.get('holdMarker')?.value) {
      holdMarker = 1;
    } else {
      holdMarker = 0;
    }

    if (this.form.get('marcas')?.value) {
      marcas = this.form.get('marcas')?.value;
    } else {
      marcas = 0;
    }


    if (this.form.get('geocercaControl')?.value) {
      geocercas = this.form.get('geocercaControl')?.value;
    } else {
      geocercas = '0';
    }

    console.log('marcas: ' + marcas + '\nholdMarker: ' + holdMarker + '\ngeocercas: ' + geocercas + '\nLocalidad' + localStorage.getItem("idlocalidad"));

    this.mostrarTabla = false;
    this._inventarioPatioService.obtenerInventarioPatio(holdMarker, marcas, geocercas, localStorage.getItem("idlocalidad")).subscribe(
      data => {

        // console.log(data[0]);
        this.listTabla = data[0];
        this.mostrarTabla = true;
        this.spinner.hide();
      }, error => {
        console.log(error);
        this.spinner.hide();
      }
    )
  }

  public geocercasLocalidad(id: string) {
    this._geocercaService.getListGeocercasLocalidad(id).subscribe(
      (data) => {
        this.geocercasList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }


  abrirModalHistorialVin(vin: string) {
    const modalRef = this.modalService.open(ModalHistorialVinComponent, { size: 'xl' });
    modalRef.componentInstance.titulo = 'Historial Vin';
    modalRef.componentInstance.vin = vin;
  }



}
