import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalHistorialVinComponent } from '@pages/historial/modal-historial-vin/modal-historial-vin.component';
import { ClientesService } from '@services/clientes.service';
import { InventariopatioService } from '@services/inventariopatio.service';
import { TipoServicioService } from '@services/tipo-servicio.service';
import { textChangeRangeIsUnchanged } from 'typescript';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
    selector: 'app-inventario-transito',
    templateUrl: './inventario-transito.component.html',
    styleUrls: ['./inventario-transito.component.scss']
})
export class InventarioTransitoComponent implements OnInit {
    public listMarcas: any[] = [];
    public listTabla: any[] = [];
    public listTipoServicio: any[];
    mostrarTabla: boolean = true;
    form: FormGroup;
    dtOptions: any = {};

    constructor(
        private router: Router,
        private modalService: NgbModal,
        private _clientesService: ClientesService,
        private fb: FormBuilder,
        private _inventarioPatioService: InventariopatioService,
        private _serviceTipoServicio: TipoServicioService,
        private spinner: NgxSpinnerService
    ) {
        this.form = this.fb.group({
            marcas: ['0'],
            tipoServicio: ['0'],
            ListaVins: []
        });
    }

    // modalOptions: { backdrop: string; backdropClass: string; };

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

        this.obtenerMarcas();
        this.obtenerTipoServicio();
    }

    filtroTabla() {
        this.spinner.show();
        const vins = this.form.get('ListaVins')?.value;
        var texto_sin_enter = "'";

        if (vins) {
          const vinsArray = vins.split('\n');
            this.mostrarTabla = false;
            for (let i = 0; i < vins.length; i++) {
                if (vins[i] === '\n' || vins[i] === '\r') {
                    texto_sin_enter = texto_sin_enter + "','";
                } else {
                    texto_sin_enter = texto_sin_enter + vins[i];
                }
            }
            texto_sin_enter = texto_sin_enter + "'";
            this._inventarioPatioService
                .obtInventarioTransitoListaVinsV2(vinsArray, localStorage.getItem('idlocalidad'))
                .subscribe(
                    (data) => {
                        this.listTabla = [];
                        this.listTabla = data[0];
                        this.mostrarTabla = true;
                        this.spinner.hide();
                    },
                    (error) => {
                        console.log(error);
                        this.spinner.hide();
                    }
                );
        }
        else {
            let marcas = this.form.get('marcas')?.value;
            let tipoServicio = this.form.get('tipoServicio')?.value;
            this.mostrarTabla = false;
            this._inventarioPatioService
                .obtenerInventarioTransito(marcas, tipoServicio, localStorage.getItem("idlocalidad"))
                .subscribe(
                    (data) => {
                        this.listTabla = [];
                        this.listTabla = data[0];
                        this.mostrarTabla = true;
                        this.spinner.hide();
                    },
                    (error) => {
                        console.log(error);
                        this.spinner.hide();
                    }
                );
        }
    }
    obtenerMarcas() {
        this._clientesService.getListClientes().subscribe(
            (data) => {
                this.listMarcas = [];
                this.listMarcas = data[0];
                // this.mostrarTabla = true;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    obtenerTipoServicio() {
        this._serviceTipoServicio.getListTipoServicio().subscribe(
            (data) => {
                this.listTipoServicio = [];
                this.listTipoServicio = data[0];
            },
            (error) => {
                console.log(error);
            }
        );
    }

    abrirModalHistorialVin(vin: string) {
        const modalRef = this.modalService.open(ModalHistorialVinComponent, {
            size: 'xl'
        });
        modalRef.componentInstance.titulo = 'Historial Vin';
        modalRef.componentInstance.vin = vin;
    }
}
