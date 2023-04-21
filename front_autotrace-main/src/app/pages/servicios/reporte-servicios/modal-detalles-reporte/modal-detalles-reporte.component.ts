import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { Circle as CircleStyle, Fill, Icon, Stroke, Style } from 'ol/style.js';
import { OSM } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeocercasService } from '@services/geocercas.service';
import { SelectLocalidadService } from '@services/select-localidad.service';
import { ReporteServiciosService } from '@services/reporte-servicios.service';
export const DEFAULT_ANCHOR = [0.5, 0.5];
export const DEFAULT_ICON = '/assets/iconos/2.png';

@Component({
  selector: 'app-modal-detalles-reporte',
  templateUrl: './modal-detalles-reporte.component.html',
  styleUrls: ['./modal-detalles-reporte.component.scss']
})
export class ModalDetallesReporteComponent implements OnInit {

  @Input() tituloModal: any;
  @Input() fecha: any;
  mostrarTable = false;
  public listDetallesReporte: any[] = [];

  dtOptions: any = {};
  dtTrigger = new Subject<any>();

  selectLocalidadSuscripcion: Subscription;
  geocercasList: any[] = [];
  map;
  private coordenadaZoom;
  public featuresList: any[] = [];

  private geojsonObject = {
    type: 'FeatureCollection',
    crs: {
      type: 'name',
      properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' }
    },
    features: []
  };

  private vinsMarker = {
    "type": "FeatureCollection", "features": [

    ]
  };

  constructor(public activeModal: NgbActiveModal,
    private _geocercaService: GeocercasService,
    private selectService: SelectLocalidadService,
    private spinner: NgxSpinnerService,
    private _reporteServicios: ReporteServiciosService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      serverSide: false,
      processing: true,
      scrollX: true,
      scrollY: "400px",
      scrollCollapse: true,
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
    this.detallesReporte();

    this.geocercasLocalidad(localStorage.getItem('idlocalidad'));

    this.selectLocalidadSuscripcion =
      this.selectService.cambioLocalidad.subscribe((cambio) => {
        this.geocercasLocalidad(
          localStorage.getItem('idlocalidad')
        );
        console.log(cambio);
      });
  }

  ngAfterViewInit(): void {
    //this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    //this.dtTrigger.unsubscribe();
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


  }

  detallesReporte() {
    this.spinner.show("spinMapa");
    const idlocalidad = localStorage.getItem("idlocalidad");
    this._reporteServicios.getVinsReporteServicios(this.fecha, idlocalidad).subscribe(data => {
      this.listDetallesReporte = data[0];
      console.log(this.listDetallesReporte);
      this.recorreListaVinMarker(this.listDetallesReporte)
      this.mostrarTable = true;
      this.spinner.hide("spinMapa");
    }, error => {
      this.spinner.hide("spinMapa");
      console.log(error);
    })
  }

  public recorreListaVinMarker(lista) {
    var arregloVInMarker: any[] = [];
    for (var i in lista) {
      console.log("longitud: " + lista[i]['longitud']);
      console.log("latitud: " + lista[i]['latitud']);

      this.vinsMarker.features.push(
        {
          "type": "Feature", "geometry":
          {
            "type": "Point", "coordinates":
              [
                lista[i]['latitud'], lista[i]['longitud']

              ]
          },
        }
      );
    }
  }

  geocercasLocalidad(id: string) {
    this.spinner.show("spinMapa");
    this._geocercaService.getListGeocercasLocalidad(id).subscribe(
      (data) => {
        this.geocercasList = [];
        this.geocercasList = data;

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
                properties: { name: element },
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
              this.spinner.hide("spinMapa");
            },
            (error) => {
              this.spinner.hide("spinMapa");
              console.log(error);
            }
          );
        }
      },
      (error) => {
        this.spinner.hide("spinMapa");
        console.log(error);
      }
    );
  }

  codigoFuncional(JsonUsar, coordenadaZoomUsar) {
    document.getElementById('map-menu-geocercas').innerHTML = '';

    const styles = {
      'Point': new Style({
        image: new Icon({
          anchor: DEFAULT_ANCHOR,
          src: DEFAULT_ICON,
        })
      })
    };
    const styleFunction = function (feature) {
      return styles[feature.getGeometry().getType()];
    };

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

    var vectorMarker = new VectorSource({
      features: (new GeoJSON()).readFeatures(this.vinsMarker, {})
    });

    const verctorLayerMarker = new VectorLayer({
      source: vectorMarker,
      style: styleFunction
    });


    this.map = new Map({
      layers: [raster, vectorLayer, verctorLayerMarker],
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
        console.log("coordenada zoom" + this.coordenadaZoom);
      }
    }
    return arregloprueba;
  }
}
