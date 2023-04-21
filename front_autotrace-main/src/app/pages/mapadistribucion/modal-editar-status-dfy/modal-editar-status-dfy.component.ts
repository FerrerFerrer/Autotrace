import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {VinService} from '@services/vin.service';
import {NgxSpinnerService} from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-modal-editar-status-dfy',
    templateUrl: './modal-editar-status-dfy.component.html',
    styleUrls: ['./modal-editar-status-dfy.component.scss']
})
export class ModalEditarStatusDfyComponent implements OnInit {
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
            estadoDFY: ['', [Validators.required, Validators.minLength(1)]]
        });
    }

    ngOnInit(): void {

    }

    editar() {
        const statusDFY = this.form.get('estadoDFY')?.value;

        if (this.form.valid) {
            if (this.datos.length > 0) {
                this.spinner.show();
                this.datos.forEach((element) => {
                    const body = {
                      idServicio: element.idservicio,
                        statusDFY: statusDFY
                    };
                    this._serviceVin.updateStatusDFY(body).subscribe(
                        (datos) => {},
                        (error) => {
                            console.log(error);
                        }
                    );
                });
                this.activeModal.close();

                this.spinner.hide();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'El Estado DFY se guardó correctamente',
                    showConfirmButton: false,
                    timer: 1500,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    }
                });
            }
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Seleccione una opcion!!',
                showConfirmButton: false,
                timer: 1500,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                }
            });
        }
    }
}
