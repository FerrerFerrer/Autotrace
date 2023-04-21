import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'
import Swal from 'sweetalert2';
import { ChartDataSets } from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { AreadanioService } from '@services/areadanio.service';
import { ClientesService } from '@services/clientes.service';
import { DanioService } from '@services/danio.service';
import { SeveridadFDanioService } from '@services/severidad-fdanio.service';
import { TipodanioService } from '@services/tipodanio.service';
import { TipoReparacionService } from '@services/tipo-reparacion.service';
import { UbicacionDanioService } from '@services/ubicacion-danio.service';
import { Subject } from 'rxjs';

const FECHA_FINAL = new Date();
const FECHA_INICIAL = new Date(FECHA_FINAL.getFullYear(), 0, 1);
@Component({
  selector: 'app-graficas-danios',
  templateUrl: './graficas-danios.component.html',
  styleUrls: ['./graficas-danios.component.scss']
})
export class GraficasDaniosComponent implements OnInit {
  dtOptions: any = {};
  dtTrigger = new Subject<any>();
  form: FormGroup;

  mostrarGraficaClasificacion = false;
  mostrarGraficaEstatus = false;
  mostrarGraficaLaboratorio = false;
  mostrarTablaClasificacion = false;
  mostrarTablaEstatus = false;
  mostrarTablaLaboratorio = false;

  datosClasificacionDanioOrigen: any[] = [];
  datosClasificacionIncidente: any[] = [];
  datosClasificacionEstatus: any[] = [];
  datosLaboratorio: any[] = [];

  datosArea: any[] = [];
  datosAreaAdicional: any[] = [];

  dataDanioOrigen: any[] = [];
  dataIncidente: any[] = [];
  dataEstatus: any[] = [];

  dataArea: any[] = [];
  dataAreaAdicional: any[] = [];

  lineChartData: ChartDataSets[];
  lineChartDataStatus: ChartDataSets[];

  lineChartDataLaboratorio: ChartDataSets[];
  lineCharDataArea: ChartDataSets[];
  lineCharDataAreaAdicional: ChartDataSets[];

  tituloClasificacion : string = "Indicadores de daños: Clasificación";
  tituloEstatus : string = " Indicadores de daños: Status";
  tituloLaboratorio : string = "Laboratorio";

  constructor(
    private datepipe: DatePipe,
    private _serviceAreaDanio: AreadanioService,
    private _serviceCliente: ClientesService,
    private _danioService: DanioService,
    private _severidadFDanioService : SeveridadFDanioService,
    private _serviceTipoDanio: TipodanioService,
    private _serviceTipoReparacion: TipoReparacionService,
    private _ubicacionDanioService : UbicacionDanioService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      FechaInicial: ['', [Validators.required]],
      FechaFinal: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      serverSide: false,
      processing: false,
      responsive: true,
      dom: 'Bfrtip',
      buttons: [
        'csv',
        'excel',
      ],
      language: {
        "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
      }
    };
    this.buscar();
    this.buscarAreaDanio(this.datepipe.transform(FECHA_INICIAL, 'yyyy-MM-dd'), this.datepipe.transform(FECHA_FINAL, 'yyyy-MM-dd'));
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  onChange(newVal: any) {

    const opcion : number = newVal.target.value;
    const fechaIn = (this.form.get('FechaInicial')?.value) ? this.form.get('FechaInicial')?.value+" 00:00:00" : this.datepipe.transform(FECHA_INICIAL, 'yyyy-MM-dd');
    const fechaFin = (this.form.get('FechaFinal')?.value) ? this.form.get('FechaFinal')?.value+" 23:59:59" : this.datepipe.transform(FECHA_FINAL, 'yyyy-MM-dd');

    if(opcion == 1){
      this.buscarAreaDanio(fechaIn, fechaFin);
    }
    if(opcion == 2){
      this.buscarAreaDanioAdicional(fechaIn, fechaFin);
    }
    if(opcion == 3){
      this.buscarClientesMarca(fechaIn, fechaFin);
    }
    if(opcion == 4){
      this.buscarResponsable(fechaIn, fechaFin);
    }
    if(opcion == 5){
      this.buscarSeveridadFDanio(fechaIn, fechaFin);
    }
    if(opcion == 6){
      this.buscarTipoDanio(fechaIn, fechaFin);
    }
    if(opcion == 7){
      this.buscarTipoReparacion(fechaIn, fechaFin);
    }
    if(opcion == 8){
      this.buscarUbicacion(fechaIn, fechaFin);
    }
  }

  exportarGraficaClasificacion(){
    console.log("exportando grafica clasificacion");
  }

