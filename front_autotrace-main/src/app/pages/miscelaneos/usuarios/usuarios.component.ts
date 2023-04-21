import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioServiceService } from '@services/usuario-service.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner"; //Importancion del spinner
import { ModalAgregarUsuarioComponent } from './modal-agregar-usuario/modal-agregar-usuario.component';
import { ModalEditarUsuarioComponent } from './modal-editar-usuario/modal-editar-usuario.component';
import { ModalLocalidadesUsuarioComponent } from './modal-localidades-usuario/modal-localidades-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  dtOptions: any = {};
  listaClientes: any[];
  listUsuarios: any[];
  form: FormGroup;

  modalOptions: NgbModalOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  constructor(private modalService: NgbModal,
    private _serviceUsaurios: UsuarioServiceService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      patronBusqueda: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
    this.obtenerListaUsuarios();
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

  obtenerListaUsuarios() {
    this.spinner.show();
    this._serviceUsaurios.getListUsuarios().subscribe(
      (data) => {
        this.listUsuarios = data[0];

        this.dtTrigger.next();
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }
  abrirModalAgregar() {
    const modalRef = this.modalService.open(ModalAgregarUsuarioComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.tituloModal = 'Agregar usuario';
    modalRef.closed.subscribe((cambio) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.obtenerListaUsuarios();
    });
  }

  abrirModalEditar(row: any) {
    const modalRef = this.modalService.open(ModalEditarUsuarioComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.tituloModal = 'Editar usuario';
    modalRef.componentInstance.datos = row;
    modalRef.closed.subscribe((cambio) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.obtenerListaUsuarios();
    });
  }

  abrirModalLocalidades(row: any) {
    const modalRef = this.modalService.open(ModalLocalidadesUsuarioComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.tituloModal = 'Administrar localidades de usuario';
    modalRef.componentInstance.datos = row;
    modalRef.closed.subscribe((cambio) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.obtenerListaUsuarios();
    });
  }

  filtroPatron() {
    const cadena = this.form.get('patronBusqueda')?.value;
    this.spinner.show();
    if (this.form.valid) {
      this._serviceUsaurios.buscarPatronUsuario(cadena).subscribe(
        (data) => {
          this.listUsuarios = data[0];

          this.dtElement.dtInstance.then(
            (dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next();
            }
          );
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
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
    } else {
      if (cadena == "") {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.obtenerListaUsuarios();
      } else {
        this.spinner.hide();
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

  eliminarRegistro(row) {
    Swal.fire({
      title: '¿Está seguro de eliminar este cliente?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {

      if (result.isConfirmed) {


        const body: any = {
          idusuario: row.idusuario,

        };

        this._serviceUsaurios.eliminarUsuario(body).subscribe(
          (data) => {
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
            this.obtenerListaUsuarios();
          },
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
    })


  }


}
