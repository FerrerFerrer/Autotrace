import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalAgregarDigito8Component } from './modal-agregar-digito8/modal-agregar-digito8.component';
import { ModalEditarDigito8Component } from './modal-editar-digito8/modal-editar-digito8.component';
import Swal from'sweetalert2';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

import { Decoder8Service } from '@services/decoder8.service';

@Component({
  selector: 'app-digito8',
  templateUrl: './digito8.component.html',
  styleUrls: ['./digito8.component.scss']
})
export class Digito8Component implements OnInit {

  dtOptions: any = {};
  listaDecoder8: any[] = [];
  mostrarTabla: boolean = false;
  form: FormGroup;

  modalOptions: NgbModalOptions;
  dtTrigger = new Subject<any>();

  constructor(private modalService: NgbModal,
    private _decoder8Service: Decoder8Service,
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

    this.obtenerListDecoder8();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  
  abrirModalAgregar() {
    const modalRef = this.modalService.open(ModalAgregarDigito8Component);
    modalRef.componentInstance.tituloModal = 'Agregar digito 8';

    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerListDecoder8();
    });
  }

  abrirModalEditar(row) {
    const modalRef = this.modalService.open(ModalEditarDigito8Component);
    modalRef.componentInstance.tituloModal = 'Editar digito 8';
    modalRef.componentInstance.datos = row;

    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerListDecoder8();
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
        this._decoder8Service.delete(row.cveDigito).subscribe(
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
            this.obtenerListDecoder8();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  obtenerListDecoder8() {
    this._decoder8Service.getListDecoder8().subscribe(data => {
      this.listaDecoder8 = data[0];
      this.mostrarTabla = true;
    })
  }

  filtroPatron() {
    const cadena = this.form.get('patronBusqueda')?.value;

    if (this.form.valid) {
      this.mostrarTabla = false;
      this._decoder8Service.buscarPatronDigito4(cadena).subscribe(
        (data) => {
          this.listaDecoder8 = data[0];
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
