import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {NgxSpinnerService} from 'ngx-spinner'; //Importancion del spinner
import {VinService} from '@services/vin.service';
@Component({
    selector: 'app-modal-editar-fecha-ingreso',
    templateUrl: './modal-editar-fecha-ingreso.component.html',
    styleUrls: ['./modal-editar-fecha-ingreso.component.scss']
})
export class ModalEditarFechaIngresoComponent implements OnInit {
    @Input() tituloModal: any;
    @Input() datos: any;
    form: FormGroup;

    constructor(
        public activeModal: NgbActiveModal,
        private fb: FormBuilder,
        private _serviceVin: VinService,
        private spinner: NgxSpinnerService //Injeccion del spinner
    ) {
        this.form = this.fb.group({
            fecha: ['', [Validators.required, Validators.minLength(1)]],
            hora: ['', [Validators.required, Validators.minLength(1)]]
        });
    }

    ngOnInit(): void {}

    editar() {
        const fecha = this.form.get('fecha')?.value;
        const hora = this.form.get('hora')?.value;
        const fechaHora = fecha + ' ' + hora;

        this.activeModal.close();
        this.spinner.show();
        this.datos.forEach((element) => {
            const body = {
                vin: element.vinCode,
                fechaIngreso: fechaHora
            };

            this._serviceVin.fechaIngreso(body).subscribe(
                (datos) => {

                },
                (error) => {
                    console.log(error);
                }
            );
        });
        this.spinner.hide();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se actualizó la fecha correctamente',
            showConfirmButton: false,
            timer: 1500,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            }
        });

        /**
     *
     * Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Algo salió mal!',
    })
     */
    }
}
