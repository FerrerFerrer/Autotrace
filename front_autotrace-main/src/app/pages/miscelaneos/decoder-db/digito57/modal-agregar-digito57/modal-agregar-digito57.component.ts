import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Decoder57Service } from '@services/decoder57.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

import { Util } from '@/utils/Util';
@Component({
    selector: 'app-modal-agregar-digito57',
    templateUrl: './modal-agregar-digito57.component.html',
    styleUrls: ['./modal-agregar-digito57.component.scss']
})
export class ModalAgregarDigito57Component implements OnInit {

    @Input() tituloModal: any;
    form: FormGroup;
    constructor(public activeModal: NgbActiveModal,
        private fb: FormBuilder,
        private spinner: NgxSpinnerService,
        private _ServiceDecoder57: Decoder57Service) {

        this.form = this.fb.group({
            claveDigito: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(3),
                ]
            ],
            driverType: [
                '',
                [
                    Validators.maxLength(100)
                ]
            ],
            brand: [
                '',
                [
                    Validators.maxLength(100)
                ]
            ],
            series: [
                '',
                [
                    Validators.maxLength(100)
                ]
            ],
            driverPosition: [
                '',
                [
                    Validators.maxLength(100)
                ]
            ],
            bodyTypeCab: [
                '',
                [
                    Validators.maxLength(100)
                ]
            ]
        });


    }

    ngOnInit(): void {
    }

    validacionNoCaracteresEspeciales(event) {
        Util.quitarCaracteresEspeciales(event);
    }

    agregar() {
        const clave = this.form.get('claveDigito')?.value;
        const driverType = this.form.get('driverType')?.value;
        const brand = this.form.get('brand')?.value;
        const series = this.form.get('series')?.value;
        const driverPosition = this.form.get('driverPosition')?.value;
        const bodyTypeCab = this.form.get('bodyTypeCab')?.value;

        if (this.form.valid) {
            this.spinner.show();
            this._ServiceDecoder57.insertarDigito57(clave, driverType, brand, series, driverPosition, bodyTypeCab)
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