import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Util} from '@/utils/Util';
import {NgxSpinnerService} from 'ngx-spinner';
import { TipoInventarioService } from '@services/tipo-inventario.service';
@Component({
    selector: 'app-modal-agregar-tipo-inventario',
    templateUrl: './modal-agregar-tipo-inventario.component.html',
    styleUrls: ['./modal-agregar-tipo-inventario.component.scss']
})
export class ModalAgregarTipoInventarioComponent implements OnInit {
    @Input() tituloModal: any;
    form: FormGroup;

    constructor(
        public activeModal: NgbActiveModal,
        private fb: FormBuilder,
        private _tipoInventarioService: TipoInventarioService,
        private spinner: NgxSpinnerService
    ) {
        this.form = this.fb.group({
            InputClave: [
                '',
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(4)
                ]
            ],
            InputDescripcion: [
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
        const body = {
            cveTipoInventario: this.form.get('InputClave').value,
            descripcion: this.form.get('InputDescripcion').value,
            activo: 1
        };

        if (this.form.valid) {
            this.spinner.show();
            this._tipoInventarioService.crearTipoInventario(body).subscribe(
                (data) => {
                    this.activeModal.close();
                    this.spinner.hide();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'El Tipo de Inventario se guardo correctamente',
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
