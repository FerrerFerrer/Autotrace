import {Component, Input, OnInit} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import Swal from 'sweetalert2';

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import {Circle as CircleStyle, Fill, Icon, Stroke, Style} from 'ol/style.js';
import {OSM} from 'ol/source';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON.js';
import {Draw, Modify, Snap} from 'ol/interaction';


import {LocalidadesService} from '@services/localidades.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GeocercasService} from '@services/geocercas.service';
import {Util} from '@/utils/Util';
import {NgxSpinnerService} from 'ngx-spinner';
@Component({
    selector: 'app-modal-editar-geocerca',
    templateUrl: './modal-editar-geocerca.component.html',
    styleUrls: ['./modal-editar-geocerca.component.scss']
})
export class ModalEditarGeocercaComponent implements OnInit {
    @Input() tituloModal: any;
    @Input() datos: any;
    dtOptions: any = {};
    dtTrigger = new Subject<any>();
    arregloPoligono: any[] = [];
    listLocalidades: any[] = [];
    private coordenadaZoom;
    public featuresList: any[] = [];
    modificacionPoligono: boolean = false;
    private geojsonObject = {
        type: 'FeatureCollection',
        crs: {
            type: 'name',
            properties: {name: 'urn:ogc:def:crs:OGC:1.3:CRS84'}
        },
        features: []
    };

    draw;
    snap;
    map;
    form: FormGroup;

    constructor(
        public activeModal: NgbActiveModal,
        private _geocercaService: GeocercasService,
        private fb: FormBuilder,
        private _localidadesService: LocalidadesService,
        private spinner: NgxSpinnerService
    ) {
        this.form = this.fb.group({
            codigo: ['', [Validators.required, Validators.maxLength(4)]],
            descripcion: ['', [Validators.required, Validators.maxLength(50)]],
            localidad: ['', [Validators.required, Validators.maxLength(4)]]
        });
    }

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
        this.obtenerPuntosPoligono();
        this.obtenerLocalidades();

        this.form.patchValue({
            codigo: this.datos.idgeocerca,
            descripcion: this.datos.geocerca,
            localidad: this.datos.idlocalidad
        });

