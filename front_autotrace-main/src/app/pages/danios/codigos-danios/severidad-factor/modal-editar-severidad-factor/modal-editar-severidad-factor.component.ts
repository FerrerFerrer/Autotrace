import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SeveridadFDanioService } from '@services/severidad-fdanio.service';

@Component({
  selector: 'app-modal-editar-severidad-factor',
  templateUrl: './modal-editar-severidad-factor.component.html',
  styleUrls: ['./modal-editar-severidad-factor.component.scss']
})
export class ModalEditarSeveridadFactorComponent implements OnInit {
  @Input() tituloModal: any;
  @Input() datos: any;
  form: FormGroup;

  constructor(public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private _severidadFDanioService : SeveridadFDanioService) {
      this.form = this.fb.group({
        InputDescripcion: [
          '',
          [
              Validators.required,
              Validators.maxLength(100),
              Validators.minLength(3)
          ]],
          InputClave: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(1)]]
      });
    }

  ngOnInit(): void {
    this.form.patchValue({
      InputClave: this.datos.cveServeridadFactorDanio,
      InputDescripcion: this.datos.descripcion
    });


  }

  editar() {
    const body : any = {
      cve_severidadFactorDanio:this.datos.cveServeridadFactorDanio,
      cve_severidadFactorDanioNuevo: this.form.get('InputClave')?.value,
      descripcion: this.form.get('InputDescripcion')?.value
    }

    if (this.form.valid) {
      this._severidadFDanioService.actualizarSeveridadFDanio(body).subscribe((data) => {
        this.activeModal.close();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Severidad Factor Daño se actualizo correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      },(error) => {
        console.log(error);
      });
    }
    else {
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
