import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoServicioService } from '@services/tipo-servicio.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-modal-editar-tipo-servicio',
    templateUrl: './modal-editar-tipo-servicio.component.html',
    styleUrls: ['./modal-editar-tipo-servicio.component.scss']
})
export class ModalEditarTipoServicioComponent implements OnInit {
    @Input() tituloModal: any;
    @Input() datos: any;
    form: FormGroup;
    constructor(
        public activeModal: NgbActiveModal,
        private _serviceTipoServicio: TipoServicioService,
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

    ngOnInit(): void {
        console.log(this.datos);

        const date = new Date(this.datos.fechaExpiracion);

        let year = date.getFullYear();
        let month = (date.getMonth() + 1);
        let dt = date.getDate();
        let dia = dt.toString();
        let mes = month.toString();
        if (dt < 10) {
            dia = '0' + dt;
        }
        if (month < 10) {
            mes = '0' + month;
        }
        const fecha = year + '-' + mes + '-' + dia;

        this.form.patchValue({
            tipoServicio: this.datos.tipoServicio,
            estado: this.datos.estado,
            observaciones: this.datos.observaciones,
            tarifa: this.datos.tarifa,
            moneda: this.datos.moneda,
            fechaExpiracion: fecha
        });

        if (this.datos.esServicioSistema.data == 1) {
            this.form.patchValue({
                esServicioSistema: 1
            });
        }
    }

    editar() {

        let esServicioSistema;
        if (this.form.get('esServicioSistema')?.value == 1) {
            esServicioSistema = 1;
        } else {
            esServicioSistema = 0;
        }


        const body: any = {
            idtipoServicio: this.datos.idtipoServicio,
            tipoServicio: this.form.get('tipoServicio')?.value,
            estado: this.form.get('estado')?.value,
            esServicioSistema: esServicioSistema,
            observaciones: this.form.get('observaciones')?.value,
            tarifa: this.form.get('tarifa')?.value,
            moneda: this.form.get('moneda')?.value,
            fechaExpiracion: this.form.get('fechaExpiracion')?.value,
            idUsuarioCreo: this.datos.idUsuarioCreo
        };

        if (this.form.valid) {
            this._serviceTipoServicio.actualizarTipoServicio(body).subscribe(
                (data) => {
                    this.activeModal.close();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Datos actualizados correctamente',
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