        console.log(this.datos);
    }

    obtenerLocalidades() {
        this._localidadesService.getListLocalidades().subscribe(
            (data) => {
                this.listLocalidades = data[0];
                console.log(data[0]);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    codigoFuncional(JsonUsar, coordenadaZoomUsar) {

        document.getElementById('map-modal-editar').innerHTML = '';


        var raster = new TileLayer({
            source: new OSM()
        });

        var source = new VectorSource();

        var vector = new VectorLayer({
            source: source,
            style: function (feature) {
                const geometry = feature.getGeometry();
                return geometry.getType() === 'GeometryCollection'
                    ? geodesicStyle
                    : style;
            }
        });


        var vectorSource2 = new VectorSource({
            features: new GeoJSON().readFeatures(JsonUsar, {})
        });

        var vectorLayer = new VectorLayer({
            source: vectorSource2,
            style: function (feature) {
                const geometry = feature.getGeometry();
                return geometry.getType() === 'GeometryCollection'
                    ? geodesicStyle
                    : style;
            }
        });

        this.map = new Map({
            layers: [raster, vectorLayer],
            target: 'map-modal-editar',
            view: new View({
                center: coordenadaZoomUsar,
                zoom: 16,
                projection: 'CRS:84'
            })
        });


        var style = new Style({
            fill: new Fill({
                color: 'rgba(0, 0, 255, 0.1)'
            }),
            stroke: new Stroke({
                color: 'black',
                width: 2
            }),
            image: new CircleStyle({
                radius: 7,
                fill: new Fill({
                    color: '#ffcc33'
                })
            })
        });

        var geodesicStyle = new Style({
            geometry: function (feature) {
                return feature.get('modifyGeometry') || feature.getGeometry();
            },
            fill: new Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new Stroke({
                color: '#ff3333',
                width: 2
            }),
            image: new CircleStyle({
                radius: 7,
                fill: new Fill({
                    color: 'rgba(0, 0, 0, 0)'
                })
            })
        });

        var defaultStyle = new Modify({source: vectorSource2})
            .getOverlay()
            .getStyleFunction();

        var modify = new Modify({
            source: vectorSource2,
            style: function (feature) {
                return defaultStyle(feature, 0);
            }
        });

        modify.on('modifystart', function (event) {
            event.features.forEach(function (feature) {
                const geometry = feature.getGeometry();
                if (geometry.getType() === 'GeometryCollection') {
                    feature.set('modifyGeometry', geometry.clone(), true);
                }
            });
        });

        modify.on('modifyend', (event) => {

            this.modificacionPoligono = true;
            event.features.forEach(function (feature) {
                const modifyGeometry = feature.get('modifyGeometry');
                if (modifyGeometry) {
                    feature.setGeometry(modifyGeometry);
                    feature.unset('modifyGeometry', true);
                }
            });
            const test = event.features.getArray();
            const test2: any = test[0].getGeometry();
            this.arregloPoligono = test2.getCoordinates();
        });

        this.map.addInteraction(modify);

        this.map.getViewport().addEventListener('contextmenu', (e) => {
            e.preventDefault();

            this.map.removeInteraction(this.draw);
            this.map.removeInteraction(this.snap);
            this.addInteractions(source, JsonUsar, coordenadaZoomUsar);
            var feature = this.map.forEachFeatureAtPixel(
                this.map.getEventPixel(e),
                function (feature, layer) {
                    return feature;
                }
            );
        });

        this.addInteractions(source, JsonUsar, coordenadaZoomUsar);
    }

    addInteractions(source, JsonUsar, coordenadaZoomUsar) {
        let geometryFunction;

        var Polygon: any = 'Polygon';
        this.draw = new Draw({
            source: source,
            type: Polygon,
            geometryFunction: geometryFunction
        });

        this.map.addInteraction(this.draw);
        this.snap = new Snap({source: source});
        this.map.addInteraction(this.snap);
        this.map.getCoordinateFromPixel;

        this.draw.on('drawend', (event) => {
            const myLatestNewFeature = event.feature.getGeometry();
            this.arregloPoligono = myLatestNewFeature.getCoordinates();
        });

        this.draw.on('drawstart', (event) => {
            if (this.arregloPoligono.length > 0) {
                this.map.removeInteraction(this.draw);
                this.map.removeInteraction(this.snap);
                this.addInteractions(source, JsonUsar, coordenadaZoomUsar);
                this.arregloPoligono = [];
                this.modificacionPoligono = false;
                this.codigoFuncional(JsonUsar, coordenadaZoomUsar);
            }
        });
    }
    obtenerPuntosPoligono() {
        this._geocercaService.getPuntos(this.datos.idgeocerca).subscribe(
            (data) => {
                this.featuresList = data;

                this.geojsonObject.features.push({
                    type: 'Feature',
                    properties: {name: this.datos.geocerca},
                    geometry: {
                        type: 'Polygon',
                        coordinates: [this.recorrerLista(this.featuresList)]
                    }
                });
                this.codigoFuncional(this.geojsonObject, this.coordenadaZoom);
            },
            (error) => {
                console.log(error);
            }
        );
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

    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
    }

    editar() {
        const idegeocerca = this.form.get('codigo')?.value;
        const idLocalidad = this.form.get('localidad')?.value;
        const descripcion = this.form.get('descripcion')?.value;

        const body: any = {
            idgeocercaNuevo: idegeocerca,
            idlocalidad: idLocalidad,
            geocerca: descripcion
        };

        if (this.form.valid ) {
          this.spinner.show();
            this._geocercaService
                .updateGecerca(this.datos.idgeocerca, body)
                .subscribe(
                    (data) => {
                        if (this.modificacionPoligono) {
                            this._geocercaService
                                .deletePuntosPoligono(idegeocerca)
                                .subscribe(
                                    (data) => {
                                        this.Metodo(0, idegeocerca);
                                    },
                                    (error) => {

                                        console.log(error);
                                    }
                                );
                        }else{
                          this.activeModal.close();
                          this.spinner.hide();
                          Swal.fire({
                              position: 'center',
                              icon: 'success',
                              title: 'Se Guardo correctamente',
                              showConfirmButton: false,
                              timer: 1500
                          });
                        }
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Verificar Datos Ingresados Y/O Poligono Trazado!',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    Metodo(i, idgeocerca) {
        if (i < this.arregloPoligono[0].length) {
            const element = this.arregloPoligono[0][i];
            const body2: any = {
                idgeocerca: idgeocerca,
                longitud: element[0],
                latitud: element[1]
            };

            this._geocercaService.createPuntoPoligono(body2).subscribe(
                (data) => {
                    this.Metodo(i + 1, idgeocerca);
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            this.activeModal.close();
            this.spinner.hide();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se Guardo correctamente',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
}
