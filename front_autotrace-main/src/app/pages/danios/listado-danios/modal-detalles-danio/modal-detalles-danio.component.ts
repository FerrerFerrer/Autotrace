import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
    NgbActiveModal,
    NgbModal,
    NgbModalOptions
} from '@ng-bootstrap/ng-bootstrap';
import { DanioService } from '@services/danio.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ModalDanioUbicacionComponent } from '../modal-danio-ubicacion/modal-danio-ubicacion.component';
import { ModalDescargaDetallesDaniosComponent } from '../modal-descarga-detalles-danios/modal-descarga-detalles-danios.component'

declare var require: any;
const pdfMake = require('pdfmake/build/pdfmake.js');
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'app-modal-detalles-danio',
    templateUrl: './modal-detalles-danio.component.html',
    styleUrls: ['./modal-detalles-danio.component.scss']
})
export class ModalDetallesDanioComponent implements OnInit, AfterViewInit {
    @Input() tituloModal: any;
    @Input() datos: any;
    @Input() arregloCadenaFotos: any[] = [];


    @ViewChild('descargarDetallesDanio')
    descargarDetallesDanio: ElementRef;

    dtOptions: any = {};
    dtTrigger = new Subject<any>();
    modalOptions: NgbModalOptions;
    listDetallesDanio: any[] = [];
    HTMLDetallesDanio = '';
    DownloadHTMLDetallesDanio = '';
    HTMLDanioIterado = '';
    DownloadHTMLDanioIterado = '';
    Fotos = '';
    constructor(
        public activeModal: NgbActiveModal,
        private modalService: NgbModal,
        private servicioDanio: DanioService
    ) { }

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 20,
            serverSide: false,
            processing: false,
            dom: 'Bfrtip',
            buttons: [
                'copy',
                'csv',
                'excel',
                {
                    extend: 'pdf',
                    text: 'PDF',
                    orientation: 'landscape',
                    title: 'Reporte de servicios',
                    filename: 'reporteServicio'
                },
                'print',
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

        this.consultaDetallesDanio();

    }



