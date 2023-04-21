import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UbicacionDanioService } from '@services/ubicacion-danio.service';
@Component({
  selector: 'app-modal-agregar-ubicacion',
  templateUrl: './modal-agregar-ubicacion.component.html',
  styleUrls: ['./modal-agregar-ubicacion.component.scss']
})
export class ModalAgregarUbicacionComponent implements OnInit {
  @Input() tituloModal: any;
  form: FormGroup;

  constructor(public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private _ubicacionDanioService: UbicacionDanioService) { 
      this.form = this.fb.group({
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
  }

  agregar() {
    const body = {
      cve_ubicacionDanio: this.form.get('InputClaveUbicacionDanio').value,
      descripcion: this.form.get('InputDescripcionUbicacionDanio').value
    }

    if (this.form.valid) {
      this._ubicacionDanioService
          .insertarActualizaUbicacionDanio(body)
          .subscribe(
              (data) => {
                  this.activeModal.close();

                  Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'La ubicacion del daño se se guardó correctamente',
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
