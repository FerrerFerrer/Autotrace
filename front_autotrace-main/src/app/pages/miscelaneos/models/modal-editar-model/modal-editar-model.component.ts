import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '@services/clientes.service';
import { Model } from "../../../../models/Model";
import { ModelService } from '@services/model.service';
@Component({
  selector: 'app-modal-editar-model',
  templateUrl: './modal-editar-model.component.html',
  styleUrls: ['./modal-editar-model.component.scss']
})
export class ModalEditarModelComponent implements OnInit {

  listClientes: any[] = [];
  form: FormGroup;
  @Input() datos: any;
  @Input() tituloModal: any;
  constructor(public activeModal: NgbActiveModal,private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private _serviceCliente: ClientesService,private ServiceModel: ModelService) {
      this.form = this.fb.group({
        InputModel: ['',[Validators.required, Validators.maxLength(50)]],
        InputIdCliente: ['', Validators.required],
      });
     }

  ngOnInit(): void {
    this.listarClientes();
    this.form.patchValue({
      InputModel: this.datos.model,
      InputIdCliente: this.datos.idcliente,
  });
  }

  listarClientes()
{
  this._serviceCliente.getListClientes().subscribe(
    (data) => {
        this.listClientes = data[0];
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

  editar() {
   // model, idCliente, modelAnterior, idClienteanterior
    const body: any = {
      model: this.form.get('InputModel')?.value,
      idCliente: this.form.get('InputIdCliente')?.value,
      modelAnterior:this.datos.model,
      idClienteanterior:this.datos.idcliente
  };



  if (this.form.valid) {

      this.ServiceModel.actualizarModel(body).subscribe(
          (data) => {
              this.activeModal.close();
              this.spinner.hide();
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'La model se modifico correctamente',
                  showConfirmButton: false,
                  timer: 1500
              });
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
