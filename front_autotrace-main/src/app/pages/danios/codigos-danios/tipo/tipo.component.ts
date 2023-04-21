import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {ModalAgregarTipoComponent} from './modal-agregar-tipo/modal-agregar-tipo.component';
import {ModalEditarTipoComponent} from './modal-editar-tipo/modal-editar-tipo.component';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TipodanioService} from '@services/tipodanio.service';

@Component({
    selector: 'app-tipo',
    templateUrl: './tipo.component.html',
    styleUrls: ['./tipo.component.scss']
})
export class TipoComponent implements OnInit {
    listTipoDanio: any[] = [];
    mostrarTabla: boolean = false;
    form: FormGroup;

    modalOptions: NgbModalOptions;
    dtOptions: any = {};
    constructor(
        private modalService: NgbModal,
        private _serviceTipoDanio: TipodanioService,
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
        this.obtenerListaTipoDanio();
    }

    obtenerListaTipoDanio() {
        this._serviceTipoDanio.getListTipoDanio().subscribe(
            (data) => {
                this.listTipoDanio = data[0];
                this.mostrarTabla = true;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    abrirModalAgregar() {
        const modalRef = this.modalService.open(ModalAgregarTipoComponent);
        modalRef.componentInstance.tituloModal = 'Agregar tipo';
        modalRef.closed.subscribe((cambio) => {
            this.mostrarTabla = false;

            this.syncDelay(10);
            this.obtenerListaTipoDanio();
        });
    }

    abrirModalEditar(row) {
        const modalRef = this.modalService.open(ModalEditarTipoComponent);
        modalRef.componentInstance.tituloModal = 'Editar tipo';
        modalRef.componentInstance.datos = row;

        modalRef.closed.subscribe((cambio) => {
            this.mostrarTabla = false;
            this.syncDelay(10);
            this.obtenerListaTipoDanio();
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
                this._serviceTipoDanio.delete(row.cveTipoDanio).subscribe(
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
                        this.obtenerListaTipoDanio();
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
            this._serviceTipoDanio.buscarPatronTipoDanio(cadena).subscribe(
                (data) => {
                    this.listTipoDanio = data[0];
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
}
