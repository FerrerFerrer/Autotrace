import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Decoder13Service } from '@services/decoder13.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

import { Util } from '@/utils/Util';
@Component({
    selector: 'app-modal-editar-digito13',
    templateUrl: './modal-editar-digito13.component.html',
    styleUrls: ['./modal-editar-digito13.component.scss']
})
export class ModalEditarDigito13Component implements OnInit {

    @Input() tituloModal: any;
    @Input() datos: any;
    form: FormGroup;
    constructor(public activeModal: NgbActiveModal, 
        private spinner: NgxSpinnerService,
        private fb: FormBuilder, private _ServiceDecoder13: Decoder13Service) {
        this.form = this.fb.group({
            claveDigito: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(3),

                ]
            ],
            manufacturerName: [
                '',
                [
                    Validators.maxLength(100),
                ]
            ],
            vehicleType: [
                '',
                [
                    Validators.maxLength(100),
                ]
            ]
        });
    }

    ngOnInit(): void {
        this.form.patchValue({
            claveDigito: this.datos.cveDigito,
            manufacturerName: this.datos.manufacturerName,
            vehicleType: this.datos.vehicleType
        });

    }

    validacionNoCaracteresEspeciales(event) {
        Util.quitarCaracteresEspeciales(event);
    }

    editar() {
        const clave = this.form.get('claveDigito')?.value;
        const manufacturer = this.form.get('manufacturerName')?.value;
        const vehicle = this.form.get('vehicleType')?.value;

        if (this.form.valid) {
            this.spinner.show();
            this._ServiceDecoder13
                .actualizarDigito13(this.datos.cveDigito, clave, manufacturer, vehicle)
                .subscribe(
                    (data) => {
                        this.activeModal.close();
                        this.spinner.hide();
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Se Actualizó correctamente',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    },
                    (error) => {
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