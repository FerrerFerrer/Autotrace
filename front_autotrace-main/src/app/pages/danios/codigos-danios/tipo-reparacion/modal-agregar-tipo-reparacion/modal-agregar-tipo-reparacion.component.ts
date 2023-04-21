import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TipoReparacionService} from '@services/tipo-reparacion.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-modal-agregar-tipo-reparacion',
    templateUrl: './modal-agregar-tipo-reparacion.component.html',
    styleUrls: ['./modal-agregar-tipo-reparacion.component.scss']
})
export class ModalAgregarTipoReparacionComponent implements OnInit {
    @Input() tituloModal: any;
    form: FormGroup;
    constructor(
        public activeModal: NgbActiveModal,
        private fb: FormBuilder,
        private _serviceTipoReparacion: TipoReparacionService
    ) {
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

    ngOnInit(): void {}

    agregar() {
        const clave = this.form.get('claveTipoReparacion')?.value;
        const descripcion = this.form.get('descripcion')?.value;

        if (this.form.valid) {
            this._serviceTipoReparacion
                .insertarActualizarTipoReparacion(clave, descripcion)
                .subscribe(
                    (data) => {
                        this.activeModal.close();

                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'El area se seguardó correctamente',
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
