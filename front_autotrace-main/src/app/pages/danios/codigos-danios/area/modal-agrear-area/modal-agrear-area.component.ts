import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AreadanioService } from '@services/areadanio.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-modal-agrear-area',
    templateUrl: './modal-agrear-area.component.html',
    styleUrls: ['./modal-agrear-area.component.scss']
})
export class ModalAgrearAreaComponent implements OnInit {
    @Input() my_modal_title: any;

    form: FormGroup;

    constructor(
        public activeModal: NgbActiveModal,
        private fb: FormBuilder,
        private _serviceAreaDanio: AreadanioService
    ) {
        this.form = this.fb.group({
            claveAreaDanio: [
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

    ngOnInit(): void { }

    agregarArea() {
        const clave = this.form.get('claveAreaDanio')?.value;
        const descripcion = this.form.get('descripcion')?.value;

        if (this.form.valid) {
            this._serviceAreaDanio
                .insertarActualizarAreaDanio(clave, descripcion)
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
