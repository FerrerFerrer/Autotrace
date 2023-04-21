import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Decoder57Service } from '@services/decoder57.service';
import { Subject } from 'rxjs';
import Swal from'sweetalert2';
import { ModalAgregarDigito57Component } from './modal-agregar-digito57/modal-agregar-digito57.component';
import { ModalEditarDigito57Component } from './modal-editar-digito57/modal-editar-digito57.component';

@Component({
  selector: 'app-digito57',
  templateUrl: './digito57.component.html',
  styleUrls: ['./digito57.component.scss']
})
export class Digito57Component implements OnInit {

  dtOptions: any = {};
  listaLocalidades: any[];

  listDecoder57: any[] = [];
  mostrarTabla: boolean = false;


  modalOptions:NgbModalOptions;
  dtTrigger = new Subject<any>();
  form: FormGroup;

  constructor( private modalService: NgbModal, private fb: FormBuilder,
    private _ServiceDecoder57: Decoder57Service,) {
    this.form = this.fb.group({
      patronBusqueda: ['', [Validators.required, Validators.minLength(1)]]
  });
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
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
    this.obtenerListaDecoder57();
  }

  obtenerListaDecoder57() {
    this._ServiceDecoder57.getListDecoder57().subscribe(
        (data) => {
            this.listDecoder57 = data[0];
            this.mostrarTabla = true;
        },
        (error) => {
            console.log(error);
        }
    );
}
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  abrirModalAgregar() {
    const modalRef = this.modalService.open(ModalAgregarDigito57Component);
    modalRef.componentInstance.tituloModal = 'Agregar digito 5-7';
    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerListaDecoder57();
  });
  }

  abrirModalEditar(row) {
    const modalRef = this.modalService.open(ModalEditarDigito57Component);
    modalRef.componentInstance.tituloModal = 'Editar digito 5-7';
modalRef.componentInstance.datos=row;

    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerListaDecoder57();
  });

  }

  eliminarRegistro(row){
    Swal.fire({
      title: '¿Está seguro de eliminar este registro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
  }).then((result) => {
      if (result.isConfirmed) {
          this._ServiceDecoder57.delete(row.cveDigito).subscribe(
              (data) => {
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
                  this.obtenerListaDecoder57();
              },
              (error) => {
                  console.log(error);
              }
          );
      }
  });
  }

  syncDelay(milliseconds) {
    var start = new Date().getTime();
    var end = 0;
    while (end - start < milliseconds) {
        end = new Date().getTime();
    }
}


  filtroPatron() {
    const cadena = this.form.get('patronBusqueda')?.value;

    if (this.form.valid) {
        this.mostrarTabla = false;
        this._ServiceDecoder57.buscarPatronDigito57(cadena).subscribe(
            (data) => {
                this.listDecoder57 = data[0];
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

}
