import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Decoder11Service} from '@services/decoder11.service';
import {Util} from '@/utils/Util';
import {NgxSpinnerService} from 'ngx-spinner';
@Component({
    selector: 'app-modal-editar-digito11',
    templateUrl: './modal-editar-digito11.component.html',
    styleUrls: ['./modal-editar-digito11.component.scss']
})
export class ModalEditarDigito11Component implements OnInit {
    @Input() tituloModal: any;
    @Input() datos: any;
    form: FormGroup;

    constructor(
        public activeModal: NgbActiveModal,
        private _decoder11Service: Decoder11Service,
        private fb: FormBuilder,
        private spinner: NgxSpinnerService
    ) {
        this.form = this.fb.group({
            InputDigitoGuardado: [],
            InputDigito: [
                '',
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(10)
                ]
            ],
            InputPlantName: [
                '',
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(100)
                ]
            ]
        });
    }

    ngOnInit(): void {
        this.form.patchValue({
            InputDigitoGuardado: this.datos.cveDigito,
            InputDigito: this.datos.cveDigito,
            InputPlantName: this.datos.plantName
        });
    }

    validacionNoCaracteresEspeciales(event) {
        Util.quitarCaracteresEspeciales(event);
    }

    editar() {
        const body: any = {
            cve_digito: this.form.get('InputDigitoGuardado')?.value,
            cve_digitoNuevo: this.form.get('InputDigito')?.value,
            plantName: this.form.get('InputPlantName')?.value
        };

        if (this.form.valid) {
            this.spinner.show();
            this._decoder11Service.actualizarDigito11(body).subscribe(
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
