import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import Swal from'sweetalert2';
import { ModalAgregarDigito11Component } from './modal-agregar-digito11/modal-agregar-digito11.component';
import { ModalEditarDigito11Component } from './modal-editar-digito11/modal-editar-digito11.component';

import { Decoder11Service } from '@services/decoder11.service';
@Component({
  selector: 'app-digito11',
  templateUrl: './digito11.component.html',
  styleUrls: ['./digito11.component.scss']
})
export class Digito11Component implements OnInit {

  dtOptions: any = {};
  listaDecoder11: any[] = [];
  mostrarTabla: boolean = false;
  form: FormGroup;

  modalOptions: NgbModalOptions;
  dtTrigger = new Subject<any>();
  
  constructor(private modalService: NgbModal,
    private _decoder11Service: Decoder11Service,
    private fb: FormBuilder) {
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

    this.obtenerListDecoder11();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  
  abrirModalAgregar() {
    const modalRef = this.modalService.open(ModalAgregarDigito11Component);
    modalRef.componentInstance.tituloModal = 'Agregar digito 11';

    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerListDecoder11();
    });
  }

  abrirModalEditar(row) {
    const modalRef = this.modalService.open(ModalEditarDigito11Component);
    modalRef.componentInstance.tituloModal = 'Editar digito 11';
    modalRef.componentInstance.datos = row;

    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerListDecoder11();
    });
  }

  eliminarRegistro(row) {
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
        this._decoder11Service.delete(row.cveDigito).subscribe(
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
            this.obtenerListDecoder11();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  obtenerListDecoder11() {
    this._decoder11Service.getListDecoder11().subscribe(data => {
      this.listaDecoder11 = data[0];
      this.mostrarTabla = true;
    })
  }

  filtroPatron() {
    const cadena = this.form.get('patronBusqueda')?.value;

    if (this.form.valid) {
      this.mostrarTabla = false;
      this._decoder11Service.buscarPatronDigito11(cadena).subscribe(
        (data) => {
          this.listaDecoder11 = data[0];
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
