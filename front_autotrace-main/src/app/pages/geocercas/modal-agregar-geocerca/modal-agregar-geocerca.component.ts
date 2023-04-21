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

import {Draw, Modify, Snap} from 'ol/interaction';
import {LocalidadesService} from '@services/localidades.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GeocercasService} from '@services/geocercas.service';
import {Util} from '@/utils/Util';
import {NgxSpinnerService} from 'ngx-spinner';
@Component({
    selector: 'app-modal-agregar-geocerca',
    templateUrl: './modal-agregar-geocerca.component.html',
    styleUrls: ['./modal-agregar-geocerca.component.scss']
})
export class ModalAgregarGeocercaComponent implements OnInit {
    @Input() tituloModal: any;
    dtOptions: any = {};
    dtTrigger = new Subject<any>();
    arregloPoligono: any[] = [];
    listLocalidades: any[] = [];

    draw;
    snap;
    map;
    form: FormGroup;
    constructor(
        public activeModal: NgbActiveModal,
        private _localidadesService: LocalidadesService,
        private fb: FormBuilder,
        private _ServiceGeocerca: GeocercasService,
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
        this.codigoFuncional();
        this.obtenerLocalidades();
    }

    validacionNoCaracteresEspeciales(event) {
      Util.quitarCaracteresEspeciales(event);
  }

    obtenerLocalidades() {
        this._localidadesService.getListLocalidades().subscribe(
            (data) => {
                this.listLocalidades = data[0];
            },
            (error) => {
                console.log(error);
            }
        );
    }

    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }

    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
    }

    codigoFuncional() {

      document.getElementById('map-modal-dibujar').innerHTML = '';

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

        this.map = new Map({
            layers: [raster, vector],
            target: 'map-modal-dibujar',
            view: new View({
                center: [-102.184864, 17.967637],
                zoom: 4,
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

        var defaultStyle = new Modify({source: source})
            .getOverlay()
            .getStyleFunction();

        var modify = new Modify({
            source: source,
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
            this.addInteractions(source);
            var feature = this.map.forEachFeatureAtPixel(
                this.map.getEventPixel(e),
                function (feature, layer) {
                    return feature;
                }
            );
        });

        this.addInteractions(source);
    }

    addInteractions(source) {

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
                this.addInteractions(source);
                this.arregloPoligono = [];
                this.codigoFuncional();
            }
        });
    }

    agregar() {
        const idegeocerca = this.form.get('codigo')?.value;
        const idLocalidad = this.form.get('localidad')?.value;
        const descripcion = this.form.get('descripcion')?.value;
        const body: any = {
            idgeocerca: idegeocerca,
            idlocalidad: idLocalidad,
            geocerca: descripcion
        };

        if (this.form.valid && this.arregloPoligono.length > 0) {
          this.spinner.show();
            this._ServiceGeocerca.createGeocerca(body).subscribe(
                (data) => {
                    this.Metodo(0, idegeocerca);
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

            this._ServiceGeocerca.createPuntoPoligono(body2).subscribe(
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
