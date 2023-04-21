import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoReparacionService } from '@services/tipo-reparacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-editar-tipo-reparacion',
  templateUrl: './modal-editar-tipo-reparacion.component.html',
  styleUrls: ['./modal-editar-tipo-reparacion.component.scss']
})
export class ModalEditarTipoReparacionComponent implements OnInit {

  @Input() tituloModal: any;
  @Input() datos: any;

    form: FormGroup;


  constructor(public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private _serviceTipoReparacion: TipoReparacionService) {

      this.form = this.fb.group({
        claveTipoReparacion: [
            '',
            [
                Validators.required,
                Validators.maxLength(3),
                Validators.minLength(3)
            ]
        ],
        descripcion: [
            '',
            [
                Validators.required,
                Validators.maxLength(125),
                Validators.minLength(1)
            ]
        ]
    });


     }

  ngOnInit(): void {
    this.form.patchValue({
      claveTipoReparacion: this.datos.cveTipoReparacion,
      descripcion: this.datos.descripcion
  });


  }

  editar() {

    const body : any = {
      cve_tipoReparacion:this.datos.cveTipoReparacion,
      cve_tipoReparacionNuevo: this.form.get('claveTipoReparacion')?.value,
      descripcion: this.form.get('descripcion')?.value
    }


    if (this.form.valid) {
        this._serviceTipoReparacion
            .actualizarTipoReparacion(body)
            .subscribe(
                (data) => {
                    this.activeModal.close();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se Actualizó correctamente',
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
