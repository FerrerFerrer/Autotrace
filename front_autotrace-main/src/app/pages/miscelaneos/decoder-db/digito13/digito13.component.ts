import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {Decoder13Service} from '@services/decoder13.service';
import {Subject} from 'rxjs';
import Swal from 'sweetalert2';
import {ModalAgregarDigito13Component} from './modal-agregar-digito13/modal-agregar-digito13.component';
import {ModalEditarDigito13Component} from './modal-editar-digito13/modal-editar-digito13.component';

@Component({
    selector: 'app-digito13',
    templateUrl: './digito13.component.html',
    styleUrls: ['./digito13.component.scss']
})
export class Digito13Component implements OnInit {
    dtOptions: any = {};
    listaLocalidades: any[];

    listDecoder13: any[] = [];
    mostrarTabla: boolean = false;

    modalOptions: NgbModalOptions;
    dtTrigger = new Subject<any>();
    form: FormGroup;
    constructor(
        private modalService: NgbModal,
        private _ServiceDecoder13: Decoder13Service,
        private fb: FormBuilder
    ) {


      this.form = this.fb.group({
        patronBusqueda: ['', [Validators.required, Validators.minLength(1)]]
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

        this.modalOptions = {
            backdrop: 'static',
            backdropClass: 'customBackdrop'
        };

        this.obtenerListaDecoder13();
    }

    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
    }

    abrirModalAgregar() {
        const modalRef = this.modalService.open(ModalAgregarDigito13Component);
        modalRef.componentInstance.tituloModal = 'Agregar digito 1-3';

        modalRef.closed.subscribe((cambio) => {
            this.mostrarTabla = false;

            this.syncDelay(10);
            this.obtenerListaDecoder13();
        });
    }
    obtenerListaDecoder13() {
        this._ServiceDecoder13.getListDecoder13().subscribe(
            (data) => {
                this.listDecoder13 = data[0];
                // console.log(this.listDecoder13);
                this.mostrarTabla = true;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    abrirModalEditar(row) {
        const modalRef = this.modalService.open(ModalEditarDigito13Component);
        modalRef.componentInstance.tituloModal = 'Editar digito 1-3';
        modalRef.componentInstance.datos = row;

        modalRef.closed.subscribe((cambio) => {
            this.mostrarTabla = false;

            this.syncDelay(10);
            this.obtenerListaDecoder13();
        });
    }

    eliminarRegistro(row) {
        Swal.fire({
            title: '¿Está seguro de eliminar este registro?',
            text: 'No podrás revertir esta acción',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                this._ServiceDecoder13.delete(row.cveDigito).subscribe(
                    (data) => {
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
                        this.obtenerListaDecoder13();
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            }
        });
    }

    syncDelay(milliseconds) {
        var start = new Date().getTime();
        var end = 0;
        while (end - start < milliseconds) {
            end = new Date().getTime();
        }
    }

    filtroPatron() {
      const cadena = this.form.get('patronBusqueda')?.value;

      if (this.form.valid) {
          this.mostrarTabla = false;
          this._ServiceDecoder13.buscarPatronDigito13(cadena).subscribe(
              (data) => {
                  this.listDecoder13 = data[0];
                  this.mostrarTabla = true;
              },
              (error) => {
                  console.log(error);
              }
          );
      } else {
if(!cadena){
  this.obtenerListaDecoder13();
}else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Verificar Datos Ingresados!',
    showConfirmButton: false,
    timer: 1500
});
}


      }
    }

}
