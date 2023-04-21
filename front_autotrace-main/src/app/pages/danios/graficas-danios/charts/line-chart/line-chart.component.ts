import { Component, ElementRef , Input, OnInit, ViewChild  } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() lineChartData: ChartDataSets[];
  @Input() titulo: string;

  @ViewChild('reportPage')
  reportPage: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  //Labels shown on the x-axis
  lineChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  // Define chart options
  lineChartOptions: ChartOptions = {
    responsive: true
  };

  // Define colors of chart segments
  lineChartColors: Color[] = [

    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
    }
  ];

  // Set true to show legends
  lineChartLegend = true;

  // Define type of chart
  lineChartType = 'line';

  lineChartPlugins = [];

  // events
  chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  convertirImagen(){
    var canvas = this.reportPage.nativeElement as HTMLCanvasElement;
    //creates image
    return canvas.toDataURL("image/png", 1.0);
  }

  exportarGrafica(){
    let html: any = [];
    html.push({ text: 'Grafica ' + this.titulo, style: 'titulo' });
    html.push({
      image: this.convertirImagen(),
      width: 670,
      height: 435,
      style: 'grafica'
    });
    const pdfDefinition: any = {
      pageSize: 'LETTER',
      pageOrientation: 'landscape',
      pageMargins: [20, 20, 20, 20],
      content: html,
      styles: {
          grafica: {
              alignment: 'center',
              margin: [0, 5, 0, 5]
          },
          titulo: {
            fontSize: 25,
            bold: true,
            alignment: 'center'
        },
      }
    }
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }
}