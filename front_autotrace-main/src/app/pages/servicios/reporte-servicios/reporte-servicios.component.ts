import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ModalDetallesReporteComponent } from './modal-detalles-reporte/modal-detalles-reporte.component';
import {NgxSpinnerService} from 'ngx-spinner';
import { ReporteServiciosService } from '@services/reporte-servicios.service';

@Component({
  selector: 'app-reporte-servicios',
  templateUrl: './reporte-servicios.component.html',
  styleUrls: ['./reporte-servicios.component.scss']
})
export class ReporteServiciosComponent implements OnInit {

  listaReporteServicios: any[] = [];
  mostrarTabla = false;
  formBusqueda: FormGroup;

  dtTrigger = new Subject<any>();
  modalOptions: NgbModalOptions;
  dtOptions: any = {};

  constructor(private fb: FormBuilder,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private _reporteServicios: ReporteServiciosService,public datepipe: DatePipe ) {
      this.formBusqueda = this.fb.group({
        FechaInicial: ['', [Validators.required]],
        FechaFinal: ['', [Validators.required]]
      })
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
    }
  }

  abrirModalDetallesReporte(row) {
    const modalRef = this.modalService.open(ModalDetallesReporteComponent, {
      size: 'xl'
    });
    modalRef.componentInstance.tituloModal = 'Detalles de reporte';
    modalRef.componentInstance.fecha = this.datepipe.transform(row.fechaInicio, 'yyyy-MM-dd');
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  buscarReporteServicios(){
    this.spinner.show();
    const fechaIn = this.formBusqueda.get('FechaInicial')?.value+" 00:00:00";
    const fechaFin = this.formBusqueda.get('FechaFinal')?.value+" 23:59:59";

    if(fechaFin && fechaIn){
      if(fechaFin > fechaIn){
        this._reporteServicios.getReporteServicios(fechaIn, fechaFin,localStorage.getItem("idlocalidad")).
                        subscribe(data=>{
                          this.mostrarTabla = true;
                          this.listaReporteServicios = data[0];
                          this.spinner.hide();
                        }, error=>{
                          this.spinner.hide();
                          Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: error.message
                          });
                        });
      } else{
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Verificar Fechas Seleccionadas'
        });
      }
    } else{
      this.spinner.hide();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Es necesario introducir fechas'
      });
    }
  }
}
