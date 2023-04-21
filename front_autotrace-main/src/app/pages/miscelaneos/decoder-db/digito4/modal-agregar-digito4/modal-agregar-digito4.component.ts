import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Decoder4Service} from '@services/decoder4.service';
import {Util} from '@/utils/Util';
import {NgxSpinnerService} from 'ngx-spinner';
@Component({
    selector: 'app-modal-agregar-digito4',
    templateUrl: './modal-agregar-digito4.component.html',
    styleUrls: ['./modal-agregar-digito4.component.scss']
})
export class ModalAgregarDigito4Component implements OnInit {
    @Input() tituloModal: any;
    form: FormGroup;

    constructor(
        public activeModal: NgbActiveModal,
        private _decoder4Service: Decoder4Service,
        private fb: FormBuilder,
        private spinner: NgxSpinnerService
    ) {
        this.form = this.fb.group({
            InputDigito: [
                '',
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(10)
                ]
            ],
            InputAttributeType: [
                '',
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(100)
                ]
            ],
            InputRestraintSystem: [
                '',
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(100)
                ]
            ],
            InputBrakes: [
                '',
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(100)
                ]
            ],
            InputGVWR: [
                '',
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(100)
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
            attributeType: this.form.get('InputAttributeType')?.value,
            restraintSystem: this.form.get('InputRestraintSystem')?.value,
            brakes: this.form.get('InputBrakes')?.value,
            GVWR: this.form.get('InputGVWR')?.value
        };

        if (this.form.valid) {
            this.spinner.show();
            this._decoder4Service.insertarDigito4(body).subscribe(
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
