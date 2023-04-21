import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { Model } from "../../../../models/Model";
import { ModelService } from '@services/model.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '@services/clientes.service';
@Component({
  selector: 'app-modal-agregar-model',
  templateUrl: './modal-agregar-model.component.html',
  styleUrls: ['./modal-agregar-model.component.scss']
})
export class ModalAgregarModelComponent implements OnInit {
  model: Model = new Model();
  listClientes: any[] = [];
  @Input() tituloModal: any;
  form: FormGroup;
  constructor(public activeModal: NgbActiveModal, private spinner: NgxSpinnerService, private ServiceModel: ModelService
   , private _serviceCliente:ClientesService ,private fb: FormBuilder,) {

    this.form = this.fb.group({
      InputModel: ['',[Validators.required, Validators.maxLength(50)]],
      InputIdCliente: ['', Validators.required],
    });

   }

  ngOnInit(): void {
    this.listarClientes();
  }


listarClientes()
{
  this._serviceCliente.getListClientes().subscribe(
    (data) => {
        this.listClientes = data[0];
    },
    (error) => {
        console.log(error);
    }
);
}


  agregar() {
console.log(this.model);
    if(this.form.valid)
  {
    this.spinner.show();
    this.ServiceModel.crearModel(this.model).subscribe(
      data => {
        this.activeModal.close();
        this.spinner.hide();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El Inventario Etiqueta se guardo correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      }, error => {
        console.log(error);
        this.spinner.hide();
        Swal.fire({
          title: 'Ha ocurrido un error',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        });
      }
    )
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
