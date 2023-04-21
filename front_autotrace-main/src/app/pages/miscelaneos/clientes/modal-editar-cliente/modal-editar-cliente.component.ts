import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ClientesService} from '@services/clientes.service';
import { Util } from '@/utils/Util';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner"; //Importancion del spinner

@Component({
    selector: 'app-modal-editar-cliente',
    templateUrl: './modal-editar-cliente.component.html',
    styleUrls: ['./modal-editar-cliente.component.scss']
})
export class ModalEditarClienteComponent implements OnInit {
    @Input() tituloModal: any;
    @Input() datos: any;
    form: FormGroup;

    constructor(
        public activeModal: NgbActiveModal,
        private fb: FormBuilder,
        private _serviceCliente: ClientesService,
        private spinner: NgxSpinnerService //Injeccion del spinner
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
            ePod: ['', [Validators.required]],
            activo: ['', [Validators.required]]
        });
    }

    ngOnInit(): void {
        this.form.patchValue({
            claveCliente: this.datos.cliente,
            ePod: (this.datos.transferir_ePoD === "Si") ? 1: 0,
            activo: this.datos.activo
        });
    }

    validacionNoCaracteresEspecialesNoEspacios(event) {
        Util.quitarCaracteresEspecialesNoEspacios(event);
    }

    editar() {
        const clave = this.form.get('claveCliente')?.value;
        let ePod:number;
        let activo:number;

        if (this.form.get('activo')?.value == 'Si') {
            activo = 1;
        }else{
            activo = 0;
        }

        if (this.form.get('ePod')?.value == 'Si') {
            ePod = 1;
        }else{
            ePod = 0;
        }

        if (this.form.valid) {
            this.spinner.show();//Se activa el spinner
            this._serviceCliente
                .insertarActualizarCliente(
                    this.datos.idcliente,
                    clave,
                    ePod,
                    activo
                )
                .subscribe(
                    (data) => {
                        this.activeModal.close();
                        this.spinner.hide();//Se oculta el spinner
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Se Actualizó correctamente',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    },
                    (error) => {
                        this.spinner.hide();//Se oculta el spinner
                        console.log(error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Ha ocurrido un ereror',
                            text: 'Intente de nuevo',
                            showConfirmButton: true,
                            timer: 1500
                        });
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
