import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ModalAgregarSeveridadFactorComponent } from './modal-agregar-severidad-factor/modal-agregar-severidad-factor.component';
import { ModalEditarSeveridadFactorComponent } from './modal-editar-severidad-factor/modal-editar-severidad-factor.component';

import { SeveridadFDanioService } from '@services/severidad-fdanio.service';

@Component({
  selector: 'app-severidad-factor',
  templateUrl: './severidad-factor.component.html',
  styleUrls: ['./severidad-factor.component.scss']
})
export class SeveridadFactorComponent implements OnInit {

  dtOptions: any = {};
  dtTrigger = new Subject<any>();
  modalOptions:NgbModalOptions;

  listSeveridadFDanio: any[];
  mostrarTabla: boolean = false;
  form: FormGroup;

  constructor(private modalService: NgbModal,
    private fb: FormBuilder,
    private _severidadFDanioService : SeveridadFDanioService) {
      this.form = this.fb.group({
        patronBusqueda: ['', [Validators.required, Validators.minLength(1)]]
      });
    }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      serverSide: false,
      processing: false,
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
      backdrop:'static',
      backdropClass:'customBackdrop'
    }

    this.obtenerSeveridadFDanio();
  }

  obtenerSeveridadFDanio(){
    this._severidadFDanioService.getListSeveridadFDanio().subscribe(data => {
      this.listSeveridadFDanio = data[0];
      this.mostrarTabla = true;
      console.log(this.listSeveridadFDanio);
    })
  }

  ngAfterViewInit(): void {
    //this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    //this.dtTrigger.unsubscribe();
  }

  abrirModalAgregar() {
    const modalRef = this.modalService.open(ModalAgregarSeveridadFactorComponent);
    modalRef.componentInstance.tituloModal = 'Agregar factor/daño';

    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerSeveridadFDanio();
    });
  }

  abrirModalEditar(row) {
    const modalRef = this.modalService.open(ModalEditarSeveridadFactorComponent);
    modalRef.componentInstance.tituloModal = 'Editar factor/daño';
    modalRef.componentInstance.datos = row;

    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;
      this.syncDelay(10);
      this.obtenerSeveridadFDanio();
    });
  }

  eliminarRegistro(row){
    Swal.fire({
      title: '¿Está seguro de eliminar esta severidad factor daño?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      
      if (result.isConfirmed) {
        this._severidadFDanioService.deleteSeveridadFDanio(row.cveServeridadFactorDanio).subscribe(data => {
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
          this.obtenerSeveridadFDanio();
        }, (error) => {
          console.log(error);
        })
      }
    })
  }
  

  filtroPatron() {
    const cadena = this.form.get('patronBusqueda')?.value;
  
    if (this.form.valid) {
        this.mostrarTabla = false;
        this._severidadFDanioService.buscarPatron(cadena).subscribe(
            (data) => {
              this.listSeveridadFDanio = data[0];
                this.mostrarTabla = true;
            },
            (error) => {
                console.log(error);
            }
        );
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Verificar Datos Ingresados!',
            showConfirmButton: false,
            timer: 1500
        });
    }
  }

  syncDelay(milliseconds) {
    var start = new Date().getTime();
    var end = 0;
    while (end - start < milliseconds) {
        end = new Date().getTime();
    }
  }
}
