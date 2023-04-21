import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Decoder8Service } from '@services/decoder8.service';
import {Util} from '@/utils/Util';
import {NgxSpinnerService} from 'ngx-spinner';
@Component({
  selector: 'app-modal-editar-digito8',
  templateUrl: './modal-editar-digito8.component.html',
  styleUrls: ['./modal-editar-digito8.component.scss']
})
export class ModalEditarDigito8Component implements OnInit {

  @Input() tituloModal: any;
  @Input() datos: any;
  form: FormGroup;

  constructor(public activeModal: NgbActiveModal,
    private _decoder8Service: Decoder8Service,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService) {
    this.form = this.fb.group({
      InputDigitoGuardado: [],
      InputDigito: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      InputMotor: ['', [Validators.required, Validators.maxLength(100)]],
      InputCylinders: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      InputFuel: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      InputTurbo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      InputSalesCode: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
    });
  }

  ngOnInit(): void {
    this.form.patchValue({
      InputDigitoGuardado: this.datos.cveDigito,
      InputDigito: this.datos.cveDigito,
      InputMotor: this.datos.motor,
      InputCylinders :this.datos.cylinders,
      InputFuel :this.datos.fuel,
      InputTurbo :this.datos.turbo,
      InputSalesCode: this.datos.salesCode
    });
  }

  validacionNoCaracteresEspeciales(event) {
    Util.quitarCaracteresEspeciales(event);
}

  editar() {
    const body: any = {
      cve_digito: this.form.get('InputDigitoGuardado')?.value,
      cve_digitoNuevo: this.form.get('InputDigito')?.value,
      motor: this.form.get('InputMotor')?.value,
      cylinders: this.form.get('InputCylinders')?.value,
      fuel: this.form.get('InputFuel')?.value,
      turbo: this.form.get('InputTurbo')?.value,
      salesCode: this.form.get('InputSalesCode')?.value
    }

    if (this.form.valid) {
      this.spinner.show();
      this._decoder8Service.actualizarDigito8(body)
        .subscribe(
          (data) => {
            this.activeModal.close();
            this.spinner.hide();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Datos guardados correctamente',
              showConfirmButton: false,
              timer: 1500
            });
          },
          (error) => {
            this.spinner.hide();
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

}
