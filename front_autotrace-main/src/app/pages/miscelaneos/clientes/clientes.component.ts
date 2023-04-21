import {
    AfterViewInit,
    Component,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ModalAgregarClienteComponent } from './modal-agregar-cliente/modal-agregar-cliente.component';
import { ModalEditarClienteComponent } from './modal-editar-cliente/modal-editar-cliente.component';
import Swal from 'sweetalert2';
import { ClientesService } from '@services/clientes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from "ngx-spinner"; //Importancion del spinner
@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnDestroy, OnInit {
    dtOptions: any = {};
    listClientes: any[] = [];
    mostrarTabla: boolean = false;
    form: FormGroup;

    modalOptions: NgbModalOptions;
    dtTrigger = new Subject<any>();
    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;
    constructor(
        private modalService: NgbModal,
        private fb: FormBuilder,
        private _serviceCliente: ClientesService,
        private spinner: NgxSpinnerService
    ) {
        this.form = this.fb.group({
            patronBusqueda: ['', [Validators.required, Validators.minLength(1)]]
        });
    }

    ngOnInit(): void {
        this.obtenerListaClientes();
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
                    filename: 'AutoTracePDF'
                },
                'colvis'
            ],
            language: {
                url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
            }
        };

        this.modalOptions = {
            backdrop: 'static',
            backdropClass: 'customBackdrop'
        };
        
    }
    filtroPatron() {
        this.spinner.show();
        const cadena = this.form.get('patronBusqueda')?.value;
        if (this.form.valid) {
            this.mostrarTabla = false;
            this._serviceCliente.buscarPatronCliente(cadena).subscribe(
                (data) => {
                    this.listClientes = data[0];
                    this.dtElement.dtInstance.then(
                        (dtInstance: DataTables.Api) => {
                            dtInstance.destroy();
                            this.dtTrigger.next();
                        }
                    );
                    this.spinner.hide();
                },
                (error) => {
                    this.spinner.hide();
                    console.log(error);
                }
            );
        } else {
            if (cadena == '') {
                this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                    dtInstance.destroy();
                });
                this.obtenerListaClientes();
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
    obtenerListaClientes() {
        this.spinner.show();
        this._serviceCliente.getListClientes().subscribe(
            (data) => {
                this.listClientes = data[0];
                this.dtTrigger.next();
                this.spinner.hide();
            },
            (error) => {
                this.spinner.hide();
                console.log(error);
            }
        );
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
    }

    abrirModalAgregar() {
        const modalRef = this.modalService.open(ModalAgregarClienteComponent);
        modalRef.componentInstance.tituloModal = 'Agregar cliente';
        modalRef.closed.subscribe((cambio) => {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
            });
            this.obtenerListaClientes();
        });
    }

    abrirModalEditar(row) {
        const modalRef = this.modalService.open(ModalEditarClienteComponent);
        modalRef.componentInstance.tituloModal = 'Editar cliente';
        modalRef.componentInstance.datos = row;
        modalRef.closed.subscribe((cambio) => {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
            });
            this.obtenerListaClientes();
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
                this._serviceCliente.delete(row.idcliente).subscribe(
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
                        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                            dtInstance.destroy();
                        });
                        this.obtenerListaClientes();
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            }
        });
    }


}
