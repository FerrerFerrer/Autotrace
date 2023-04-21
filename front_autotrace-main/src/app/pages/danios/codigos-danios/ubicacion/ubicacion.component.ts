import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalAgregarUbicacionComponent } from './modal-agregar-ubicacion/modal-agregar-ubicacion.component';
import { ModalEditarUbicacionComponent } from './modal-editar-ubicacion/modal-editar-ubicacion.component';

import { UbicacionDanioService } from '@services/ubicacion-danio.service';
@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.scss']
})
export class UbicacionComponent implements OnInit {

  dtOptions: any = {};
  listUbicacionesDanio : any[] = [];
  mostrarTabla: boolean = false;
  form: FormGroup;

  constructor(private modalService: NgbModal,
    private fb: FormBuilder,
    private _ubicacionDanioService : UbicacionDanioService) {
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

    this.obtenerUbicacionesDanio();
  }

  abrirModalAgregar() {
    const modalRef = this.modalService.open(ModalAgregarUbicacionComponent);
    modalRef.componentInstance.tituloModal = 'Agregar ubicacion';

    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerUbicacionesDanio();
    });
  }

  abrirModalEditar(row) {
    const modalRef = this.modalService.open(ModalEditarUbicacionComponent);
    modalRef.componentInstance.tituloModal = 'Editar ubicacion';
    modalRef.componentInstance.datos = row;

    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerUbicacionesDanio();
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
          this._ubicacionDanioService.deleteUbicacionDanio(row.cveUbicacionDanio).subscribe(
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
                  this.obtenerUbicacionesDanio();
              },
              (error) => {
                  console.log(error);
              }
          );
      }
  });
  }

  filtroPatron() {
    const cadena = this.form.get('patronBusqueda')?.value;
  
    if (this.form.valid) {
        this.mostrarTabla = false;
        this._ubicacionDanioService.buscarPatron(cadena).subscribe(
            (data) => {
                this.listUbicacionesDanio = data[0];
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

  obtenerUbicacionesDanio(){
    this._ubicacionDanioService.getListUbicacionesDanio().subscribe(data => {
      this.listUbicacionesDanio = data[0];
      this.mostrarTabla = true;
    })
  }

  syncDelay(milliseconds) {
    var start = new Date().getTime();
    var end = 0;
    while (end - start < milliseconds) {
        end = new Date().getTime();
    }
  }
}
