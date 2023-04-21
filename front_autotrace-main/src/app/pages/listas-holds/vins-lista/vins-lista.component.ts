import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DescargarPlacardComponent } from '@pages/componentes-utiles/descargar-placard/descargar-placard.component';
import { ModalHistorialVinComponent } from '@pages/historial/modal-historial-vin/modal-historial-vin.component';
import { GeocercasService } from '@services/geocercas.service';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON.js';
import { Circle as CircleStyle, Fill, Icon, Stroke, Style, Text } from 'ol/style.js';
import { OSM } from 'ol/source';
import * as Proj from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import { ListasService } from '@services/listas.service';
import { ModalEnviarListaCorreoComponent } from '../modal-enviar-lista-correo/modal-enviar-lista-correo.component';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

export const DEFAULT_HEIGHT = '500px';
export const DEFAULT_WIDTH = '500px';

export const DEFAULT_LAT = -34.603490361131385;
export const DEFAULT_LON = -58.382037891217465;

export const DEFAULT_ANCHOR = [0.5, 0.5];
export const DEFAULT_ICON = '/assets/iconos/2.png';

import * as XLSX from 'xlsx';
import { SendMailService } from '@services/send-mail.service';
import { PlacardMultipleComponent } from '@pages/componentes-utiles/placard-multiple/placard-multiple.component';
@Component({
  selector: 'app-vins-lista',
  templateUrl: './vins-lista.component.html',
  styleUrls: ['./vins-lista.component.scss']
})


export class VinsListaComponent implements OnInit {
  mostrarTabla: boolean = false;
  @Input() lat: number = DEFAULT_LAT;
  @Input() lon: number = DEFAULT_LON;
  @Input() zoom: number;
  @Input() width: string | number = DEFAULT_WIDTH;
  @Input() height: string | number = DEFAULT_HEIGHT;
  @ViewChild('table') table: ElementRef;
  abrirModalEnviarCorreo() {
    const modalRef = this.modalService.open(ModalEnviarListaCorreoComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.tituloModal = 'Enviar lista';

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let JSOnExcel = XLSX.utils.sheet_to_json(ws);
    let test = XLSX.utils.sheet_to_csv(ws);

    modalRef.componentInstance.JSOnExcel = test;
    modalRef.componentInstance.IdLista = this.id;

  }

  private geojsonObject =
    {
      "type": "FeatureCollection",
      "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
      "features": [
      ]
    };

  private image = new CircleStyle({
    radius: 5,
    fill: null,
    stroke: new Stroke({ color: 'red', width: 1 }),
  });
  private coordenadaZoom;
  private jsonMarker = {
    "type": "FeatureCollection", "features": [
      {
        "type": "Feature", "geometry":
        {
          "type": "Point", "coordinates":
            [-102.184864, 17.967637]
        },
      },
      {
        "type": "Feature", "geometry":
        {
          "type": "Point", "coordinates":
            [-102.186114, 17.968704]
        }
      },
      {
        "type": "Feature", "geometry":
        {
          "type": "Point", "coordinates":
            [-102.181999, 17.971411]
        }
      }
    ]
  };

  private vinsMarker = {
    "type": "FeatureCollection", "features": [

    ]
  };


  target: string = 'map-vin-lista';
  map: Map;
  private mapEl: HTMLElement;

  public geocercasList: any[] = [];
  public featuresList: any[] = [];
  public listVins: any[] = [];

  dtOptions: any = {};
  modalOptions: NgbModalOptions;
  id: string = '';


  constructor(private modalService: NgbModal, 
    private route: ActivatedRoute, 
    private _geocercaService: GeocercasService,
    private spinner: NgxSpinnerService,
    private elementRef: ElementRef, 
    private _listasService: ListasService, 
    private servcieEmail: SendMailService) {
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

    this.id = this.route.snapshot.paramMap.get('id');

    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
    }

    this.trasadoMapa();

  }


  ngAfterViewInit() {
    this.vinsLista();
  }

  abrirModalHistorialVin(vinmodalHistorial: string) {
    const modalRef = this.modalService.open(ModalHistorialVinComponent, { size: 'xl' });

    modalRef.componentInstance.titulo = 'Historial Vin';
    modalRef.componentInstance.vin = vinmodalHistorial;

  }

