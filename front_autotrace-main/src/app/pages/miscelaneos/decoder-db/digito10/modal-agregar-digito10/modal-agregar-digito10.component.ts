import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Decoder10Service} from '@services/decoder10.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

import { Util } from '@/utils/Util';
@Component({
    selector: 'app-modal-agregar-digito10',
    templateUrl: './modal-agregar-digito10.component.html',
    styleUrls: ['./modal-agregar-digito10.component.scss']
})
export class ModalAgregarDigito10Component implements OnInit {
    @Input() tituloModal: any;
    form: FormGroup;
    constructor(
        public activeModal: NgbActiveModal,
        private _decoder10Service: Decoder10Service,
        private spinner: NgxSpinnerService,
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            InputDigito: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(1)
                ]
            ],
            InputYear: [
                '',
                [
                    Validators.maxLength(4)
                ]
            ]
        });
    }

    ngOnInit(): void {}

    validacionNoCaracteresEspeciales(event) {
        Util.quitarCaracteresEspeciales(event);
    }

    agregar() {
        const body: any = {
            cve_digito: this.form.get('InputDigito')?.value,
            year: this.form.get('InputYear')?.value
        };

        if (this.form.valid) {
            this.spinner.show();
            this._decoder10Service.insertarDigito10(body).subscribe(
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
                    console.log(error);
                    Swal.fire({
                        title: 'Ha ocurrido un error',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    })
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
