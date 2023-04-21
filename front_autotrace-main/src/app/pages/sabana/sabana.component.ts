import { Component, OnInit } from '@angular/core';
import * as fs from 'file-saver';
import { Workbook } from 'exceljs';
import { UsuarioServiceService } from '@services/usuario-service.service';
import { VinService } from '@services/vin.service';
import { log } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { Fill } from 'ol/style';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubirArchivoComponent } from './subir-archivo/subir-archivo.component';
import { RequisitosArchivoComponent } from './requisitos-archivo/requisitos-archivo.component';

@Component({
  selector: 'app-sabana',
  templateUrl: './sabana.component.html',
  styleUrls: ['./sabana.component.scss']
})
export class SabanaComponent implements OnInit {
  private _workbook!: Workbook;

  // private _excel!:Xlsx;
  data: [][];
  gm = false;
  fileReady = false;
  fileArray: any;
  preview = [];
  // private _file!:File;
  optionsButton = {
    crear: false,
    subir: false
  };

  excel: any;

  constructor(
    private _vinService: VinService,
    private modalService: NgbModal
  ) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    // console.log('Cargado!!');
  }

  openRequisitos(){
    const modalRef = this.modalService.open(RequisitosArchivoComponent, {
      size: 'small',
      scrollable: true,
      windowClass: 'myCustomModalClass'
  });
  }

  async apiRouteSabana() {
    this.gm = false;
    this._workbook = new Workbook();
    this._workbook.creator = 'AutoTrace';
    // Crear hoja
    const sheet = this._workbook.addWorksheet('Consulta');
    let datos;

    // tamaño columnas
    const colMer = sheet.getColumn(1)
    colMer.width = 12;

    const colVin = sheet.getColumn(2)
    colVin.width = 19;

    const colModel  = sheet.getColumn(6)
    colModel.width = 16.5;

    const colMadFurCar  = sheet.getColumn(7)
    colMadFurCar.width = 18;

    const colFecha  = sheet.getColumn(23)
    colFecha.width = 23;

    const colFecha2  = sheet.getColumn(24)
    colFecha2.width = 23;

    const colStsUim  = sheet.getColumn(38)
    colStsUim.width = 11.3;

    const colServicio  = sheet.getColumn(39)
    colServicio.width = 16;

    const header = sheet.getRow(1);
    header.values = [
      'Mercado',
      'VIN',
      'Locación',
      'RCVD',
      'hh:mm:ss',
      'Model',
      'Madrina/Furgón/Carrier',
      'DLR',
      'Estado',
      'Causa',
      'Origen',
      'Puerto Descarga / Destination City',
      'Destino Final',
      'Model ID',
      'ETA Embarque',
      'Carrier',
      'Buque / Viaje',
      'Demand Area',
      'Rampa Original',
      'VTIMS Loc',
      'VTIMS St',
      'Antigüedad',
      'Fecha HOLD',
      'Liberado HOLD',
      'Antigüedad Disponible',
      'MDY',
      'FVDR',
      'CAJON',
      'FILA',
      'BLOQUE',
      'PATIO',
      'CDO',
      'CDO_DATE',
      'FLEET',
      'PACK',
      'CDO DETALLE',
      'ID_CDO',
      'STATUS UIM',
      'Servicios de sistema'
    ];

    header.font = { color: {argb: 'FFFFFF',}};

    header.fill = {
      type:'pattern',
      pattern: 'solid',
      fgColor:{argb: 'D41111'},
      bgColor:{argb: 'FAF4F4'}
    }


    //Peticion
    this._vinService.consultaSabana().subscribe(async data => {
      datos = data;
      let data2 = datos[0];
      let j = 1;
      for (let i = 0; i < data2.length; i++) {
        let partvin = [];
        let añomodelo = data2[i].model;
        let mercado = data2[i].vin;
        if(mercado.slice(0, 1) == '3'){
          mercado = 'DOMESTICA'
        }else{
          mercado = 'IMPORTACIÓN'
        }

        // if (data2[i].fechaSalida != null) {
          j += 1;
          partvin.push(mercado);
          partvin.push(data2[i].vin);
          partvin.push(data2[i].loc);
          // recibido
          partvin.push('');
          // hora de recibido
          partvin.push('');
          partvin.push(data2[i].model);
          partvin.push(data2[i].mode);
          partvin.push(data2[i].dealer);
          partvin.push(data2[i].estadoUnidad);
          // causa
          partvin.push('');
          // origen
          partvin.push('');
          partvin.push(data2[i].puertoDescarga);
          partvin.push(data2[i].destinoFinal);
          partvin.push(data2[i].modelId);
          // Eta embarque
          partvin.push('');
          partvin.push(data2[i].carrier);
          partvin.push(data2[i].buqueViaje);
          partvin.push(data2[i].demandArea);
          partvin.push(data2[i].rampa);
          // vtims loc
          partvin.push('');
          partvin.push(data2[i].estatusVtims);
          // antiguedad
          partvin.push('');
          partvin.push(data2[i].fechaInicio);
          partvin.push(data2[i].fechaSalida);
          // antiguedad disponible
          partvin.push('');
          partvin.push(añomodelo.slice(0, 4));
          // fvdr
          partvin.push('');
          partvin.push(data2[i].cajon);
          partvin.push(data2[i].fila);
          partvin.push(data2[i].bloque);
          partvin.push(data2[i].idpatio);
          // cdo
          partvin.push('');
          // cdo date
          partvin.push('');
          // fleet
          partvin.push('');
          // pack
          partvin.push('');
          // cdo detalle
          partvin.push('');
          // id_cdo
          partvin.push('');
          // status uim
          partvin.push('');
          // servicio del sistema
          partvin.push(data2[i].tipoServicio);

          this.excelBuilder(partvin, j, sheet);
        // }
        // console.log(partvin);
      }
      this.downloadExcel();
    })
  }

  reporte() {
    this.optionsButton.crear = true;
    this.optionsButton.subir = false;
  }

  archivos() {
    this.optionsButton.crear = false;
    this.optionsButton.subir = true;
  }

  peticiones() {
    this.apiRouteSabana();
  }

  excelBuilder(arreglo, fila, hoja) {
    //insertar datos
    let header = hoja.getRow(fila);
    header.values = arreglo;
  }

  downloadExcel(): void {
    this._workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data]);
      fs.saveAs(blob, 'DBExcel.xlsx');
    });
  }


}
