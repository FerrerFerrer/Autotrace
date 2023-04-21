import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalAgregarModelComponent } from './modal-agregar-model/modal-agregar-model.component';
import { ModalEditarModelComponent } from './modal-editar-model/modal-editar-model.component';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { Model } from "../../../models/Model";
import { ModelService } from '@services/model.service';
import { DataTableDirective } from 'angular-datatables';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent implements OnInit {
  model: [Model];
  dtOptions: any = {};
  listaClientes: any[];
  form: FormGroup;
  modalOptions: NgbModalOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  constructor(private modalService: NgbModal, private spinner: NgxSpinnerService, private ModelService: ModelService, private fb: FormBuilder) {
    this.form = this.fb.group({
      patronBusqueda: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
    this.listar();
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

  listar() {
    this.spinner.show();
    this.ModelService.getListModel().subscribe(data => {
      this.model = data[0];
      console.log(data[0]);
      this.dtTrigger.next();
      this.spinner.hide();
    }, error => {
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
    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  abrirModalAgregar() {
    const modalRef = this.modalService.open(ModalAgregarModelComponent);
    modalRef.componentInstance.tituloModal = 'Agregar model';

    modalRef.closed.subscribe((cambio) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.listar();
    });

  }

  filtroPatron() {
    const cadena = this.form.get('patronBusqueda')?.value;
    this.spinner.show();
    if (this.form.valid) {

      this.ModelService.buscarModel(cadena).subscribe(
        (data) => {
          this.model = data[0];

          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
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
        this.listar();
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

  abrirModalEditar(row) {
    const modalRef = this.modalService.open(ModalEditarModelComponent);
    modalRef.componentInstance.tituloModal = 'Editar model';
    modalRef.componentInstance.datos = row;
    modalRef.closed.subscribe((cambio) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.listar();
    });
  }

  eliminarRegistro(row) {
    Swal.fire({
      title: '¿Está seguro de eliminar este model?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {

      if (result.isConfirmed) {

        this.ModelService.borrarModel(row.model, row.idcliente).subscribe(data => {
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
          this.listar();
        }, (error) => {
          Swal.fire({
            title: 'Ha ocurrido un error',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        })
      }
    })

  }

}
