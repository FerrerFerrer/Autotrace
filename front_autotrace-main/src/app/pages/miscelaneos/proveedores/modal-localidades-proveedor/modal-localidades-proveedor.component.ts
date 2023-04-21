import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

import { LocalidadesProveedoresService } from '@services/localidades-proveedores.service';
@Component({
  selector: 'app-modal-localidades-proveedor',
  templateUrl: './modal-localidades-proveedor.component.html',
  styleUrls: ['./modal-localidades-proveedor.component.scss']
})
export class ModalLocalidadesProveedorComponent implements OnInit {

  dtOptions: any = {};
  @Input() tituloModal: any;
  @Input() datos: any;

  listLocalidadProveedores: any[];
  listLocalidadNoProveedores: any[];
  mostrarTabla: boolean = false;

  constructor(
      public activeModal: NgbActiveModal,
      private _localidadesProveedor : LocalidadesProveedoresService
  ) {}

  ngOnInit(): void {
      this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 20,
          serverSide: false,
          processing: true,
          scrollX: true,
          scrollY: "400px",
          scrollCollapse: true,
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


      this.listarLocalidadesUsuario();
  }

  listarLocalidadesUsuario() {
    this.obtenerLocalidadesProveedor();
    this.obtenerLocalidadesNoProveedor();
  }

  obtenerLocalidadesProveedor() {
    this._localidadesProveedor.obtenerLocalidadesProveedores(this.datos.idproveedor).subscribe(data => {
      this.listLocalidadProveedores = data[0];
    })
  }

  obtenerLocalidadesNoProveedor() {
    this._localidadesProveedor.obtenerLocalidadesNoProveedores(this.datos.idproveedor).subscribe(data => {
      this.listLocalidadNoProveedores = data[0];
      this.mostrarTabla = true;
    })
  }

  editarLocalidades() {
    var items: any = document.getElementsByName('existentes');
    for (var i = 0; i < items.length; i++) {
      if (items[i].checked == true) {
      } else {
        const element = items[i]['value'];

        const idproveedor = this.datos.idproveedor;
        const idlocalidad = element;
        this._localidadesProveedor
          .eliminar(idproveedor, idlocalidad)
          .subscribe(
            (data) => { },
            (error) => {
              Swal.fire({
                title: 'Ha ocurrido un error',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
            }
          );
      }
    }

    var items2: any = document.getElementsByName('noExistentes');

    for (var i = 0; i < items2.length; i++) {
      if (items2[i].checked == true) {
        const element = items2[i]['value'];

        const body: any = {
          idproveedor: this.datos.idproveedor,
          idlocalidad: element
        };

        this._localidadesProveedor
          .insertarLocalidadProveedor(body)
          .subscribe(
            (data) => { },
            (error) => {
              Swal.fire({
                title: 'Ha ocurrido un error',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
            }
          );
      } else {}
    }


    this.activeModal.close();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Datos guardados correctamente',
      showConfirmButton: false,
      timer: 1500
    });
  }

}
