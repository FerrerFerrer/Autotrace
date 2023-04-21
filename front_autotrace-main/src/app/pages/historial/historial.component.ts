import {Person} from '@/models/Person';
// import { tablaHistorialGeolocalizacion } from '@/models/tablaHistorialGeolocalizacion';
import {HttpClient} from '@angular/common/http';
import {Component, OnInit, ElementRef, Input} from '@angular/core';
import {Router} from '@angular/router';
import {
    ModalDismissReasons,
    NgbModal,
    NgbModalOptions
} from '@ng-bootstrap/ng-bootstrap';
import {ModalHistorialVinComponent} from '@pages/historial/modal-historial-vin/modal-historial-vin.component';
import {GeocercasService} from '@services/geocercas.service';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON.js';
import {
    Circle as CircleStyle,
    Fill,
    Icon,
    Stroke,
    Style,
    Text
} from 'ol/style.js';
import {OSM} from 'ol/source';
import * as Proj from 'ol/proj';
import VectorSource from 'ol/source/Vector';

import {FormGroup, FormBuilder} from '@angular/forms';
import {TipoServicioService} from '@services/tipo-servicio.service';
import {EstadoprocesoService} from '@services/estadoproceso.service';
import {SelectLocalidadService} from '@services/select-localidad.service';
import Swal from 'sweetalert2';
import {NgxSpinnerService} from 'ngx-spinner';
export const DEFAULT_HEIGHT = '500px';
export const DEFAULT_WIDTH = '500px';

export const DEFAULT_LAT = -34.603490361131385;
export const DEFAULT_LON = -58.382037891217465;

