import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {Subject, Subscription} from 'rxjs';
import {ModalAgregarGeocercaComponent} from './modal-agregar-geocerca/modal-agregar-geocerca.component';
import {ModalEditarGeocercaComponent} from './modal-editar-geocerca/modal-editar-geocerca.component';
import Swal from 'sweetalert2';
import {GeocercasService} from '@services/geocercas.service';
import {SelectLocalidadService} from '@services/select-localidad.service';

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import {Circle as CircleStyle, Fill, Icon, Stroke, Style} from 'ol/style.js';
import {OSM} from 'ol/source';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON.js';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-geocercas',
    templateUrl: './geocercas.component.html',
    styleUrls: ['./geocercas.component.scss']
})
export class GeocercasComponent implements OnInit, OnDestroy {
    selectLocalidadSuscripcion: Subscription;
    dtTrigger = new Subject<any>();
    modalOptions: NgbModalOptions;
    dtOptions: any = {};
    geocercasList: any[] = [];
    public mostrarTabla = false;
    map;
    private coordenadaZoom;
    public featuresList: any[] = [];

    private geojsonObject = {
        type: 'FeatureCollection',
        crs: {
            type: 'name',
            properties: {name: 'urn:ogc:def:crs:OGC:1.3:CRS84'}
        },
        features: []
    };
    form: FormGroup;
    constructor(
        private modalService: NgbModal,
        private _geocercaService: GeocercasService,
        private selectService: SelectLocalidadService,
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
        this.geocercasLocalidad(localStorage.getItem('idlocalidad'));

        this.selectLocalidadSuscripcion =
            this.selectService.cambioLocalidad.subscribe((cambio) => {
                this.geocercasLocalidad(
                    localStorage.getItem('idlocalidad')
                );

            });
    }

    geocercasLocalidad(id: string) {

        this._geocercaService.listarGeocercasLocalidad(id).subscribe(
            (data) => {

                this.geocercasList = [];
                this.mostrarTabla = false;
                this.geocercasList = data;
                this.mostrarTabla = true;

                for (
                    let index = 0;
                    index < this.geocercasList.length;
                    index++
                ) {
                    const element = this.geocercasList[index]['idgeocerca'];

                    this._geocercaService.getPuntos(element).subscribe(
                        (data) => {
                            this.featuresList = data;

                            this.geojsonObject.features.push({
                                type: 'Feature',
                                properties: {name: element},
                                geometry: {
                                    type: 'Polygon',
                                    coordinates: [
                                        this.recorrerLista(this.featuresList)
                                    ]
                                }
                            });
                            this.codigoFuncional(
                                this.geojsonObject,
                                this.coordenadaZoom
                            );
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

    filtroPatron() {
        const cadena = this.form.get('patronBusqueda')?.value;

        if (this.form.valid) {
            this.mostrarTabla = false;
            this._geocercaService.buscarPatronGeocerca(cadena).subscribe(
                (data) => {
                    this.featuresList = [];

                    this.geojsonObject = {
                        type: 'FeatureCollection',
                        crs: {
                            type: 'name',
                            properties: {name: 'urn:ogc:def:crs:OGC:1.3:CRS84'}
                        },
                        features: []
                    };

                    this.geocercasList = [];
                    this.mostrarTabla = false;
                    this.geocercasList = data[0];
                    this.mostrarTabla = true;

                    for (
                        let index = 0;
                        index < this.geocercasList.length;
                        index++
                    ) {
                        const element = this.geocercasList[index]['idgeocerca'];

                        this._geocercaService.getPuntos(element).subscribe(
                            (data) => {
                                this.featuresList = data;

                                this.geojsonObject.features.push({
                                    type: 'Feature',
                                    properties: {name: element},
                                    geometry: {
                                        type: 'Polygon',
                                        coordinates: [
                                            this.recorrerLista(
                                                this.featuresList
                                            )
                                        ]
                                    }
                                });
                                this.codigoFuncional(
                                    this.geojsonObject,
                                    this.coordenadaZoom
                                );
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
        } else {
          if(cadena==""){
            this.geocercasLocalidad(
              localStorage.getItem('idlocalidad')
          );
        }else{
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

    codigoFuncional(JsonUsar, coordenadaZoomUsar) {
        document.getElementById('map-menu-geocercas').innerHTML = '';
        var raster = new TileLayer({
            source: new OSM()
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
            target: 'map-menu-geocercas',
            view: new View({
                center: coordenadaZoomUsar,
                zoom: 15,
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

    abrirModalAgregarGeocerca() {
        const modalRef = this.modalService.open(ModalAgregarGeocercaComponent, {
            size: 'xl'
        });
        modalRef.componentInstance.tituloModal = 'Agregar geocerca';
        modalRef.closed.subscribe((cambio) => {
            this.mostrarTabla = false;
            this.limpiarMapa();
            this.syncDelay(10);
            this.geocercasLocalidad(
                localStorage.getItem('idlocalidad')
            );
        });
    }
    syncDelay(milliseconds) {
        var start = new Date().getTime();
        var end = 0;
        while (end - start < milliseconds) {
            end = new Date().getTime();
        }
    }

    abrirModalEditarGeocerca(row) {
        const modalRef = this.modalService.open(ModalEditarGeocercaComponent, {
            size: 'xl'
        });
        modalRef.componentInstance.tituloModal = 'Editar geocerca';
        modalRef.componentInstance.datos = row;
        modalRef.closed.subscribe((cambio) => {
            this.mostrarTabla = false;
            this.limpiarMapa();
            this.syncDelay(10);
            this.geocercasLocalidad(
                localStorage.getItem('idlocalidad')
            );
        });
    }

    limpiarMapa(){
      this. coordenadaZoom=[];
      this.featuresList=[];

      this.geojsonObject = {
          type: 'FeatureCollection',
          crs: {
              type: 'name',
              properties: {name: 'urn:ogc:def:crs:OGC:1.3:CRS84'}
          },
          features: []
      };
    }

    eliminarRegistro(row) {
        Swal.fire({
            title: '¿Está seguro de eliminar?',
            text: 'No podrás revertir esta acción',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                this._geocercaService.deleteGeocerca(row.idgeocerca).subscribe(
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
                        // this.obtenerListaTipoReparacion();
                        this.limpiarMapa();
                        this.geocercasLocalidad(
                            localStorage.getItem('idlocalidad')
                        );

                    },
                    (error) => {
                        console.log(error);
                    }
                );
            }
        });
    }

    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }

    ngOnDestroy(): void {
        this.selectLocalidadSuscripcion.unsubscribe();
    }
}
