import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalAgregarLocalidadComponent } from './modal-agregar-localidad/modal-agregar-localidad.component';
import { ModalEditarLocalidadComponent } from './modal-editar-localidad/modal-editar-localidad.component';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner"; //Importancion del spinner
import { LocalidadesService } from '@services/localidades.service';

@Component({
  selector: 'app-localidades',
  templateUrl: './localidades.component.html',
  styleUrls: ['./localidades.component.scss']
})
export class LocalidadesComponent implements AfterViewInit, OnDestroy, OnInit {

  form: FormGroup;
  dtOptions: any = {};
  listaLocalidades: any[];
  mostrarTabla: boolean = false;

  modalOptions: NgbModalOptions;
  dtTrigger = new Subject<any>();

  constructor(private modalService: NgbModal,
    private fb: FormBuilder,
    private _localidadesService: LocalidadesService,
    private spinner: NgxSpinnerService) {
    this.form = this.fb.group({
      patronBusqueda: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
    this.obtenerLocalidades();
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

  abrirModalAgregar() {
    const modalRef = this.modalService.open(ModalAgregarLocalidadComponent);
    modalRef.componentInstance.tituloModal = 'Agregar localidad';
    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerLocalidades();
    });
  }

  abrirModalEditar(row) {
    const modalRef = this.modalService.open(ModalEditarLocalidadComponent);
    modalRef.componentInstance.tituloModal = 'Editar localidad';
    modalRef.componentInstance.datos = row;

    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;
      this.syncDelay(10);
      this.obtenerLocalidades();
    });
  }

  eliminarRegistro(row) {
    Swal.fire({
      title: '¿Está seguro de eliminar esta localidad?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {

      if (result.isConfirmed) {
        this._localidadesService.deleteLocalidad(row.idlocalidad).subscribe(data => {
          this.mostrarTabla = false;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Eliminado',
            text: 'El registro se ha eliminado!',
            showConfirmButton: false,
            timer: 1500
          });
          this.syncDelay(10);
          this.obtenerLocalidades();
        }, (error) => {
          console.log(error);
        })
      }
    })
  }

  filtroPatron() {
    this.spinner.show();
    const cadena = this.form.get('patronBusqueda')?.value;
    this.mostrarTabla = false;
    if (cadena != '') {
      this._localidadesService.buscarPatron(cadena).subscribe(
        (data) => {
          this.listaLocalidades = data[0];
          this.mostrarTabla = true;
          this.spinner.hide();
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
        }
      );
    } else {
      this.obtenerLocalidades();
    }

  }

  obtenerLocalidades() {
    this.spinner.show();
    this._localidadesService.getListLocalidades().subscribe(data => {
      this.listaLocalidades = data[0];
      this.mostrarTabla = true;
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      console.log(error);
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
