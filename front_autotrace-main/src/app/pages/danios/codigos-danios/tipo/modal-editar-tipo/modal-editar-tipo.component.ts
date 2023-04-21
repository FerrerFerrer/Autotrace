import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TipodanioService} from '@services/tipodanio.service';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-modal-editar-tipo',
    templateUrl: './modal-editar-tipo.component.html',
    styleUrls: ['./modal-editar-tipo.component.scss']
})
export class ModalEditarTipoComponent implements OnInit {
    @Input() tituloModal: any;
    @Input() datos: any;

    form: FormGroup;
    constructor(
        public activeModal: NgbActiveModal,
        private fb: FormBuilder,
        private _serviceTipoDanio: TipodanioService
    ) {
        this.form = this.fb.group({
            claveTipoDanioGuardado: [],
            claveTipoDanio: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(3),
                    Validators.minLength(1)
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
            claveTipoDanio: this.datos.cveTipoDanio,
            claveTipoDanioGuardado: this.datos.cveTipoDanio,
            descripcion: this.datos.descripcion
        });
    }

    editar() {
        const body = {
            cveTipoDanio: this.form.get('claveTipoDanioGuardado')?.value,
            cveTipoDanioNuevo: this.form.get('claveTipoDanio')?.value,
            descripcion : this.form.get('descripcion')?.value
        }

        if (this.form.valid) {
            this._serviceTipoDanio
                .actualizarTipoDanio(body)
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
