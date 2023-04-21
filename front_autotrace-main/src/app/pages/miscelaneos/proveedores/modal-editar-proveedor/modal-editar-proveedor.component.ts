import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

import {ClientesService} from '@services/clientes.service';
import {ProveedoresService} from '@services/proveedores.service';
import {Util} from '@/utils/Util';
import {NgxSpinnerService} from 'ngx-spinner';
@Component({
    selector: 'app-modal-editar-proveedor',
    templateUrl: './modal-editar-proveedor.component.html',
    styleUrls: ['./modal-editar-proveedor.component.scss']
})
export class ModalEditarProveedorComponent implements OnInit {
    listClientes: any[] = [];
    form: FormGroup;
    @Input() tituloModal: any;
    @Input() datos: any;

    constructor(
        public activeModal: NgbActiveModal,
        private fb: FormBuilder,
        private _clientesService: ClientesService,
        private _proveedoresService: ProveedoresService,
        private spinner: NgxSpinnerService
    ) {
        this.form = this.fb.group({
            InputIdProveedor: [],
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

    ngOnInit(): void {
        this.obtenerClientes();

        this.form.patchValue({
            InputIdProveedor: this.datos.idproveedor,
            InputNombre: this.datos.nombre,
            InputIdCliente: this.datos.idcliente,
            InputCodigoSPLC: this.datos.codigoSPLC
        });

        this.form.controls['InputIdProveedor'].disable();
    }
    validacionNoCaracteresEspeciales(event) {
        Util.quitarCaracteresEspeciales(event);
    }
    editar() {
        const body: any = {
            nombre: this.form.get('InputNombre')?.value,
            idcliente: this.form.get('InputIdCliente')?.value,
            codigoSPLC: this.form.get('InputCodigoSPLC')?.value
        };

        let id: number = this.form.get('InputIdProveedor').value;

        if (this.form.valid) {
            this.spinner.show();
            this._proveedoresService.updateProveedor(id, body).subscribe(
                (data) => {
                    this.activeModal.close();
                    this.spinner.hide();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'La localidad se modifico correctamente',
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
