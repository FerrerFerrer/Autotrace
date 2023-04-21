import {
    AfterViewInit,
    Component,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {ModalAgrearAreaComponent} from './modal-agrear-area/modal-agrear-area.component';
import Swal from 'sweetalert2';
import {ModalEditarAreaComponent} from './modal-editar-area/modal-editar-area.component';
import {Subject} from 'rxjs';
import {AreadanioService} from '@services/areadanio.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-area',
    templateUrl: './area.component.html',
    styleUrls: ['./area.component.scss']
})
export class AreaComponent implements AfterViewInit, OnDestroy, OnInit {
    dtOptions: any = {};
    listaAreas: any[] = [];
    mostrarTabla: boolean = false;

    modalOptions: NgbModalOptions;
    dtTrigger = new Subject<any>();
    form: FormGroup;

    constructor(
        private modalService: NgbModal,
        private _serviceAreaDanio: AreadanioService,
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

        this.obtenerListaAreaDanio();
    }

    obtenerListaAreaDanio() {
        this._serviceAreaDanio.getListAreadanio().subscribe(
            (data) => {
                this.listaAreas = data[0];
                this.mostrarTabla = true;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    filtroPatron() {
        
        const cadena = this.form.get('patronBusqueda')?.value;
        

        if (this.form.valid) {
            this.mostrarTabla = false;
            this._serviceAreaDanio.buscarPatronAreaDanio(cadena).subscribe(
                (data) => {
                    this.listaAreas = data[0];
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

    ngAfterViewInit(): void {
        // this.dtTrigger.next();
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        // this.dtTrigger.unsubscribe();
    }

    abrirModalAgregar() {
        const modalRef = this.modalService.open(ModalAgrearAreaComponent);
        modalRef.componentInstance.my_modal_title = 'Agregar area';
        modalRef.closed.subscribe((cambio) => {
            this.mostrarTabla = false;
            this.syncDelay(10);
            this.obtenerListaAreaDanio();
        });
    }

    abrirModalEditar(row) {
        const modalRef = this.modalService.open(ModalEditarAreaComponent);
        modalRef.componentInstance.tituloModal = 'Editar area';
        modalRef.componentInstance.datos = row;

        modalRef.closed.subscribe((cambio) => {
            this.mostrarTabla = false;
            this.syncDelay(10);
            this.obtenerListaAreaDanio();
        });
    }

    eliminarRegistro(row) {
        Swal.fire({
            title: '¿Está seguro de eliminar esta area?',
            text: 'No podrás revertir esta acción',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                this._serviceAreaDanio.delete(row.cveAreaDanio).subscribe(
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
                        this.obtenerListaAreaDanio();
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