    consultaDetallesDanio() {
        this.servicioDanio.consultaDetallesDanio(this.datos.vin).subscribe(
            (data) => {

                this.listDetallesDanio = data[0];

                this.HTMLDetallesDanio = '';
                this.DownloadHTMLDetallesDanio = '';
                this.HTMLDanioIterado = '';
                this.DownloadHTMLDanioIterado = '';
                this.Fotos = '';

                console.log(data[0]);

                for (
                    let index = 0;
                    index < this.listDetallesDanio.length;
                    index++
                ) {
                    const iteracion = index;

                    if (iteracion == 0) {
                        this.DownloadHTMLDanioIterado = `  <div>
                                            <div class="row " >
                                                <div class="col-12  ">
                                                    <div class="col-12">
                                                        <div class="card">
                                                            <div class="card-header">
                                                               <h3 class="card-title font-weight-bold">Información de daño </h3>
                                                            </div>
                                                            <div class="card-body ">
                                                               <table class="table table-sm table-bordered table-striped dtr-inline">
                                                                   <tbody>
                                                                        <tr>
                                                                           <td >Marca</td>
                                                                           <td >` + this.listDetallesDanio[iteracion]['cliente'] +`</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td >Fecha</td>
                                                                            <td >` + this.formatoFecha(this.listDetallesDanio[iteracion]['fechaRegistro']) +`</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td >Area</td>
                                                                            <td >` + this.listDetallesDanio[iteracion]['descareadanio'] + `</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td >Clasificacion</td>
                                                                            <td >` +this.listDetallesDanio[iteracion]['clasificacion'] + `</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td >Tipo</td>
                                                                            <td >` + this.listDetallesDanio[iteracion]['desctipodanio'] +`</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td >Severidad</td>
                                                                            <td >` + this.listDetallesDanio[iteracion]['descserveridad'] +` </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td >Ubicación</td>
                                                                            <td >` + this.listDetallesDanio[iteracion]['descubicacion'] +`</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td >Responsable</td>
                                                                            <td >` + this.listDetallesDanio[iteracion]['responsable'] +`</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td >Estatus de reparación</td>
                                                                            <td >` + this.listDetallesDanio[iteracion]['estado'] +`</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td class="col-6">Observaciones</td>
                                                                            <td class="col-6">` +
                                                                                this.listDetallesDanio[iteracion]['observaciones'] +
                                                                                `</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td >Inicio de reparación</td>
                                                                            <td >  ${this.formatoFecha(this.listDetallesDanio[iteracion]['fechaInicioReparacion' ] )}  </td>
                                                                        </tr>

                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`;
                                this.HTMLDanioIterado =`<div class="tab-pane fade active show" id="danio` + this.listDetallesDanio[iteracion]['idDanio'] +`" role="tabpanel" >
                                                <div class="row">
                                                    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                                        <div class="card">
                                                            <div class="card-header">
                                                                <h3 class="card-title font-weight-bold">Información de daño </h3>
                                                            </div>
                                                            <div class="card-body ">
                                                                <table class="table table-sm table-bordered table-striped dtr-inline">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="col-6">Marca</td>
                                                                            <td class="col-6">` + this.listDetallesDanio[iteracion]['cliente'] +`</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td class="col-6">Fecha</td>
                                                                            <td class="col-6">` + this.formatoFecha(this.listDetallesDanio[iteracion]['fechaRegistro']) +`</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td class="col-6">Area</td>
                                                                            <td class="col-6">` + this.listDetallesDanio[iteracion]['descareadanio'] +`</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td >Clasificacion</td>
                                                                            <td >` +this.listDetallesDanio[iteracion]['clasificacion'] + `</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td class="col-6">Tipo</td>
                                                                            <td class="col-6">` + this.listDetallesDanio[iteracion]['desctipodanio'] +`</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td class="col-6">Severidad</td>
                                                                            <td class="col-6">` + this.listDetallesDanio[iteracion]['descserveridad'] +` </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td class="col-6">Ubicación</td>
                                                                            <td class="col-6">` + this.listDetallesDanio[iteracion]['descubicacion'] +`</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td class="col-6">Responsable</td>
                                                                            <td class="col-6">` + this.listDetallesDanio[iteracion]['responsable'] +`</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td class="col-6">Estatus de reparación</td>
                                                                            <td class="col-6">` + this.listDetallesDanio[iteracion]['estado'] +`</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td class="col-6">Observaciones</td>
                                                                            <td class="col-6">` + this.listDetallesDanio[iteracion]['observaciones'] +`</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td class="col-6">Inicio de reparación</td>
                                                                            <td class="col-6">` + this.formatoFecha( this.listDetallesDanio[iteracion]['fechaInicioReparacion' ]) +`</td>
                                                                        </tr>

                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                                        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                            <div class="card">
                                                                <div class="card-header">
                                                                    <h3 class="card-title font-weight-bold">Fotografías de daños</h3>
                                                                </div>

                                                                <div class="card-body">
                                                                    <div id="accordion">
                                                                        ` +this.arregloCadenaFotos[iteracion][0] +`
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="col-12 mt-1">
                                                            <div class="card">
                                                                <div class="card-header">
                                                                    <h3 class="card-title font-weight-bold">Firma</h3>
                                                                </div>
                                                                <div class="card-body">
                                                                    <img alt="imagen aleatoria" class="img-fluid" src="/assets/uploads/danios/` +this.listDetallesDanio[iteracion]['urlFirma'] +`">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`;
                    } else
                       {this.DownloadHTMLDanioIterado = `  <div>
                                            <div class="row " >
                                                <div class="col-12">
                                                    <div class="card">
                                                        <div class="card-header">
                                                            <h3 class="card-title font-weight-bold">Información de daño </h3>
                                                        </div>
                                                        <div class="card-body ">
                                                            <table class="table table-sm table-bordered table-striped dtr-inline">
                                                                <tbody>
                                                                    <tr>
                                                                        <td >Marca</td>
                                                                        <td >` +this.listDetallesDanio[iteracion]['cliente'] +`</td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td >Fecha</td>
                                                                        <td >` + this.formatoFecha( this.listDetallesDanio[iteracion]['fechaRegistro']) +`</td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td class="col-6">Area</td>
                                                                        <td class="col-6">` + this.listDetallesDanio[iteracion]['descareadanio'] +`</td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td >Clasificacion</td>
                                                                        <td >` +this.listDetallesDanio[iteracion]['clasificacion'] + `</td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td >Tipo</td>
                                                                        <td >` +this.listDetallesDanio[iteracion]['desctipodanio'] +`</td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td >Severidad</td>
                                                                        <td >` + this.listDetallesDanio[iteracion]['descserveridad' ] +` </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td >Ubicación</td>
                                                                        <td >` + this.listDetallesDanio[index]['descubicacion'] +`</td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td >Responsable</td>
                                                                        <td >` + this.listDetallesDanio[iteracion]['responsable'] +`</td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td >Estatus de reparación</td>
                                                                        <td >` +this.listDetallesDanio[iteracion]['estado'] +`</td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td >Observaciones</td>
                                                                        <td >` +this.listDetallesDanio[iteracion]['observaciones'] +`</td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td >Inicio de reparación</td>
                                                                        <td >` +this.formatoFecha(this.listDetallesDanio[iteracion]['fechaInicioReparacion']) +`</td>
                                                                    </tr>

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`;

                    this.HTMLDanioIterado =`        <div class="tab-pane fade " id="danio` + this.listDetallesDanio[iteracion]['idDanio'] +`" role="tabpanel" >
                                                <div class="row">
                                                    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                                        <div class="card">
                                                            <div class="card-header">
                                                                <h3 class="card-title font-weight-bold">Información de daño </h3>
                                                            </div>
                                                            <div class="card-body ">
                                                                <table class="table table-sm table-bordered table-striped dtr-inline">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="col-6">Marca</td>
                                                                            <td class="col-6">` + this.listDetallesDanio[iteracion]['cliente'] + `</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td class="col-6">Fecha</td>
                                                                            <td class="col-6">` + this.formatoFecha(this.listDetallesDanio[iteracion]['fechaRegistro']) +`</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td class="col-6">Area</td>
                                                                            <td class="col-6">` + this.listDetallesDanio[iteracion]['descareadanio'] +`</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td >Clasificacion</td>
                                                                            <td >` +this.listDetallesDanio[iteracion]['clasificacion'] + `</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td class="col-6">Tipo</td>
                                                                            <td class="col-6">` + this.listDetallesDanio[iteracion]['desctipodanio'] +`</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td class="col-6">Severidad</td>
                                                                            <td class="col-6">` + this.listDetallesDanio[iteracion]['descserveridad'] +` </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td class="col-6">Ubicación</td>
                                                                            <td class="col-6">` +this.listDetallesDanio[index]['descubicacion'] +`</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td class="col-6">Responsable</td>
                                                                            <td class="col-6">` + this.listDetallesDanio[iteracion]['responsable'] +`</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td class="col-6">Estatus de reparación</td>
                                                                            <td class="col-6">` + this.listDetallesDanio[iteracion]['estado'] +`</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td class="col-6">Observaciones</td>
                                                                            <td class="col-6">` +this.listDetallesDanio[iteracion]['observaciones'] +`</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td class="col-6">Inicio de reparación</td>
                                                                            <td class="col-6">` + this.formatoFecha( this.listDetallesDanio[iteracion]['fechaInicioReparacion' ]) +`</td>
                                                                        </tr>

                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                                        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                            <div class="card">
                                                                <div class="card-header">
                                                                    <h3 class="card-title font-weight-bold">Fotografías de daños</h3>
                                                                </div>

                                                                <div class="card-body">
                                                                    <div id="accordion"> ` + this.arregloCadenaFotos[iteracion][0] + `</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="col-12 mt-1">
                                                            <div class="card">
                                                                <div class="card-header">
                                                                    <h3 class="card-title font-weight-bold">Firma</h3>
                                                                </div>
                                                                <div class="card-body">
                                                                    <img alt="imagen aleatoria" class="img-fluid" src="/assets/uploads/danios/` + this.listDetallesDanio[iteracion]['urlFirma'] +`">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`;
                    }

                    this.HTMLDetallesDanio = this.HTMLDetallesDanio + this.HTMLDanioIterado;
                    this.DownloadHTMLDetallesDanio = this.DownloadHTMLDetallesDanio + this.DownloadHTMLDanioIterado;
                }

                document.getElementById('danios-tabContent').innerHTML = this.HTMLDetallesDanio;

            },
            (error) => {
                console.log(error);
            }
        );
    }
    formatoFecha(dato: string) {

        if (dato == null) {
            return "";
        } else {
            let date = new Date(dato);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let dt = date.getDate();
            let dia;
            let mes;
            if (dt < 10) {

                dia = '0' + dt;
            } else {
                dia = dt;
            }
            if (month < 10) {
                mes = '0' + month;

            } else {
                mes = month;
            }

            return year + '-' + mes + '-' + dia;
            }

    }

    ngAfterViewInit(): void {


    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
    }

    agregar() {
        this.activeModal.close();

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se seguardó correctamente',
            showConfirmButton: false,
            timer: 1500
        });

        /**
     *
     * Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Algo salió mal!',
    })
     */
    }

    abrirModalUbicacionVin() {
        const modalRef = this.modalService.open(ModalDanioUbicacionComponent, {
            size: 'xl'
        });
        modalRef.componentInstance.tituloModal = 'Detalles de daños';
        modalRef.componentInstance.datos = this.datos;
    }


    abrirModalDescargarDetalles() {
        const modalRef = this.modalService.open(ModalDescargaDetallesDaniosComponent, {
            size: 'xl'
        });
        modalRef.componentInstance.tituloModal = 'Detalles de daños';
        modalRef.componentInstance.datos = this.datos;
        modalRef.componentInstance.DownloadHTMLDetallesDanio = this.DownloadHTMLDetallesDanio;
    }

}
