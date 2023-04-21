import { AfterViewInit, Component, Input, OnInit, ElementRef } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import XYZ from 'ol/source/XYZ';
import GeoJSON from 'ol/format/GeoJSON.js';
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style.js';
import { OSM } from 'ol/source';
import * as Proj from 'ol/proj';
import { GeocercasService } from '@services/geocercas.service';
import Circle from 'ol/geom/Circle';

import {
  defaults as defaultControls,
  Control
} from 'ol/control';
import VectorSource from 'ol/source/Vector';

export const DEFAULT_HEIGHT = '500px';
export const DEFAULT_WIDTH = '500px';

export const DEFAULT_LAT = -34.603490361131385;
export const DEFAULT_LON = -58.382037891217465;

@Component({
  selector: 'ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.scss']
})

export class OlMapComponent implements OnInit, AfterViewInit {
  
  @Input() lat: number = DEFAULT_LAT;
  @Input() lon: number = DEFAULT_LON;
  @Input() zoom: number;
  @Input() width: string | number = DEFAULT_WIDTH;
  @Input() height: string | number = DEFAULT_HEIGHT;

  target: string = 'map-' + Math.random().toString(36).substring(2);
  map: Map;
  private mapEl: HTMLElement;


  private image = new CircleStyle({
    radius: 5,
    fill: null,
    stroke: new Stroke({ color: 'red', width: 1 }),
  });



  private geojsonObject = {
    "type": "FeatureCollection",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },

