import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DanioService } from '@services/danio.service';
import { Subject } from 'rxjs';
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


// --------------
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// --------------------




export const DEFAULT_HEIGHT = '500px';
export const DEFAULT_WIDTH = '500px';

export const DEFAULT_LAT = -34.603490361131385;
export const DEFAULT_LON = -58.382037891217465;

export const DEFAULT_ANCHOR = [0.5, 0.5];
export const DEFAULT_ICON = '/assets/iconos/2.png';


@Component({
  selector: 'app-modal-danio-ubicacion',
  templateUrl: './modal-danio-ubicacion.component.html',
  styleUrls: ['./modal-danio-ubicacion.component.scss']
})
export class ModalDanioUbicacionComponent implements OnInit {

  @Input() tituloModal: any;
  @Input() datos:any;
  @Input() width: string | number = DEFAULT_WIDTH;
  @Input() height: string | number = DEFAULT_HEIGHT;


  @ViewChild('mapadescargar')
  mapadescargar: ElementRef;

  dtOptions: any = {};
  dtTrigger = new Subject<any>();

  private vinsMarker = {
    type: 'FeatureCollection',
    features: []
};

  coordenadaZoom;
  target: string = 'map-modal';
  map: Map;
  private mapEl: HTMLElement;
  private image = new CircleStyle({
    radius: 5,
    fill: null,
    stroke: new Stroke({color: 'red', width: 1})
});

  constructor(public activeModal: NgbActiveModal, private servicioDanio: DanioService,  private elementRef: ElementRef,) {

  }

   ngOnInit(): void {

this.trazadoMapa();
   }

   ngAfterViewInit(): void {
    this.dtTrigger.next();

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


trazadoMapa(){
this.servicioDanio.ubicacionActualVin(this.datos.vin).subscribe(data=>{
  let listUbicaciones: any[] = [];
  listUbicaciones = data[0];
  this.recorreListaVinMarker(listUbicaciones);
},error=>{
  console.log(error);
});
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

      if (Number(autoincrement) == Object.length - 1) {

          this.coordenadaZoom = [
            lista[i]['latitud'],
              lista[i]['longitud']
             
          ];
      }
  }

  this.trasadoMapaInterno();
  // console.log(this.vinsMarker);
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

  var vectorMarker = new VectorSource({
      features: new GeoJSON().readFeatures(this.vinsMarker, {
          featureProjection: 'EPSG:3857'
      })
  });

  const verctorLayerMarker = new VectorLayer({
      source: vectorMarker,
      style: styleFunction
  });

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
          zoom: 12
      })
  });

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
