import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

import {ClientesService} from '@services/clientes.service';
import {ProveedoresService} from '@services/proveedores.service';
import {LocalidadesService} from '@services/localidades.service';
import {Util} from '@/utils/Util';
import {NgxSpinnerService} from 'ngx-spinner';
@Component({
    selector: 'app-modal-agregar-proveedor',
    templateUrl: './modal-agregar-proveedor.component.html',
    styleUrls: ['./modal-agregar-proveedor.component.scss']
})
export class ModalAgregarProveedorComponent implements OnInit {
    listClientes: any[] = [];
    localidades: any[];
    form: FormGroup;
    @Input() tituloModal: any;

    constructor(
        public activeModal: NgbActiveModal,
        private fb: FormBuilder,
        private _clientesService: ClientesService,
        private _proveedoresService: ProveedoresService,
        private _localidadesService: LocalidadesService,
        private spinner: NgxSpinnerService
    ) {
        this.form = this.fb.group({
            InputNombre: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(100),
                    Validators.minLength(3)
                ]
            ],
            InputIdCliente: ['', Validators.required],
            InputCodigoSPLC: ['', Validators.maxLength(20)]
        });
    }
    validacionNoCaracteresEspeciales(event) {
        Util.quitarCaracteresEspeciales(event);
    }
    ngOnInit(): void {
        this.obtenerClientes();
        this.obtenerLocalidades();
    }

    public obtenerLocalidades() {
        this._localidadesService.getListLocalidades().subscribe(
            (data) => {
                this.localidades = data[0];
            },
            (error) => {
                console.log(error);
            }
        );
    }

    agregar() {
        const body: any = {
            nombre: this.form.get('InputNombre')?.value,
            idcliente: this.form.get('InputIdCliente')?.value,
            codigoSPLC: this.form.get('InputCodigoSPLC')?.value
        };

        if (this.form.valid) {
            this.spinner.show();
            this._proveedoresService.crearProveedor(body).subscribe(
                (data) => {
                    this.activeModal.close();
                    this.spinner.hide();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'El Proveedor se guardo correctamente',
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

    obtenerClientes() {
        this._clientesService.getListClientes().subscribe((data) => {
            this.listClientes = data[0];
        });
    }
}
