import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
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
import {VinService} from '@services/vin.service';
export const DEFAULT_HEIGHT = '500px';
export const DEFAULT_WIDTH = '500px';
import { NgxSpinnerService } from 'ngx-spinner';

export const DEFAULT_LAT = -34.603490361131385;
export const DEFAULT_LON = -58.382037891217465;

export const DEFAULT_ANCHOR = [0.5, 0.5];
export const DEFAULT_ICON = '/assets/iconos/2.png';

@Component({
    selector: 'app-modal-historial-vin',
    templateUrl: './modal-historial-vin.component.html',
    styleUrls: ['./modal-historial-vin.component.scss']
})
export class ModalHistorialVinComponent implements OnInit {
    dtOptions: any = {};
    @Input() titulo: any;
    @Input() vin: any;
    @Input() lat: number = DEFAULT_LAT;
    @Input() lon: number = DEFAULT_LON;
    @Input() zoom: number;
    @Input() width: string | number = DEFAULT_WIDTH;
    @Input() height: string | number = DEFAULT_HEIGHT;

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

    public serviciosList: any[] = [];
    public vinshistoricosList: any[] = [];
    public mostrarTabla = false;
    public mostrarTabla2 = false;
    public coordenadaZoom;

    public listDecoder: any[] = [];
    // private ubicacionesVins
    target: string = 'map-modal';
    map: Map;
    private mapEl: HTMLElement;

    constructor(
        public activeModal: NgbActiveModal,
        private elementRef: ElementRef,
        private _servicioVin: VinService,
        private spinner: NgxSpinnerService
    ) {}

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
        // console.log(this.vin);
        this.serviciosVins();
        this.vinshistoricos();
    }

    ngAfterViewInit() {
        this.vinsLista();
        this.obtenerDecoderVin();
    }

    vinsLista() {
        this._servicioVin.historialUbicacionesVin(this.vin).subscribe(
            (data) => {
                let listUbicaciones: any[] = [];
                listUbicaciones = data[0];
                // console.log(listUbicaciones);
                this.recorreListaVinMarker(listUbicaciones);
                // console.log(this.vinsMarker);
                // console.log(this.jsonMarker);
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
                    coordinates: [
                        Number(lista[i]['latitud']),
                        Number(lista[i]['longitud']) 
                    ]
                }
            });
            // console.log(this.vinsMarker);

            if (Number(autoincrement) == Object.length - 1) {
                // console.log('Entro a dibujar mapa');
                this.coordenadaZoom = [
                    lista[i]['latitud'],
                    lista[i]['longitud']
                ];
            }
        }

        this.trasadoMapaInterno();
    }

    serviciosVins() {
        this.spinner.show("spinServicios")
        this._servicioVin.historicoServiciosVin(this.vin).subscribe(
            (data) => {
                this.serviciosList = [];
                this.serviciosList = data[0];
                //console.log(this.serviciosList);
                this.mostrarTabla = true;
                this.spinner.hide("spinServicios");
            },
            (error) => {
                console.log(error);
                this.spinner.hide("spinServicios");
            }
        );
    }

    vinshistoricos() {
        this.spinner.show("spinHistorico");
        this._servicioVin.historicoVin(this.vin).subscribe(
            (data) => {
                this.vinshistoricosList = [];
                this.vinshistoricosList = data[0];
                // console.log(this.vinshistoricosList);
                this.mostrarTabla2 = true;
                this.spinner.hide("spinHistorico");
            },
            (error) => {
                console.log(error);
                this.spinner.hide("spinHistorico");
            }
        );
    }

    obtenerDecoderVin() {
        this.spinner.show("spinDecodificacion");
        this._servicioVin.obtenerDecoderVin(this.vin).subscribe(
            (data) => {
                this.listDecoder = [];
                this.listDecoder = data[0];
                // console.log(this.listDecoder);
                this.spinner.hide("spinDecodificacion");
            },
            (error) => {
                console.log(error);
                this.spinner.hide("spinDecodificacion");
            }
        );
    }

    public trasadoMapaInterno() {
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

        // var vectorSource2 = new VectorSource({
        //   features: (new GeoJSON())
        //     .readFeatures(JosnUsar, {
        //       featureProjection: 'EPSG:3857'
        //     })
        // });

        var vectorMarker = new VectorSource({
            features: new GeoJSON().readFeatures(this.vinsMarker, {
                featureProjection: 'EPSG:3857'
            })
        });

        const verctorLayerMarker = new VectorLayer({
            source: vectorMarker,
            style: styleFunction
        });

        // const vectorLayer = new VectorLayer({
        //   source: vectorSource2,
        //   style: styleFunction,
        // });

        this.mapEl = this.elementRef.nativeElement.querySelector(
            '#' + this.target
        );
        this.setSize();

        document.getElementById('map-modal').innerHTML = '';

        this.map = new Map({
            target: 'map-modal',
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

        // this.map.addLayer(vectorLayer);
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