    "features": [
      {
        "type": "Feature", "properties": { "name": "LC Contenedores" }, "geometry": {
          "type": "Polygon", "coordinates": [[
            [-102.184864, 17.967637],
            [-102.184698, 17.967785],
            [-102.184054, 17.968403],
            [-102.184054, 17.968403],
            [-102.184897, 17.969066],
            [-102.185127, 17.969234],
            [-102.185546, 17.969525],
            [-102.185546, 17.96953],
            [-102.186146, 17.968882],
            [-102.186114, 17.968704]

          ]]
        }
      },
      {
        "type": "Feature", "properties": { "name": "LC Recepcion madrinas" }, "geometry": {
          "type": "Polygon", "coordinates": [[
            // [-102.185819, 17.969923],
            // [-102.185508, 17.969622],
            // [-102.185175, 17.969341],
            // [-102.185164, 17.970352],
            // [-102.185846, 17.970341]

          ]]
        }
      },
      {
        "type": "Feature", "properties": { "name": "LC Patio 1" }, "geometry": {
          "type": "Polygon", "coordinates": [[

            // [-102.185171, 17.970362],
            // [-102.185144, 17.9693],
            // [-102.182446, 17.969321],
            // [-102.182507, 17.969788],
            // [-102.182601, 17.970387]

          ]]
        }
      },
      {
        "type": "Feature", "properties": { "name": "LC Patio 2" }, "geometry": {
          "type": "Polygon", "coordinates": [[

            // [-102.185936, 17.970584],
            // [-102.181881, 17.970605],
            // [-102.181886, 17.971431],
            // [-102.182766, 17.971508],
            // [-102.184542, 17.971401],
            // [-102.185985, 17.971345],
            // [-102.18595, 17.970965]

          ]]
        }
      },
      {
        "type": "Feature", "properties": { "name": "LC Patio 3" }, "geometry": {
          "type": "Polygon", "coordinates": [[

            // [-102.185994, 17.971411],
            // [-102.183955, 17.971487],
            // [-102.182727, 17.971548],
            // [-102.181831, 17.971584],
            // [-102.181852, 17.972569],
            // [-102.184019, 17.972497],
            // [-102.186031, 17.972411,]

          ]]
        }
      },
      {
        "type": "Feature", "properties": { "name": "LC Lavado" }, "geometry": {
          "type": "Polygon", "coordinates": [[

            // [-102.184396, 17.967608],
            // [-102.184171, 17.967886],
            // [-102.184128, 17.96786],
            // [-102.184045, 17.967952],
            // [-102.184176, 17.968047],
            // [-102.184498, 17.9677]

          ]]
        }
      },
      {
        "type": "Feature", "properties": { "name": "LC Salida de Patio" }, "geometry": {
          "type": "Polygon", "coordinates": [[

            // [-102.183599, 17.967447],
            // [-102.181384, 17.967482],
            // [-102.181373, 17.967339],
            // [-102.183605, 17.967304],

          ]]
        }
      },
      {
        "type": "Feature", "properties": { "name": "LC Patio 4" }, "geometry": {
          "type": "Polygon", "coordinates": [[

            // [-102.186035, 17.97251],
            // [-102.181754, 17.972714],
            // [-102.181786, 17.974163],
            // [-102.186089, 17.973959]

          ]]
        }
      },

      {
        "type": "Feature", "properties": { "name": "LC Taller" }, "geometry": {
          "type": "Polygon", "coordinates": [[

            // [-102.183143, 17.968996],
            // [-102.183143, 17.968996],
            // [-102.183143, 17.968996],
            // [-102.183143, 17.968996],
            // [-102.182514, 17.968992],
            // [-102.182514, 17.968992],
            // [-102.182514, 17.968992],
            // [-102.182514, 17.968992],
            // [-102.18251, 17.969131],
            // [-102.182509, 17.969272],
            // [-102.182507, 17.969302],
            // [-102.18256, 17.969301],
            // [-102.18264, 17.9693],
            // [-102.182888, 17.9693],
            // [-102.183142, 17.969307],
            // [-102.18314, 17.969308],
            // [-102.183537, 17.9693],
            // [-102.183535, 17.969103],
            // [-102.183535, 17.968996]

          ]]
        }
      },
      {
        "type": "Feature", "properties": { "name": "LC Reposo Ferro1" }, "geometry": {
          "type": "Polygon", "coordinates": [[

            // [-102.182595, 17.969973],
            // [-102.182493, 17.969319],
            // [-102.181694, 17.96933],
            // [-102.181903, 17.969978],
            // [-102.181984, 17.970095],
            // [-102.182208, 17.970044]

          ]]
        }
      },
      {
        "type": "Feature", "properties": { "name": "LC No Conforme" }, "geometry": {
          "type": "Polygon", "coordinates": [[


            // [-102.182699, 17.970388],
            // [-102.182581, 17.969923],
            // [-102.181943, 17.970021],
            // [-102.181997, 17.9701],
            // [-102.182106, 17.970169],
            // [-102.182296, 17.970276],
            // [-102.182481, 17.970352],
            // [-102.182584, 17.970385]

          ]]
        }
      },
      {
        "type": "Feature", "properties": { "name": "LC Patio 3 Bloque A" }, "geometry": {
          "type": "Polygon", "coordinates": [[


            // [-102.185448, 17.971416],
            // [-102.185949, 17.971396],
            // [-102.186034, 17.972436,],
            // [-102.185476, 17.972467]


          ]]
        }
      },
      {
        "type": "Feature", "properties": { "name": "LC Patio 3 Bloque B" }, "geometry": {
          "type": "Polygon", "coordinates": [[

            // [-102.185456, 17.972426],
            // [-102.185423, 17.971436],
            // [-102.184994, 17.971462],
            // [-102.185037, 17.972446]

          ]]
        }
      },
      {
        "type": "Feature", "properties": { "name": "LC Patio 3 Bloque C" }, "geometry": {
          "type": "Polygon", "coordinates": [[

            // [-102.185033, 17.972462],
            // [-102.185001, 17.971451],
            // [-102.184519, 17.971481],
            // [-102.184572, 17.972472]

          ]]
        }
      },
      {
        "type": "Feature", "properties": { "name": "LC Patio 3 Bloque D" }, "geometry": {
          "type": "Polygon", "coordinates": [[

            // [-102.184587, 17.972477],
            // [-102.184533, 17.971462],
            // [-102.184039, 17.971492],
            // [-102.184093, 17.972492]

          ]]
        }
      },
      {
        "type": "Feature", "properties": { "name": "LC Patio 3 Bloque E" }, "geometry": {
          "type": "Polygon", "coordinates": [[

            // [-102.1841, 17.972493],
            // [-102.184047, 17.971518],
            // [-102.183618, 17.971539],
            // [-102.183677, 17.972509]

          ]]
        }
      },

      {
        "type": "Feature", "properties": { "name": "LC Patio 3 Bloque F" }, "geometry": {
          "type": "Polygon", "coordinates": [[

            // [-102.183635, 17.972516],
            // [-102.183608, 17.971536],
            // [-102.183174, 17.971557],
            // [-102.183217, 17.972541]

          ]]
        }
      },

      {
        "type": "Feature", "properties": { "name": "LC Patio 3 Bloque G" }, "geometry": {
          "type": "Polygon", "coordinates": [[

            // [-102.183204, 17.972512],
            // [-102.183145, 17.971542],
            // [-102.182636, 17.971588],
            // [-102.182732, 17.972537]



          ]]
        }
      },

      {
        "type": "Feature", "properties": { "name": "LC Patio 3 Bloque H" }, "geometry": {
          "type": "Polygon", "coordinates": [[

            // [-102.182349, 17.972547],
            // [-102.182724, 17.972537],
            // [-102.182654, 17.971815],
            // [-102.182622, 17.971549],
            // [-102.182132, 17.971572],
            // [-102.182153, 17.972032],
            // [-102.182169, 17.972473],
            // [-102.182169, 17.972554],
            // [-102.182223, 17.972554]


          ]]
        }
      },

      {
        "type": "Feature", "properties": { "name": "LC Patio 3 Bloque I" }, "geometry": {
          "type": "Polygon", "coordinates": [[

            // [-102.182163, 17.972559],
            // [-102.182125, 17.971574],
            // [-102.181847, 17.971595],
            // [-102.181841, 17.972564]


          ]]
        }
      },

      {
        "type": "Feature", "properties": { "name": "Patio Externo Cementera" }, "geometry": {
          "type": "Polygon", "coordinates": [[

            // [-102.187264, 17.968693],
            // [-102.188069, 17.968004],
            // [-102.186905, 17.967147],
            // [-102.186272, 17.967856]

          ]]
        }
      },

      {
        "type": "Feature", "properties": { "name": "Saltillo-Padre Santos" }, "geometry": {
          "type": "Polygon", "coordinates": [[

            // [-101.07485, 25.453619],
            // [-101.074829, 25.451527],
            // [-101.067608, 25.451551],
            // [-101.068981, 25.452869],
            // [-101.070144, 25.45344],
            // [-101.07273, 25.453585]

          ]]
        }
      },

      {
        "type": "Feature", "properties": { "name": "saltillo - Brisas" }, "geometry": {
          "type": "Polygon", "coordinates": [[

            // [-100.97826, 25.495076],
            // [-100.977595, 25.496577],
            // [-100.975599, 25.496073],
            // [-100.976039, 25.495405],
            // [-100.976404, 25.494659],
            // [-100.976726, 25.494107],
            // [-100.976811, 25.493846],
            // [-100.977144, 25.493865],
            // [-100.977466, 25.493982]

          ]]
        }
      }, {
        "type": "Feature", "properties": { "name": "saltillo - Vito" }, "geometry": {
          "type": "Polygon", "coordinates": [[

            // [-100.988894, 25.511779],
            // [-100.991855, 25.509862],
            // [-100.990332, 25.5081],
            // [-100.987499, 25.510191]


          ]]
        }
      },
      {
        "type": "Feature", "properties": { "name": "saltillo - Palmas" }, "geometry": {
          "type": "Polygon", "coordinates": [[

            // [-100.988121, 25.517278],
            // [-100.985932, 25.515109],
            // [-100.983314, 25.517046],
            // [-100.985374, 25.51875],

          ]]
        }
      },
      {
        "type": "Feature", "properties": { "name": "saltillo - La Encantada" }, "geometry": {
          "type": "Polygon", "coordinates": [[

            // [-101.08777, 25.278984],
            // [-101.084123, 25.277636],
            // [-101.083372, 25.279673],
            // [-101.08762, 25.281167]

          ]]
        }
      },


    ]
  }
    ;



  private source2;



  constructor(private elementRef: ElementRef, private _geocercasService:GeocercasService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {

    const styles = {
      'Point': new Style({
        image: this.image,
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


    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(this.geojsonObject),
    });

    var vectorSource2 = new VectorSource({
      features: (new GeoJSON())
        .readFeatures(this.geojsonObject, {
          featureProjection: 'EPSG:3857'
        })
    });



    const vectorLayer = new VectorLayer({
      source: vectorSource2,
      style: styleFunction,
    });



    this.mapEl = this.elementRef.nativeElement.querySelector('#' + this.target);
    this.setSize();
    console.log(this.target);
    console.log(vectorLayer);

    this.map = new Map({
      target: this.target,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        // vectorLayer
      ],
      view: new View({

        center: Proj.fromLonLat([-102.185819, 17.969923]),
        zoom: this.zoom
      }),
      controls: defaultControls().extend([])
    });
  
    // this.map.addLayer(vectorLayer);
    // this.map.removeLayer(vectorLayer);
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
    }),

  });
}
