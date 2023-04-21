import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ModalAgregarDigito4Component } from './modal-agregar-digito4/modal-agregar-digito4.component';
import { ModalEditarDigito4Component } from './modal-editar-digito4/modal-editar-digito4.component';

import { Decoder4Service } from '@services/decoder4.service';
@Component({
  selector: 'app-digito4',
  templateUrl: './digito4.component.html',
  styleUrls: ['./digito4.component.scss']
})
export class Digito4Component implements OnInit {

  dtOptions: any = {};
  listaDecoder4: any[] = [];
  mostrarTabla: boolean = false;
  form: FormGroup;

  modalOptions: NgbModalOptions;
  dtTrigger = new Subject<any>();

  constructor(private modalService: NgbModal,
    private _decoder4Service: Decoder4Service,
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
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
    this.obtenerListDecoder4();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  abrirModalAgregar() {
    const modalRef = this.modalService.open(ModalAgregarDigito4Component);
    modalRef.componentInstance.tituloModal = 'Agregar digito 4';

    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerListDecoder4();
    });
  }

  abrirModalEditar(row) {
    const modalRef = this.modalService.open(ModalEditarDigito4Component);
    modalRef.componentInstance.tituloModal = 'Editar digito 4';
    modalRef.componentInstance.datos = row;

    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerListDecoder4();
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
        this._decoder4Service.delete(row.cveDigito).subscribe(
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
            this.obtenerListDecoder4();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  obtenerListDecoder4() {
    this._decoder4Service.getListDecoder4().subscribe(data => {
      this.listaDecoder4 = data[0];
      this.mostrarTabla = true;
    })
  }

  filtroPatron() {
    const cadena = this.form.get('patronBusqueda')?.value;

    if (this.form.valid) {
      this.mostrarTabla = false;
      this._decoder4Service.buscarPatronDigito4(cadena).subscribe(
        (data) => {
          this.listaDecoder4 = data[0];
          this.mostrarTabla = true;
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
if(cadena==""){
  this.obtenerListDecoder4();
}else{
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

  syncDelay(milliseconds) {
    var start = new Date().getTime();
    var end = 0;
    while (end - start < milliseconds) {
      end = new Date().getTime();
    }
  }
}
