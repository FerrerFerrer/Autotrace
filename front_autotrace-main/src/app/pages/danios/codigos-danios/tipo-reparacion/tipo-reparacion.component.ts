import { Component, OnInit } from '@angular/core';
import { ModalAgregarTipoReparacionComponent } from './modal-agregar-tipo-reparacion/modal-agregar-tipo-reparacion.component';
import { ModalEditarTipoReparacionComponent } from './modal-editar-tipo-reparacion/modal-editar-tipo-reparacion.component';
import Swal from'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoReparacionService } from '@services/tipo-reparacion.service';
@Component({
  selector: 'app-tipo-reparacion',
  templateUrl: './tipo-reparacion.component.html',
  styleUrls: ['./tipo-reparacion.component.scss']
})
export class TipoReparacionComponent implements OnInit {
  listTipoReparacion: any[] = [];
  mostrarTabla: boolean = false;
  form: FormGroup;
  
  dtOptions: any = {};
  constructor(private modalService: NgbModal,private fb: FormBuilder, 
    private _serviceTipoReparacion: TipoReparacionService,) {
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

    this.obtenerListaTipoReparacion();
  }

  obtenerListaTipoReparacion() {
    this._serviceTipoReparacion.getListTipoReparacion().subscribe(
        (data) => {
            this.listTipoReparacion = data[0];
            console.log(this.listTipoReparacion);
            this.mostrarTabla = true;
        },
        (error) => {
            console.log(error);
        }
    );
}

filtroPatron() {
  const cadena = this.form.get('patronBusqueda')?.value;

  if (this.form.valid) {
      this.mostrarTabla = false;
      this._serviceTipoReparacion.buscarPatronTipoReparacion(cadena).subscribe(
          (data) => {
              this.listTipoReparacion = data[0];
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


  abrirModalAgregar() {
    const modalRef = this.modalService.open(ModalAgregarTipoReparacionComponent);
    modalRef.componentInstance.tituloModal = 'Agregar tipo de reparación';
    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerListaTipoReparacion();
  });
  }

  abrirModalEditar(row) {
    const modalRef = this.modalService.open(ModalEditarTipoReparacionComponent);
    modalRef.componentInstance.tituloModal = 'Editar tipo de raparación';
    modalRef.componentInstance.datos = row;

        modalRef.closed.subscribe((cambio) => {
            this.mostrarTabla = false;
            this.syncDelay(10);
            this.obtenerListaTipoReparacion();
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
          this._serviceTipoReparacion.delete(row.cveTipoReparacion).subscribe(
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
                  this.obtenerListaTipoReparacion();
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

}
