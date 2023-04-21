import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EstadoprocesoService} from '@services/estadoproceso.service';
import {GeocercasService} from '@services/geocercas.service';
import {ListasService} from '@services/listas.service';
import {SelectLocalidadService} from '@services/select-localidad.service';
import {TipoServicioService} from '@services/tipo-servicio.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-alta-lista',
    templateUrl: './alta-lista.component.html',
    styleUrls: ['./alta-lista.component.scss']
})
export class AltaListaComponent implements OnInit {
    dtOptions: any = {};

    public geocercasList: any[] = [];
    public featuresList: any[] = [];
    public tipoServicioList: any[] = [];
    public estadoProcesoList: any[] = [];

    public listaFiltroTabla: any[] = [];
    public mostrarTabla = true;

    form: FormGroup;
    form2: FormGroup;


    constructor(
        private _geocercaService: GeocercasService,
        private _tipoServicio: TipoServicioService,
        private _estadoProcesoService: EstadoprocesoService,
        private selectService: SelectLocalidadService,
        private elementRef: ElementRef,
        private fb: FormBuilder,
        private _listaService: ListasService
    ) {
        this.form = this.fb.group({
            geocercaControl: [''],
            tipoServicio: [''],
            estadoProceso: [''],
            fechaIni: [''],
            fechaFin: [''],
            vins: ['']
        });

        this.form2 = this.fb.group({
            nombreLista: ['', Validators.required],
            objetivoLista: ['', Validators.required]
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

        this.geocercasLocalidad(localStorage.getItem('idlocalidad'));
        this.tipoServicioLocalidadGeocerca();
        this.estadoProcesoGeocerca();

        this.selectService.cambioLocalidad.subscribe((cambio) => {
            this.geocercasLocalidad(
                localStorage.getItem('idlocalidad')
            );
        });
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
    public tipoServicioLocalidadGeocerca() {
        this._tipoServicio.getListTipoServicio().subscribe(
            (data) => {
                this.tipoServicioList = [];
                this.tipoServicioList = data;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    public estadoProcesoGeocerca() {
        this._estadoProcesoService.getListEstadoProceso().subscribe(
            (data) => {
                this.estadoProcesoList = [];
                this.estadoProcesoList = data;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    filtroVins() {
        const vins = this.form.get('vins')?.value;
        const fechaIn = this.form.get('fechaIni')?.value+" 00:00:00";
        const fechaFin = this.form.get('fechaFin')?.value+" 23:59:59";
        let geocerca = this.form.get('geocercaControl')?.value;
        let tipoServicio = this.form.get('tipoServicio')?.value;
        let estadoProceso = this.form.get('estadoProceso')?.value;

        var texto_sin_enter = "'";
        if (!estadoProceso) {
            estadoProceso = 0;
        }
        if (!geocerca) {
            geocerca = 0;
        }

        if (!tipoServicio) {
            tipoServicio = 0;
        }

        this.mostrarTabla = false;

        if (vins) {
            for (let i = 0; i < vins.length; i++) {
                if (vins[i] === '\n' || vins[i] === '\r') {
                    texto_sin_enter = texto_sin_enter + "','";
                } else {
                    texto_sin_enter = texto_sin_enter + vins[i];
                }
            }
            texto_sin_enter = texto_sin_enter + "'";
            // -----------------------------------------------------------------------------------------------------------
            this._geocercaService
                .listaVinsMapDistribucion(texto_sin_enter,localStorage.getItem('idlocalidad'))
                .subscribe(
                    (data) => {
                        this.listaFiltroTabla = [];
                        this.listaFiltroTabla = data[0];
                        this.mostrarTabla = true;
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            // -----------------------------------------------------------------------------------------------------------------
        } else {
            if (fechaFin && fechaIn) {
                if (fechaFin > fechaIn) {
                    // ----------------------------------------------------------------------------------------------------------

                    this._geocercaService
                        .busqFiltradaMapDist(
                            fechaIn,
                            fechaFin,
                            geocerca,
                            tipoServicio,
                            estadoProceso,
                            localStorage.getItem('idlocalidad')
                        )
                        .subscribe(
                            (data) => {
                                this.listaFiltroTabla = [];
                                this.listaFiltroTabla = data[0];

                                this.mostrarTabla = true;
                            },
                            (error) => {
                                console.log(error);
                            }
                        );

                    // ------------------------------------------------------------------------------------------------------------
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Verificar Fechas Seleccionadas',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Es necesario introducir fechas',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }

    crearLista() {
        let arreglodatos = [];
        const nombreLista = this.form2.get('nombreLista')?.value;
        const objetivoLista = this.form2.get('objetivoLista')?.value;
        let vinsEncontrados = 0;

        var items: any = document.getElementsByName('checkVin');
        let j = 0;
        for (var i = 0; i < items.length; i++) {
            if (items[i].checked == true) {
                arreglodatos[j] = items[i]['value'];
                j++;
            }
        }

        vinsEncontrados = arreglodatos.length;
        const UsuarioData=    JSON.parse(localStorage.getItem("usuario"));

        const idUsuario=UsuarioData['idusuario'];



        if (arreglodatos.length > 0 && this.form2['status'] == 'VALID') {


            this._listaService
                .create(
                    nombreLista,
                    objetivoLista,
                    vinsEncontrados,
                    'Activo',
                    idUsuario
                )
                .subscribe(
                    (data) => {

                        const idLista = data['id'][0]['idListaInsertada'];


                        for (let index = 0;index < arreglodatos.length; index++) {

                            this._listaService.insertarVinLista(idLista, arreglodatos[index]).subscribe(
                                    (data) => {},
                                    (error) => {
                                        console.log(error);
                                    }
                                );

                                if(Number(index) == arreglodatos.length - 1){
                                    Swal.fire({
                                      position: 'center',
                                      icon: 'success',
                                      title: 'La lista se creó correctamente',
                                      showConfirmButton: false,
                                      timer: 1500
                                  });
                                }
                        }
                    },
                    (error) => {
                        console.log(error);
                    }
                );


        } else {
            console.log('ningun vin seleccionado');
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Verificar Nombre , Objetivo Y Selección de Vins',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
}