  exportarGraficaEstatus(){
    console.log("exportando grafica estatus");
  }

  buscar() {
    this.spinner.show();
    const fechaIn = (this.form.get('FechaInicial')?.value) ? this.form.get('FechaInicial')?.value : this.datepipe.transform(FECHA_INICIAL, 'yyyy-MM-dd');
    const fechaFin = (this.form.get('FechaFinal')?.value) ? this.form.get('FechaFinal')?.value : this.datepipe.transform(FECHA_FINAL, 'yyyy-MM-dd');

    this.lineChartData = [];
    this.lineChartDataStatus = [];
    this.mostrarGraficaClasificacion = false;
    this.mostrarGraficaEstatus = false;

    if (fechaFin && fechaIn) {
      if (fechaFin > fechaIn) {
        this._danioService.datosClasificacion(fechaIn, fechaFin, "Daño origen").subscribe(data => {
          this.datosClasificacionDanioOrigen = data;
          this.graficaDanioOrigen(data[0]);

          this._danioService.datosClasificacion(fechaIn, fechaFin, "Incidente").subscribe(data => {
            this.datosClasificacionIncidente = data;
            this.graficaIncidente(data[0]);
            this.mostrarGraficaClasificacion = true;
            this.mostrarTablaClasificacion = true;
          })
        })

        this._danioService.datosEstatus(fechaIn, fechaFin).subscribe(data => {
          this.datosClasificacionEstatus = data[0];
          this.graficaEstatus(data[0]);
          this.mostrarGraficaEstatus = true;
          this.mostrarTablaEstatus = true;
          this.spinner.hide();
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Verificar Fechas Seleccionadas'
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Es necesario introducir fechas'
      });
    }
  }

  buscarAreaDanio(fechaIn, fechaFin){
    this.lineChartDataLaboratorio = [];
    this.mostrarGraficaLaboratorio = false;
    this.mostrarTablaLaboratorio = false;

    if (fechaFin && fechaIn) {
      if (fechaFin > fechaIn) {
        this._serviceAreaDanio.datosArea(fechaIn, fechaFin).subscribe(data => {
          this.datosLaboratorio = data[0];
          this.graficaLaboratorio(data[0]);
          this.mostrarGraficaLaboratorio = true;
          this.mostrarTablaLaboratorio = true;
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Verificar Fechas Seleccionadas'
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Es necesario introducir fechas'
      });
    }
  }

  buscarAreaDanioAdicional(fechaIn, fechaFin) {
    this.lineChartDataLaboratorio = [];
    this.mostrarGraficaLaboratorio = false;
    this.mostrarTablaLaboratorio = false;
    if (fechaFin && fechaIn) {
      if (fechaFin > fechaIn) {
        this._serviceAreaDanio.datosAreaAdicional(fechaIn, fechaFin).subscribe(data => {
          this.datosLaboratorio = data[0];
          this.graficaLaboratorio(data[0]);
          this.mostrarGraficaLaboratorio = true;
          this.mostrarTablaLaboratorio = true;
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Verificar Fechas Seleccionadas'
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Es necesario introducir fechas'
      });
    }
  }

  buscarClientesMarca(fechaIn, fechaFin){
    this.lineChartDataLaboratorio = [];
    this.mostrarGraficaLaboratorio = false;
    this.mostrarTablaLaboratorio = false;
    if (fechaFin && fechaIn) {
      if (fechaFin > fechaIn) {
        this._serviceCliente.datosClientes(fechaIn, fechaFin).subscribe(data => {
          this.datosLaboratorio = data[0];
          this.graficaLaboratorio(data[0]);
          this.mostrarGraficaLaboratorio = true;
          this.mostrarTablaLaboratorio = true;
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Verificar Fechas Seleccionadas'
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Es necesario introducir fechas'
      });
    }
  }

  buscarResponsable(fechaIn, fechaFin){
    this.lineChartDataLaboratorio = [];
    this.mostrarGraficaLaboratorio = false;
    this.mostrarTablaLaboratorio = false;
    if (fechaFin && fechaIn) {
      if (fechaFin > fechaIn) {
        this._danioService.datosResponsable(fechaIn, fechaFin).subscribe(data => {
          this.datosLaboratorio = data[0];
          this.graficaLaboratorio(data[0]);
          this.mostrarGraficaLaboratorio = true;
          this.mostrarTablaLaboratorio = true;
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Verificar Fechas Seleccionadas'
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Es necesario introducir fechas'
      });
    }
  }

  buscarSeveridadFDanio(fechaIn, fechaFin){
    this.lineChartDataLaboratorio = [];
    this.mostrarGraficaLaboratorio = false;
    this.mostrarTablaLaboratorio = false;
    if (fechaFin && fechaIn) {
      if (fechaFin > fechaIn) {
        this._severidadFDanioService.datosSeveridadFDanio(fechaIn, fechaFin).subscribe(data => {
          this.datosLaboratorio = data[0];
          this.graficaLaboratorio(data[0]);
          this.mostrarGraficaLaboratorio = true;
          this.mostrarTablaLaboratorio = true;
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Verificar Fechas Seleccionadas'
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Es necesario introducir fechas'
      });
    }
  }

  buscarTipoDanio(fechaIn, fechaFin){
    this.lineChartDataLaboratorio = [];
    this.mostrarGraficaLaboratorio = false;
    this.mostrarTablaLaboratorio = false;
    if (fechaFin && fechaIn) {
      if (fechaFin > fechaIn) {
        this._serviceTipoDanio.datosTipoDanio(fechaIn, fechaFin).subscribe(data => {
          this.datosLaboratorio = data[0];
          this.graficaLaboratorio(data[0]);
          this.mostrarGraficaLaboratorio = true;
          this.mostrarTablaLaboratorio = true;
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Verificar Fechas Seleccionadas'
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Es necesario introducir fechas'
      });
    }
  }

  buscarTipoReparacion(fechaIn, fechaFin){
    this.lineChartDataLaboratorio = [];
    this.mostrarGraficaLaboratorio = false;
    this.mostrarTablaLaboratorio = false;
    if (fechaFin && fechaIn) {
      if (fechaFin > fechaIn) {
        this._serviceTipoReparacion.datosTipoReparacion(fechaIn, fechaFin).subscribe(data => {
          this.datosLaboratorio = data[0];
          this.graficaLaboratorio(data[0]);
          this.mostrarGraficaLaboratorio = true;
          this.mostrarTablaLaboratorio = true;
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Verificar Fechas Seleccionadas'
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Es necesario introducir fechas'
      });
    }
  }

  buscarUbicacion(fechaIn, fechaFin){
    this.lineChartDataLaboratorio = [];
    this.mostrarGraficaLaboratorio = false;
    this.mostrarTablaLaboratorio = false;
    if (fechaFin && fechaIn) {
      if (fechaFin > fechaIn) {
        this._ubicacionDanioService.datosUbicacionDanio(fechaIn, fechaFin).subscribe(data => {
          this.datosLaboratorio = data[0];
          this.graficaLaboratorio(data[0]);
          this.mostrarGraficaLaboratorio = true;
          this.mostrarTablaLaboratorio = true;
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Verificar Fechas Seleccionadas'
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Es necesario introducir fechas'
      });
    }
  }

  graficaDanioOrigen(datosClasificacionDanioOrigen: any[]){
    for (let element in datosClasificacionDanioOrigen) {
      if (element != "clasificacion") {
        this.dataDanioOrigen.push(datosClasificacionDanioOrigen[element]);
      }
    }
    this.lineChartData.push({
      data: this.dataDanioOrigen,
      label: "Daño origen"
    });
  }

  graficaIncidente(datosClasificacionIncidente: any[]){
    for (let element in datosClasificacionIncidente) {
      if (element != "clasificacion") {
        this.dataIncidente.push(datosClasificacionIncidente[element]);
      }
    }
    this.lineChartData.push({
      data: this.dataIncidente,
      label: "Incidente"
    });
  }

  graficaEstatus(datosClasificacionEstatus: any[]){
    for (let index = 0; index < datosClasificacionEstatus.length; index++) {
      let label;
      this.dataEstatus = [];
      for (let key in datosClasificacionEstatus[index]) {
        if (key != "clave") {
          if (key === "descripcion") {
            label = datosClasificacionEstatus[index][key];
          }
          else {
            this.dataEstatus.push(datosClasificacionEstatus[index][key]);
          }
        }
      }
      this.lineChartDataStatus.push({
        data: this.dataEstatus,
        label: label
      })
    }
  }

  graficaLaboratorio(datosAreaDanio: any[]) {
    for (let index = 0; index < datosAreaDanio.length; index++) {
      let label;
      this.dataEstatus = [];
      for (let key in datosAreaDanio[index]) {
        if (key != "clave") {
          if (key === "descripcion") {
            label = datosAreaDanio[index][key];
          }
          else {
            this.dataEstatus.push(datosAreaDanio[index][key]);
          }
        }
      }
      this.lineChartDataLaboratorio.push({
        data: this.dataEstatus,
        label: label
      })
    }
  }
}
