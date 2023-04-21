import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

import { LocalidadesService } from '@services/localidades.service';
import { Util } from '@/utils/Util';
@Component({
  selector: 'app-modal-editar-localidad',
  templateUrl: './modal-editar-localidad.component.html',
  styleUrls: ['./modal-editar-localidad.component.scss']
})
export class ModalEditarLocalidadComponent implements OnInit {

  @Input() tituloModal: any;
  @Input() datos: any;

  form: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private _localidadesService: LocalidadesService) {
      this.form = this.fb.group({
        IdLocalidad: [],
        IdLocalidadGuardado: [],
        InputLocalidad: [
          '',
          [
              Validators.required,
              Validators.maxLength(100),
              Validators.minLength(3)
          ]]
      });
    }

  ngOnInit(): void {
    this.form.patchValue({
      IdLocalidad: this.datos.idlocalidad,
      IdLocalidadGuardado: this.datos.idlocalidad,
      InputLocalidad: this.datos.localidad
    });
  }

  validacionNoCaracteresEspeciales(event) {
    Util.quitarCaracteresEspeciales(event);
  }

  editar() {
    const body : any = {
      idlocalidad: this.form.get('IdLocalidadGuardado')?.value,
      idlocalidadNuevo: this.form.get('IdLocalidad')?.value,
      localidad: this.form.get('InputLocalidad')?.value
    }

    if (this.form.valid) {
      this.spinner.show();
      this._localidadesService.updateLocalidad(body).subscribe((data) => {
        this.activeModal.close();
        this.spinner.hide();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'La localidad se modifico correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      },(error) => {
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
