import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {DescargarPlacardComponent} from '@pages/componentes-utiles/descargar-placard/descargar-placard.component';
import {ModalHistorialVinComponent} from '@pages/historial/modal-historial-vin/modal-historial-vin.component';
import {GeocercasService} from '@services/geocercas.service';
import 'ol/ol.css';
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

export const DEFAULT_HEIGHT = '500px';
export const DEFAULT_WIDTH = '500px';

export const DEFAULT_LAT = -34.603490361131385;
export const DEFAULT_LON = -58.382037891217465;
export const DEFAULT_ANCHOR = [0.5, 0.5];
export const DEFAULT_ICON = '/assets/iconos/2.png';

import {defaults as defaultControls, Control} from 'ol/control';
import {ManifiestoService} from '@services/manifiesto.service';
import { PlacardMultipleComponent } from '@pages/componentes-utiles/placard-multiple/placard-multiple.component';

@Component({
    selector: 'app-vins-manifiesto',
    templateUrl: './vins-manifiesto.component.html',
    styleUrls: ['./vins-manifiesto.component.scss']
})
export class VinsManifiestoComponent implements OnInit {
    @Input() lat: number = DEFAULT_LAT;
    @Input() lon: number = DEFAULT_LON;
    @Input() zoom: number;
    @Input() width: string | number = DEFAULT_WIDTH;
    @Input() height: string | number = DEFAULT_HEIGHT;

    target: string = 'map-vin-manifiesto';
    map: Map;
    private mapEl: HTMLElement;

    private image = new CircleStyle({
        radius: 5,
        fill: null,
        stroke: new Stroke({color: 'red', width: 1})
    });
    private coordenadaZoom;

    private geojsonObject = {
        type: 'FeatureCollection',
        crs: {
            type: 'name',
            properties: {name: 'urn:ogc:def:crs:OGC:1.3:CRS84'}
        },
        features: []
    };

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

    public geocercasList: any[] = [];
    public featuresList: any[] = [];
    public listTabla: any[] = [];
    public mostrarTabla = false;
    constructor(
        private route: ActivatedRoute,
        private modalService: NgbModal,
        private _geocercaService: GeocercasService,
        private elementRef: ElementRef,
        private _serviceManifiesto: ManifiestoService
    ) {}
    dtOptions: any = {};
    id: string = '';
    modalOptions: NgbModalOptions;

    vinPDF: String = '1234';



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
              'colvis',

            ],
            language: {
              "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
            }
          };

        this.id = this.route.snapshot.paramMap.get('id');

        this.modalOptions = {
            backdrop: 'static',
            backdropClass: 'customBackdrop'
        };

        this.vinsLista();
        this.trasadoMapa();

    }

    ngAfterViewInit() {

    }

    vinsLista() {
        this._serviceManifiesto.vinsManifiesto(Number(this.id)).subscribe(
            (data) => {

                this.listTabla = [];
                this.listTabla = data[0];

                this.recorreListaVinMarker(this.listTabla);

                this.mostrarTabla = true;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    public recorreListaVinMarker(lista) {
        var arregloVInMarker: any[] = [];

        for (var i in lista) {
          const autoincrement = i;

            this.vinsMarker.features.push({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [ Number(lista[i]['latitud']),
                    Number(lista[i]['longitud'])]
                }
            });



if (Number(autoincrement) == lista.length - 1) {

              if(    lista[i]['longitud'] && lista[i]['latitud']){


                this.coordenadaZoom = [
                  lista[i]['latitud'],
                    lista[i]['longitud']
                ];

              }else{

              }
            }
        }
    }

    abrirModalHistorialVin(vin: string) {
        const modalRef = this.modalService.open(ModalHistorialVinComponent, {
            size: 'xl'
        });
        modalRef.componentInstance.titulo = 'Historial Vin';
        modalRef.componentInstance.vin = vin;
    }


    abrirModalDescargarPlacard(vin: String) {
        const modalRef = this.modalService.open(DescargarPlacardComponent);
        modalRef.componentInstance.Vin = vin;
    }

    abrirModalMuiltiplePlacard(){
      const modalRef = this.modalService.open(PlacardMultipleComponent);
      modalRef.componentInstance.Vin = this.listTabla;
      modalRef.componentInstance.VinManifiesto=this.id;
      modalRef.componentInstance.Tipo="Manifiesto";
    }
    public trasadoMapa() {
        this.geojsonObject.features = [];

        // this._serviceManifiesto
        //     .geocercasVinsManifiesto(Number(this.id))
        this._geocercaService
        .listarGeocercasLocalidad(localStorage.getItem('idlocalidad'))
            .subscribe(
                (data) => {
                    this.geocercasList = data;

                    for (var i in this.geocercasList) {
                        const autoincremente = i;

                        const nombre = this.geocercasList[i]['geocerca'];
                        const idgeocercaParametro =
                            this.geocercasList[i]['idgeocerca'];



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

        document.getElementById(this.target).innerHTML = '';

        this.map = new Map({
            target: this.target,
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],

            view: new View({
                center: Proj.fromLonLat(this.coordenadaZoom),
                zoom: 10
            })
        });

        this.map.addLayer(vectorLayer);
        this.setMarker(verctorLayerMarker);
    }
    public recorrerLista(Object): Number[] {
        var arregloprueba: any[] = [];

        for (var i in Object) {
            const autoincrement = i;
            arregloprueba.push([Object[i]['longitud'], Object[i]['latitud']]);
            if (Number(autoincrement) == Object.length - 1) {

            }
        }

        return arregloprueba;
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

    public setControl(control: Control) {
        this.map.addControl(control);
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
