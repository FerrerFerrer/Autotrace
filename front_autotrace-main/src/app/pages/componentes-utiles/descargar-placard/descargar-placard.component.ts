import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import JsBarcode from 'jsbarcode/bin/JsBarcode'
import { VinService } from '@services/vin.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-descargar-placard',
  templateUrl: './descargar-placard.component.html',
  styleUrls: ['./descargar-placard.component.scss']
})
export class DescargarPlacardComponent implements OnInit {

  elementType = 'svg';

  constructor(public activeModal: NgbActiveModal, private _vinService: VinService) { }
  @Input() Vin: any;
  datosVin : any = [];

  ngOnInit(): void {
    this.obtenerDatosPlacard();
  }

  textToBase64Barcode(text) {
    var canvas = document.createElement("canvas");
    JsBarcode(canvas, text, { format: "CODE39", displayValue: false });
    return canvas.toDataURL("image/png");
}

  public descargarPlacard(){
    let html: any = [];

    for (let index = 0; index < this.datosVin.length; index++) {
        let pa_vin = this.datosVin[index]['vin'];
        let pa_patio = this.datosVin[index]['patio'];
        let pa_fila = this.datosVin[index]['fila'];
        let pa_cajon = this.datosVin[index]['cajon'];
        let pa_modelId = this.datosVin[index]['modelId'];

        html.push({ text: 'VIN CODE', style: 'titulo' });
        html.push({ text: pa_vin, style: 'vin' });
        html.push({
            table: {
                headerRows: 1,
                widths: ['*', '*', '*'],
                body: [
                    [
                        { text: 'Patio', style: 'header', fillColor: '#EAEAEA' },
                        { text: 'Fila', style: 'header', fillColor: '#EAEAEA' },
                        { text: 'Cajon', style: 'header', fillColor: '#EAEAEA' }],
                    [
                        { text: pa_patio, style: 'body' },
                        { text: pa_fila, style: 'body' },
                        { text: pa_cajon, style: 'body' }
                    ]
                ]
            }, style: 'tabla'

        });

        html.push({ text: 'Model ID', style: 'tituloModelId' });
        html.push({ text: pa_modelId, style: 'modelId' });

        html.push({
            image: this.textToBase64Barcode(pa_vin),
            width: 265,
            height: 120,
            style: 'codigoBarra'
        });

        html.push({ text: pa_vin, style: 'valorCodigoBarra'});
    }
    const pdfDefinition: any = {
        pageSize: 'A6',
        pageMargins: [20, 20, 20, 20],
        content: html,
        styles: {
            header: {
                fontSize: 22,
                bold: true
            },
            body: {
                fontSize: 22,
            },
            tabla: {
                alignment: 'center',
                margin: [0, 5, 0, 5]
            },
            titulo: {
                fontSize: 25,
                bold: true,
                alignment: 'center'
            },
            vin: {
                fontSize: 22,
                alignment: 'center',
                margin: 10
            },
            tituloModelId: {
                fontSize: 25,
                bold: true,
                alignment: 'center',
                margin: [0, 5, 0, 5]
            },
            modelId: {
                fontSize: 20,
                alignment: 'center',
                margin: [0, 0, 0, 5]
            },
            codigoBarra: {
                alignment: 'center',
            },
            valorCodigoBarra: {
                alignment: 'center',
                fontSize: 15
            }

        }
    }

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
    
  }

  obtenerDatosPlacard(){
    this._vinService.obtenerdatosPlacard(this.Vin).subscribe(data =>{
      this.datosVin = data[0];
    });
  }
}
