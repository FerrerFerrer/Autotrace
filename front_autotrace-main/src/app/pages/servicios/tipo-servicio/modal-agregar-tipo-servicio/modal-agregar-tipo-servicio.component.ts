import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoServicioService } from '@services/tipo-servicio.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
    selector: 'app-modal-agregar-tipo-servicio',
    templateUrl: './modal-agregar-tipo-servicio.component.html',
    styleUrls: ['./modal-agregar-tipo-servicio.component.scss']
})
export class ModalAgregarTipoServicioComponent implements OnInit {
    @Input() tituloModal: any;
    form: FormGroup;

    constructor(
        public activeModal: NgbActiveModal,
        private _serviceTipoServicio: TipoServicioService,
        private spinner: NgxSpinnerService,
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            tipoServicio: [
                '',
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(100)
                ]
            ],
            estado: ['', [Validators.required]],
            esServicioSistema: ['', []],
            observaciones: ['', []],
            tarifa: ['', [Validators.required, Validators.maxLength(12)]],
            moneda: [
                '',
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(100)
                ]
            ],
            fechaExpiracion: ['', [Validators.required]]
        });
    }

    ngOnInit(): void { }

    agregar() {
        this.spinner.show();
        let esServicioSistema;
        if (this.form.get('esServicioSistema')?.value == 1) {
            esServicioSistema = 1;
        } else {
            esServicioSistema = 0;
        }

        const UsuarioData = JSON.parse(localStorage.getItem('usuario'));

        const idUsuario = UsuarioData['idusuario'];

        const body: any = {
            tipoServicio: this.form.get('tipoServicio')?.value,
            estado: this.form.get('estado')?.value,
            esServicioSistema: esServicioSistema,
            observaciones: this.form.get('observaciones')?.value,
            tarifa: this.form.get('tarifa')?.value,
            moneda: this.form.get('moneda')?.value,
            fechaExpiracion: this.form.get('fechaExpiracion')?.value,
            idUsuarioCreo: idUsuario
        };

        if (this.form.valid) {
            this._serviceTipoServicio.insertarTipoServicio(body).subscribe(
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
            this.spinner.hide();
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
