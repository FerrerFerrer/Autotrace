import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalAgregarProveedorComponent } from './modal-agregar-proveedor/modal-agregar-proveedor.component';
import { ModalEditarProveedorComponent } from './modal-editar-proveedor/modal-editar-proveedor.component';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner"; //Importancion del spinner
import { ProveedoresService } from '@services/proveedores.service';
import { ModalLocalidadesProveedorComponent } from './modal-localidades-proveedor/modal-localidades-proveedor.component';
import { DataTableDirective } from 'angular-datatables';
import { Model } from '@/models/Model';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {
  model: [Model];
  dtOptions: any = {};
  listaProveedores: any[];
  form: FormGroup;
  modalOptions: NgbModalOptions;
  dtTrigger = new Subject<any>();

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;



  constructor(private modalService: NgbModal,
    private fb: FormBuilder,
    private _proveedoresService: ProveedoresService,
    private spinner: NgxSpinnerService) {
    this.form = this.fb.group({
      patronBusqueda: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
    this.obtenerProveedores();
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



  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  abrirModalAgregar() {
    const modalRef = this.modalService.open(ModalAgregarProveedorComponent);
    modalRef.componentInstance.tituloModal = 'Agregar proveedor';

    modalRef.closed.subscribe((cambio) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.obtenerProveedores();
    });
  }


  abrirModalLocalidades(row: any) {
    const modalRef = this.modalService.open(ModalLocalidadesProveedorComponent);
    modalRef.componentInstance.tituloModal = 'Localidades';
    modalRef.componentInstance.datos = row;
    modalRef.closed.subscribe((cambio) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.obtenerProveedores();
    });
  }

  abrirModalEditar(row) {
    const modalRef = this.modalService.open(ModalEditarProveedorComponent);
    modalRef.componentInstance.tituloModal = 'Editar proveedor';
    modalRef.componentInstance.datos = row;

    modalRef.closed.subscribe((cambio) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.obtenerProveedores();
    });
  }

  eliminarRegistro(row) {
    Swal.fire({
      title: '¿Está seguro de eliminar este proveedor?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {

      if (result.isConfirmed) {
        this._proveedoresService.deleteProveedor(row.idproveedor).subscribe(data => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Eliminado',
            text: 'El registro se ha eliminado!',
            showConfirmButton: false,
            timer: 1500
          });
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
          });
          this.obtenerProveedores();
        }, (error) => {
          console.log(error);
        })
      }
    })
  }

  filtroPatron() {
    const cadena = this.form.get('patronBusqueda')?.value;

    if (this.form.valid) {

      this._proveedoresService.buscarPatron(cadena).subscribe(
        (data) => {
          this.listaProveedores = data[0];
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      if (cadena == "") {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.obtenerProveedores();
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

  obtenerProveedores() {
    this.spinner.show();
    this._proveedoresService.getListProveedores().subscribe(data => {
      this.listaProveedores = data[0];
      this.dtTrigger.next();
      this.spinner.hide();
    })
  }


}