  holdMasivo() {
    Swal.fire({
      title: '¿Aplicar hold masivo a la lista?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, confirmar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this._listasService.holdMasivo(this.id).subscribe((data) =>{
          this.spinner.hide();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'El hold masivo se ha aplicado correctamente',
            showConfirmButton: false,
            timer: 1500
          });
        })
      }
    });
  }

  abrirModalDescargarPlacard(vin: String) {
    const modalRef = this.modalService.open(DescargarPlacardComponent);
    modalRef.componentInstance.Vin = vin;
  }

  abrirModalMuiltiplePlacard() {
    const modalRef = this.modalService.open(PlacardMultipleComponent);
    modalRef.componentInstance.Vin = this.listVins;
    modalRef.componentInstance.VinManifiesto = this.id;
    modalRef.componentInstance.Tipo = "Lista";
  }

  vinsLista() {
    this._listasService.vinsLista(Number(this.id)).subscribe(
      data => {
        this.listVins = [];
        this.listVins = data[0];
        this.mostrarTabla = true;
        this.recorreListaVinMarker(this.listVins)
      }, error => {
        console.log(error);
      }
    );
  }

  public trasadoMapa() {


    this.geojsonObject.features = [];

    this._geocercaService.getGeocercasList(Number(this.id)).subscribe(
      data => {
        this.geocercasList = data[0];
        // console.log(this.geocercasList);
        for (var i in this.geocercasList) {
          const autoincremente = i;

          const nombre = this.geocercasList[i]['geocerca'];
          const idgeocercaParametro = this.geocercasList[i]['idgeocerca'];
          // console.log('nombre: ' + nombre + ' id: ' + idgeocercaParametro);
          this._geocercaService.getPuntos(idgeocercaParametro).subscribe(
            data => {
              this.featuresList = data;

              this.geojsonObject.features.push(
                {
                  "type": "Feature", "properties": { "name": nombre }, "geometry":
                  {
                    "type": "Polygon", "coordinates": [
                      this.recorrerLista(this.featuresList)
                    ]
                  }
                },
              );

              if (Number(autoincremente) == (this.geocercasList.length - 1)) {
                // console.log('Entro a dibujar mapa');
                this.trasadoMapaInterno(this.geojsonObject);
              }

            }, error => {
              console.log(error);
            }
          )
        }
      }, error => {
        console.log(error);
      }
    );
  }

  public recorrerLista(Object): Number[] {
    var arregloprueba: any[] = [];

    for (var i in Object) {
      const autoincrement = i;
      arregloprueba.push([Object[i]['longitud'], Object[i]['latitud']]);
      if (Number(autoincrement) == (Object.length - 1)) {
        // console.log('Entro a dibujar mapa');
        this.coordenadaZoom = [Object[i]['longitud'], Object[i]['latitud']];
      }

    }

    return arregloprueba;
  }

  public recorreListaVinMarker(lista) {
    var arregloVInMarker: any[] = [];
    for (var i in lista) {
      this.vinsMarker.features.push(
        {
          "type": "Feature", "geometry":
          {
            "type": "Point", "coordinates":
              [lista[i]['longitud'], lista[i]['latitud']]
          },
        }
      );
      // console.log(this.vinsMarker);
      // arregloVInMarker.push(

      // );
    }


  }

  public trasadoMapaInterno(JosnUsar) {

    const styles = {
      'Point': new Style({
        image: new Icon({
          anchor: DEFAULT_ANCHOR,
          src: DEFAULT_ICON,
        })
      }),
      'LineString': new Style({
        stroke: new Stroke({
          color: 'green',
          width: 1,
        }),
      }),
      'MultiLineString': new Style({
        stroke: new Stroke({
          color: 'green',
          width: 1,
        }),
      }),
      'MultiPoint': new Style({
        image: this.image,
      }),
      'MultiPolygon': new Style({
        stroke: new Stroke({
          color: 'blue',
          width: 1,
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 255, 0.1)',
        }),
      }),
      'Polygon': new Style({
        stroke: new Stroke({
          color: 'blue',
          lineDash: [4],
          width: 3,
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 255, 0.1)',
        }),
      }),
      'GeometryCollection': new Style({
        stroke: new Stroke({
          color: 'magenta',
          width: 2,
        }),
        fill: new Fill({
          color: 'magenta',
        }),
        image: new CircleStyle({
          radius: 10,
          fill: null,
          stroke: new Stroke({
            color: 'magenta',
          }),
        }),
      }),
      'Circle': new Style({
        stroke: new Stroke({
          color: 'red',
          width: 2,
        }),
        fill: new Fill({
          color: 'rgba(255,0,0,0.2)',
        }),
      }),
    };

    const styleFunction = function (feature) {
      return styles[feature.getGeometry().getType()];
    };



    var vectorSource2 = new VectorSource({
      features: (new GeoJSON())
        .readFeatures(JosnUsar, {
          featureProjection: 'EPSG:3857'
        })
    });

    var vectorMarker = new VectorSource({
      features: (new GeoJSON()).readFeatures(this.vinsMarker, {
        featureProjection: 'EPSG:3857'
      })
    });

    const verctorLayerMarker = new VectorLayer({
      source: vectorMarker,
      style: styleFunction
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource2,
      style: styleFunction,
    });

    this.mapEl = this.elementRef.nativeElement.querySelector('#' + this.target);
    this.setSize();

    document.getElementById(this.target).innerHTML = "";

    this.map = new Map({
      target: this.target,
      layers: [
        new TileLayer({
          source: new OSM()
        }),

      ],
      view: new View({
        center: Proj.fromLonLat(this.coordenadaZoom),
        zoom: 13,
      }),
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
    }),

  });
}
