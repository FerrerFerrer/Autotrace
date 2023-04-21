import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { UbicacionDanioService } from '@services/ubicacion-danio.service';
@Component({
  selector: 'app-modal-editar-ubicacion',
  templateUrl: './modal-editar-ubicacion.component.html',
  styleUrls: ['./modal-editar-ubicacion.component.scss']
})
export class ModalEditarUbicacionComponent implements OnInit {
  @Input() tituloModal: any;
  @Input() datos: any;
  form: FormGroup;
  constructor(public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private _ubicacionDanioService: UbicacionDanioService) {
    this.form = this.fb.group({
      InputClaveUbicacionDanioGuardado: [],
      InputClaveUbicacionDanio: [
          '',
          [
              Validators.required,
              Validators.maxLength(3),
              Validators.minLength(1)
          ]
      ],
      InputDescripcionUbicacionDanio: [
          '',
          [
              Validators.required,
              Validators.maxLength(100),
              Validators.minLength(1)
          ]
      ]
    });
  }

  ngOnInit(): void {
    this.form.patchValue({
      InputClaveUbicacionDanio: this.datos.cveUbicacionDanio,
      InputClaveUbicacionDanioGuardado: this.datos.cveUbicacionDanio,
      InputDescripcionUbicacionDanio: this.datos.descripcion
    });
  }

  editar() {
    const body = {
      cveUbicacionDanio: this.form.get('InputClaveUbicacionDanioGuardado').value,
      cveUbicacionDanioNuevo: this.form.get('InputClaveUbicacionDanio').value,
      descripcion: this.form.get('InputDescripcionUbicacionDanio').value
    }

    if (this.form.valid) {
      this._ubicacionDanioService
          .actualizarUbicacionDanio(body)
          .subscribe(
              (data) => {
                  this.activeModal.close();

                  Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'La ubicacion del daño se actualizo correctamente',
                      showConfirmButton: false,
                      timer: 1500
                  });
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

}