export const DEFAULT_ANCHOR = [0.5, 0.5];
export const DEFAULT_ICON = '/assets/iconos/2.png';
@Component({
    selector: 'app-historial',
    templateUrl: './historial.component.html',
    styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {
    @Input() lat: number = DEFAULT_LAT;
    @Input() lon: number = DEFAULT_LON;
    @Input() zoom: number;
    @Input() width: string | number = DEFAULT_WIDTH;
    @Input() height: string | number = DEFAULT_HEIGHT;
    dtOptions: any = {};
    private geojsonObject = {
        type: 'FeatureCollection',
        crs: {
            type: 'name',
            properties: {name: 'urn:ogc:def:crs:OGC:1.3:CRS84'}
        },
        features: []
    };

    private image = new CircleStyle({
        radius: 5,
        fill: null,
        stroke: new Stroke({color: 'red', width: 1})
    });

    private jsonMarker = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [-102.184864, 17.967637]
                }
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [-102.186114, 17.968704]
                }
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [-102.181999, 17.971411]
                }
            }
        ]
    };
    private vinsMarker = {
        type: 'FeatureCollection',
        features: []
    };

    target: string = 'map';
    map: Map;
    private mapEl: HTMLElement;
    private coordenadaZoom;

    public geocercasList: any[] = [];
    public featuresList: any[] = [];
    public tipoServicioList: any[] = [];
    public estadoProcesoList: any[] = [];

    public listaFiltroTabla: any[] = [];
    public mostrarTabla = true;

    form: FormGroup;
    closeModal: string;

    persons: Person[];
    modalOptions: NgbModalOptions;

    constructor(
        private modalService: NgbModal,
        private http: HttpClient,
        private router: Router,
        private _geocercaService: GeocercasService,
        private _tipoServicio: TipoServicioService,
        private _estadoProcesoService: EstadoprocesoService,
        private selectService: SelectLocalidadService,
        private elementRef: ElementRef,
        private fb: FormBuilder,
        private spinner: NgxSpinnerService
    ) {
        this.form = this.fb.group({
            geocercaControl: [''],
            tipoServicio: [''],
            estadoProceso: [''],
            fechaIni: [''],
            fechaFin: [''],
            vins: ['']
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
        this.trasadoMapa();

        this.selectService.cambioLocalidad.subscribe((cambio) => {
            this.geocercasLocalidad(
                localStorage.getItem('idlocalidad')
            );
            this.trasadoMapa();
        });


        this.modalOptions = {
            backdrop: 'static',
            backdropClass: 'customBackdrop'
        };
    }

    abrirModalHistorialVin(vin: string) {
       
        const modalRef = this.modalService.open(ModalHistorialVinComponent, {
            size: 'xl'
        });
        modalRef.componentInstance.titulo = 'Historial Vin';
        modalRef.componentInstance.vin = vin;
    }

    public geocercasLocalidad(id: string) {
        this._geocercaService.listarGeocercasLocalidad(id).subscribe(
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
                this.tipoServicioList = data[0];
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

    public trasadoMapa() {
        this.geojsonObject.features = [];
        this.vinsMarker.features = [];
        this._geocercaService
            .listarGeocercasLocalidad(
                localStorage.getItem('idlocalidad')
            )
            .subscribe(
                (data) => {
                    this.geocercasList = data;

                    for (var i in this.geocercasList) {
                        const autoincremente = i;

                        const nombre = this.geocercasList[i]['geocerca'];
                        const idgeocercaParametro =
                            this.geocercasList[i]['idgeocerca'];

                        this._geocercaService
                            .getVinGeocerca(idgeocercaParametro)
                            .subscribe((data) => {
                                let listaVins: any[] = [];
                                listaVins = data[0];

                                this.recorreListaVinMarker(listaVins);
                            });

                        this._geocercaService
                            .getPuntos(idgeocercaParametro)
                            .subscribe(
                                (data) => {
                                    this.featuresList = data;

                                    this.geojsonObject.features.push({
                                        type: 'Feature',
                                        properties: {name: nombre},
                                        geometry: {
                                            type: 'Polygon',
                                            coordinates: [
                                                this.recorrerLista(
                                                    this.featuresList
                                                )
                                            ]
                                        }
                                    });

                                    if (
                                        Number(autoincremente) ==
                                        this.geocercasList.length - 1
                                    ) {
                                        this.trasadoMapaInterno(
                                            this.geojsonObject
                                        );
                                    }
                                },
                                (error) => {
                                    console.log(error);
                                }
                            );
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    public recorreListaVinMarker(lista) {
        var arregloVInMarker: any[] = [];

        for (var i in lista) {
            this.vinsMarker.features.push({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [lista[i]['longitud'], lista[i]['latitud']]
                }
            });
        }
    }

    public recorrerLista(Object): Number[] {
        var arregloprueba: any[] = [];

        for (var i in Object) {
            const autoincrement = i;
            arregloprueba.push([Object[i]['longitud'], Object[i]['latitud']]);
            if (Number(autoincrement) == Object.length - 1) {
                this.coordenadaZoom = [
                    Object[i]['longitud'],
                    Object[i]['latitud']
                ];
            }
        }

        return arregloprueba;
    }

    public filtroHistorial() {
        this.spinner.show();
        const vins = this.form.get('vins')?.value;
        const fechaIn = this.form.get('fechaIni')?.value+" 00:00:00";
        const fechaFin = this.form.get('fechaFin')?.value+" 23:59:59";
        let geocerca = this.form.get('geocercaControl')?.value;
        let tipoServicio = this.form.get('tipoServicio')?.value;
        let estadoProceso = this.form.get('estadoProceso')?.value;
        var texto_sin_enter = "'";
        let arregloGeocercasEnviar;

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
            const vinsArray = vins.split('\n');

            // -----------------------------------------------------------------------------------------
            this._geocercaService.listarGeocercasLocalidad(localStorage.getItem('idlocalidad')).subscribe(
                (data) => {
                    const geocercasList2 = data;
                    this.geojsonObject.features = [];
                    for (var i in geocercasList2) {
                        const autoincremente = i;

                        const nombre = geocercasList2[i]['geocerca'];
                        const idgeocercaParametro =
                            geocercasList2[i]['idgeocerca'];

                        this._geocercaService
                            .getPuntos(idgeocercaParametro)
                            .subscribe(
                                (data) => {
                                    this.featuresList = data;

                                    this.geojsonObject.features.push({
                                        type: 'Feature',
                                        properties: {name: nombre},
                                        geometry: {
                                            type: 'Polygon',
                                            coordinates: [
                                                this.recorrerLista(
                                                    this.featuresList
                                                )
                                            ]
                                        }
                                    });

                                    if (
                                        Number(autoincremente) ==
                                        geocercasList2.length - 1
                                    ) {
                                        arregloGeocercasEnviar =
                                            this.geojsonObject;

                                        // ---------------------------------------------------------------------------------------

                                        this._geocercaService
                                            .listaVinsHistorialV2(vinsArray, localStorage.getItem('idlocalidad'))
                                            .subscribe(
                                                (data) => {
                                                    this.listaFiltroTabla = [];
                                                    
                                                    data.forEach((element) => {
                                                        element.forEach((element2) => {
                                                            this.listaFiltroTabla.push(element2);
                                                        });
                                                    });
                                                  
                                                    let listUbicaciones: any[] =
                                                        [];
                                                    listUbicaciones = data[0];

                                                    this.mostrarTabla = true;
                                                    this.recorreListaVinMarker2(
                                                        listUbicaciones,
                                                        arregloGeocercasEnviar
                                                    );
                                                    this.spinner.hide();
                                                },
                                                (error) => {
                                                    this.spinner.hide();
                                                    console.log(error);
                                                }
                                            );

                                        // ---------------------------------------------------------------------------------------
                                    }
                                },
                                (error) => {
                                    this.spinner.hide();
                                    console.log(error);
                                }
                            );
                    }
                },
                (error) => {
                    this.spinner.hide();
                    console.log(error);
                }
            );
            // --------------------------------------------------------------------------------------------
        } else {
            if (fechaFin && fechaIn) {
                if (fechaFin > fechaIn) {
                    // ------------------------------------------------------------------------------------------------
                    this._geocercaService
                    .listarGeocercasLocalidad(
                      localStorage.getItem('idlocalidad')
                  )
                        .subscribe(
                            (data) => {
                                const geocercasList2 = data;
                                console.log(data[0]);
                                this.geojsonObject.features = [];
                                for (var i in geocercasList2) {
                                    const autoincremente = i;

                                    const nombre =
                                        geocercasList2[i]['geocerca'];
                                    const idgeocercaParametro =
                                        geocercasList2[i]['idgeocerca'];

                                    this._geocercaService
                                        .getPuntos(idgeocercaParametro)
                                        .subscribe(
                                            (data) => {

                                                this.featuresList = data;
                                                if (data.length > 0) {
                                                this.geojsonObject.features.push(
                                                    {
                                                        type: 'Feature',
                                                        properties: {
                                                            name: nombre
                                                        },
                                                        geometry: {
                                                            type: 'Polygon',
                                                            coordinates: [
                                                                this.recorrerLista(
                                                                    this
                                                                        .featuresList
                                                                )
                                                            ]
                                                        }
                                                    }
                                                );
                                                  }
                                                if (Number(autoincremente) == geocercasList2.length - 1) {
                                                    arregloGeocercasEnviar =
                                                        this.geojsonObject;
                                                    // ---------------------------------------------------------------------------------------
                                                        console.log(arregloGeocercasEnviar);
                                                    this._geocercaService.busqFiltradaHistorial(
                                                            fechaIn,
                                                            fechaFin,
                                                            geocerca,
                                                            tipoServicio,
                                                            estadoProceso,
                                                            localStorage.getItem('idlocalidad')
                                                        )
                                                        .subscribe(
                                                            (data) => {
                                                                this.listaFiltroTabla =
                                                                    [];
                                                                this.listaFiltroTabla =
                                                                    data[0];
                                                                let listUbicaciones2: any[] =
                                                                    [];
                                                                listUbicaciones2 =
                                                                    data[0];

                                                                this.mostrarTabla =
                                                                    true;
                                                                this.recorreListaVinMarker2(
                                                                    listUbicaciones2,
                                                                    arregloGeocercasEnviar
                                                                );
                                                                console.log(data[0]);
                                                                this.spinner.hide();
                                                            },
                                                            (error) => {
                                                                this.spinner.hide();
                                                                console.log(
                                                                    error
                                                                );
                                                            }
                                                        );

                                                    // ---------------------------------------------------------------------------------------
                                                }
                                            },
                                            (error) => {
                                                console.log(error);
                                            }
                                        );//termina Agregar a list

                                }
                            },
                            (error) => {
                                console.log(error);
                            }
                        );
                    // -----------------------------------------------------------------------------------------------------
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Verificar Fechas Seleccionadas'
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Es necesario introducir fechas'
                });
            }
        }
    }

    public recorreListaVinMarker2(lista, arregloGeocercasEnviar) {
        var arregloVInMarker: any[] = [];
        this.vinsMarker.features = [];
        for (var i in lista) {
            const autoincrement = i;
if(lista[i]['longitud'] && lista[i]['latitud']){


            this.vinsMarker.features.push({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [
                      Number(lista[i]['latitud']),
                      Number(lista[i]['longitud'])
                    ]
                }
            });
  }
            if (Number(autoincrement) == Object.length - 1) {
              console.log(this.vinsMarker.features);
              if(    lista[i]['longitud'] && lista[i]['latitud']){


                this.coordenadaZoom = [
                  lista[i]['latitud'],
                    lista[i]['longitud']
                ];
                lista[i]['latitud']
              }else{
console.log("sin coordenada zoom");
              }
            }
        }

        this.trasadoMapaInterno2(arregloGeocercasEnviar);
    }

    public trasadoMapaInterno2(JosnUsar) {
      console.log(JosnUsar);
console.log(this.vinsMarker);
      const styles = {
            Point: new Style({
                image: new Icon({
                    anchor: DEFAULT_ANCHOR,
                    src: DEFAULT_ICON
                })
            }),
            LineString: new Style({
                stroke: new Stroke({
                    color: 'green',
                    width: 1
                })
            }),
            MultiLineString: new Style({
                stroke: new Stroke({
                    color: 'green',
                    width: 1
                })
            }),
            MultiPoint: new Style({
                image: this.image
            }),
            MultiPolygon: new Style({
                stroke: new Stroke({
                    color: 'blue',
                    width: 1
                }),
                fill: new Fill({
                    color: 'rgba(0, 0, 255, 0.1)'
                })
            }),
            Polygon: new Style({
                stroke: new Stroke({
                    color: 'blue',
                    lineDash: [4],
                    width: 3
                }),
                fill: new Fill({
                    color: 'rgba(0, 0, 255, 0.1)'
                })
            }),
            GeometryCollection: new Style({
                stroke: new Stroke({
                    color: 'magenta',
                    width: 2
                }),
                fill: new Fill({
                    color: 'magenta'
                }),
                image: new CircleStyle({
                    radius: 10,
                    fill: null,
                    stroke: new Stroke({
                        color: 'magenta'
                    })
                })
            }),
            Circle: new Style({
                stroke: new Stroke({
                    color: 'red',
                    width: 2
                }),
                fill: new Fill({
                    color: 'rgba(255,0,0,0.2)'
                })
            })
        };

        const styleFunction = function (feature) {
            return styles[feature.getGeometry().getType()];
        };

        var vectorSource2 = new VectorSource({
            features: new GeoJSON().readFeatures(JosnUsar, {
                featureProjection: 'EPSG:3857'
            })
        });

        var vectorMarker = new VectorSource({
            features: new GeoJSON().readFeatures(this.vinsMarker, {
                featureProjection: 'EPSG:3857'
            })
        });

        const verctorLayerMarker = new VectorLayer({
            source: vectorMarker,
            style: styleFunction
        });

        const vectorLayer = new VectorLayer({
            source: vectorSource2,
            style: styleFunction
        });

        this.mapEl = this.elementRef.nativeElement.querySelector(
            '#' + this.target
        );
        this.setSize();

        document.getElementById(this.target).innerHTML = "";
console.log(this.coordenadaZoom);
        this.map = new Map({
            target: this.target,
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: Proj.fromLonLat(this.coordenadaZoom),
                zoom: 8
            })
        });

        this.map.addLayer(vectorLayer);
        this.setMarker(verctorLayerMarker);
    }

    public trasadoMapaInterno(JosnUsar) {
        const styles = {
            Point: new Style({
                image: new Icon({
                    anchor: DEFAULT_ANCHOR,
                    src: DEFAULT_ICON
                })
            }),
            LineString: new Style({
                stroke: new Stroke({
                    color: 'green',
                    width: 1
                })
            }),
            MultiLineString: new Style({
                stroke: new Stroke({
                    color: 'green',
                    width: 1
                })
            }),
            MultiPoint: new Style({
                image: this.image
            }),
            MultiPolygon: new Style({
                stroke: new Stroke({
                    color: 'blue',
                    width: 1
                }),
                fill: new Fill({
                    color: 'rgba(0, 0, 255, 0.1)'
                })
            }),
            Polygon: new Style({
                stroke: new Stroke({
                    color: 'blue',
                    lineDash: [4],
                    width: 3
                }),
                fill: new Fill({
                    color: 'rgba(0, 0, 255, 0.1)'
                })
            }),
            GeometryCollection: new Style({
                stroke: new Stroke({
                    color: 'magenta',
                    width: 2
                }),
                fill: new Fill({
                    color: 'magenta'
                }),
                image: new CircleStyle({
                    radius: 10,
                    fill: null,
                    stroke: new Stroke({
                        color: 'magenta'
                    })
                })
            }),
            Circle: new Style({
                stroke: new Stroke({
                    color: 'red',
                    width: 2
                }),
                fill: new Fill({
                    color: 'rgba(255,0,0,0.2)'
                })
            })
        };

        const styleFunction = function (feature) {
            return styles[feature.getGeometry().getType()];
        };

        var vectorSource2 = new VectorSource({
            features: new GeoJSON().readFeatures(JosnUsar, {
                featureProjection: 'EPSG:3857'
            })
        });

        var vectorMarker = new VectorSource({
            features: new GeoJSON().readFeatures(this.vinsMarker, {
                featureProjection: 'EPSG:3857'
            })
        });

        const verctorLayerMarker = new VectorLayer({
            source: vectorMarker,
            style: styleFunction
        });

        const vectorLayer = new VectorLayer({
            source: vectorSource2,
            style: styleFunction
        });

        this.mapEl = this.elementRef.nativeElement.querySelector(
            '#' + this.target
        );
        this.setSize();

        document.getElementById('map').innerHTML = '';

        this.map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: Proj.fromLonLat(this.coordenadaZoom),
                zoom: 5
            })
        });

        this.map.addLayer(vectorLayer);
        this.setMarker(verctorLayerMarker);
    }

    private setSize() {
        if (this.mapEl) {
            const styles = this.mapEl.style;
            styles.height = coerceCssPixelValue(this.height) || DEFAULT_HEIGHT;
            styles.width = coerceCssPixelValue(this.width) || DEFAULT_WIDTH;
        }
    }
    public setMarker(vector: VectorLayer) {
        this.map.addLayer(vector);
    }
}

const cssUnitsPattern = /([A-Za-z%]+)$/;

function coerceCssPixelValue(value: any): string {
    if (value == null) {
        return '';
    }
    return cssUnitsPattern.test(value) ? value : `${value}px`;
}

function polygonStyleFunction(feature, resolution) {
    return new Style({
        stroke: new Stroke({
            color: 'blue',
            width: 1
        }),
        fill: new Fill({
            color: 'rgba(0, 0, 255, 0.1)'
        })
    });
}
