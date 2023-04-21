import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ModalAgregarTipoServicioComponent } from './modal-agregar-tipo-servicio/modal-agregar-tipo-servicio.component';
import { ModalEditarTipoServicioComponent } from './modal-editar-tipo-servicio/modal-editar-tipo-servicio.component';
import { ModalDocAprobacionComponent } from './modal-doc-aprobacion/modal-doc-aprobacion.component';
import { ModalDocCotizacionComponent } from './modal-doc-cotizacion/modal-doc-cotizacion.component';
import { ModalDocRequerimientoComponent } from './modal-doc-requerimiento/modal-doc-requerimiento.component';
import { ModalCambiarEstadoServicioComponent } from './modal-cambiar-estado-servicio/modal-cambiar-estado-servicio.component';
import { TipoServicioService } from '@services/tipo-servicio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-tipo-servicio',
  templateUrl: './tipo-servicio.component.html',
  styleUrls: ['./tipo-servicio.component.scss']
})
export class TipoServicioComponent implements OnInit {

  dtOptions: any = {};

  listaClientes: any[];
  listTipoServicio: any[];
  mostrarTabla: boolean = false;
  form: FormGroup;

  listaLocalidades: any[];

  modalOptions: NgbModalOptions;
  dtTrigger = new Subject<any>();

  constructor(private modalService: NgbModal,
    private _serviceTipoServicio: TipoServicioService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      patronBusqueda: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
    this.obtenerListaTipoServicio();
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
      backdropClass: 'customBackdrop'
    }
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }



  obtenerListaTipoServicio() {
    this.spinner.show();
    this._serviceTipoServicio.getListTipoServicio().subscribe(
      (data) => {
        this.spinner.hide();
        this.listTipoServicio = data[0];
        this.mostrarTabla = true;
      },
      (error) => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }

  filtroPatron() {
    this.spinner.show();
    const cadena = this.form.get('patronBusqueda')?.value;

    if (cadena != '') {
      this.mostrarTabla = false;
      this._serviceTipoServicio.buscarPatronTipoServicio(cadena).subscribe(
        (data) => {
          this.spinner.hide();
          this.listTipoServicio = data[0];
          this.mostrarTabla = true;
        },
        (error) => {
          this.spinner.hide();
          console.log(error);
        }
      );
    } else {
      this.obtenerListaTipoServicio();;
    }
  }


  abrirModalAgregar() {
    const modalRef = this.modalService.open(ModalAgregarTipoServicioComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.tituloModal = 'Agregar tipo de servicio';

    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerListaTipoServicio();
    });


  }

  abrirModalEditar(row) {
    const modalRef = this.modalService.open(ModalEditarTipoServicioComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.tituloModal = 'Editar tipo de servicio';
    modalRef.componentInstance.datos = row;


    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerListaTipoServicio();
    });
  }

  abrirModalDocAprobacion(row) {
    const modalRef = this.modalService.open(ModalDocAprobacionComponent, {
      size: 'md'
    });
    modalRef.componentInstance.tituloModal = 'Documento de aprobación';
    modalRef.componentInstance.datos = row;
    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerListaTipoServicio();
    });
  }


  abrirModalDocCotizacion(row) {
    const modalRef = this.modalService.open(ModalDocCotizacionComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.tituloModal = 'Documento de cotización';
    modalRef.componentInstance.datos = row;

    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerListaTipoServicio();
    });
  }


  abrirModalDocRequerimiento(row) {
    const modalRef = this.modalService.open(ModalDocRequerimientoComponent, {
      size: 'md'
    });
    modalRef.componentInstance.tituloModal = 'Documento de requerimiento';
    modalRef.componentInstance.datos = row;
    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerListaTipoServicio();
    });
  }

  abrirModalCambiarEstado(row) {
    const modalRef = this.modalService.open(ModalCambiarEstadoServicioComponent, {
      size: 'md'
    });
    modalRef.componentInstance.tituloModal = 'Cambiar estado';
    modalRef.componentInstance.datos = row;


    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerListaTipoServicio();
    });
  }

  eliminarRegistro(row) {
    Swal.fire({
      title: '¿Está seguro de eliminar?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {

      if (result.isConfirmed) {

        // const {  idtipoServicio ,idUsuario  }= req.body;
        const UsuarioData = JSON.parse(localStorage.getItem('usuario'));

        const idUsuario = UsuarioData['idusuario'];

        const body: any = {
          idtipoServicio: row.idtipoServicio,
          idUsuario: idUsuario
        };

        this._serviceTipoServicio.eliminarTipoServicio(body).subscribe(data => {
          console.log(data);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'El registro ha sido eliminado',
            showConfirmButton: false,
            timer: 1500
          });
          this.mostrarTabla = false;

          this.syncDelay(10);
          this.obtenerListaTipoServicio();
        },
          error => {
            console.log(error.error.mensaje);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.error.mensaje,
              showConfirmButton: false,
              timer: 1500
            });
          })
        // Swal.fire(
        //   'Eliminado!',
        //   'El registro ha sido eliminado',
        //   'success'
        // )
      }
    })
  }

  syncDelay(milliseconds) {
    var start = new Date().getTime();
    var end = 0;
    while (end - start < milliseconds) {
      end = new Date().getTime();
    }
  }

}
