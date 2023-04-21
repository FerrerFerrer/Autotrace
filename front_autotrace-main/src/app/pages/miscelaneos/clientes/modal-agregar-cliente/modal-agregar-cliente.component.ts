import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ClientesService} from '@services/clientes.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { Util } from '@/utils/Util';
@Component({
    selector: 'app-modal-agregar-cliente',
    templateUrl: './modal-agregar-cliente.component.html',
    styleUrls: ['./modal-agregar-cliente.component.scss']
})
export class ModalAgregarClienteComponent implements OnInit {
    @Input() tituloModal: any;
    form: FormGroup;
    constructor(
        public activeModal: NgbActiveModal,
        private fb: FormBuilder,
        private _serviceClientes: ClientesService,
        private spinner: NgxSpinnerService
    ) {
        this.form = this.fb.group({
            claveCliente: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.minLength(1)
                ]
            ],
            ePod: ['', [Validators.required]]
        });
    }

    ngOnInit(): void {}

    validacionNoCaracteresEspecialesNoEspacios(event) {
        Util.quitarCaracteresEspecialesNoEspacios(event);
    }

    agregar() {
        const clave = this.form.get('claveCliente')?.value;
        const ePod = this.form.get('ePod')?.value;

        if (this.form.valid) {
            this.spinner.show();
            this._serviceClientes.insertarCliente(clave, ePod).subscribe(
                (data) => {
                    this.activeModal.close();
                    this.spinner.hide();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'El cliente se se guardó correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                },
                (error) => {
                    console.log(error);
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
