import {Component, OnInit} from '@angular/core';
import {ModalAgregarDigito10Component} from './modal-agregar-digito10/modal-agregar-digito10.component';
import {ModalEditarDigito10Component} from './modal-editar-digito10/modal-editar-digito10.component';
import Swal from 'sweetalert2';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Decoder10Service} from '@services/decoder10.service';

@Component({
    selector: 'app-digito10',
    templateUrl: './digito10.component.html',
    styleUrls: ['./digito10.component.scss']
})
export class Digito10Component implements OnInit {
    dtOptions: any = {};
    listaLocalidades: any[];

    listaDecoder10: any[] = [];
    mostrarTabla: boolean = false;
    form: FormGroup;

    modalOptions: NgbModalOptions;
    dtTrigger = new Subject<any>();

    constructor(
        private modalService: NgbModal,
        private _decoder10Service: Decoder10Service,
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

        this.obtenerListDecoder10();
    }

    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
    }
    obtenerListDecoder10() {
        this._decoder10Service.getListDecoder10().subscribe((data) => {
            this.listaDecoder10 = data[0];
            this.mostrarTabla = true;
        });
    }

    filtroPatron() {
        const cadena = this.form.get('patronBusqueda')?.value;

        if (this.form.valid) {
            this.mostrarTabla = false;
            this._decoder10Service.buscarPatronDigito10(cadena).subscribe(
                (data) => {
                    this.listaDecoder10 = data[0];
                    this.mostrarTabla = true;
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Verificar Datos Ingresados!',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    abrirModalAgregar() {
        const modalRef = this.modalService.open(ModalAgregarDigito10Component);
        modalRef.componentInstance.tituloModal = 'Agregar digito 10';
        modalRef.closed.subscribe((cambio) => {
            this.mostrarTabla = false;

            this.syncDelay(10);
            this.obtenerListDecoder10();
        });
    }

    abrirModalEditar(row) {
        const modalRef = this.modalService.open(ModalEditarDigito10Component);
        modalRef.componentInstance.tituloModal = 'Editar digito 10';
        modalRef.componentInstance.datos = row;

        modalRef.closed.subscribe((cambio) => {
            this.mostrarTabla = false;

            this.syncDelay(10);
            this.obtenerListDecoder10();
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
                this._decoder10Service.delete(row.cveDigito).subscribe(
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
                        this.obtenerListDecoder10();
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
}
