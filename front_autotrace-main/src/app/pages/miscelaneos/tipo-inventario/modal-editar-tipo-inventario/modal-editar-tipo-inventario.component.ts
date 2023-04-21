import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Util} from '@/utils/Util';
import {NgxSpinnerService} from 'ngx-spinner';
import {TipoInventarioService} from '@services/tipo-inventario.service';
@Component({
    selector: 'app-modal-editar-tipo-inventario',
    templateUrl: './modal-editar-tipo-inventario.component.html',
    styleUrls: ['./modal-editar-tipo-inventario.component.scss']
})
export class ModalEditarTipoInventarioComponent implements OnInit {
    @Input() tituloModal: any;
    @Input() datos: any;
    form: FormGroup;

    constructor(
        public activeModal: NgbActiveModal,
        private fb: FormBuilder,
        private _tipoInventarioService: TipoInventarioService,
        private spinner: NgxSpinnerService
    ) {
        this.form = this.fb.group({
            InputClaveGuardado: [],
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
            ],
            InputActivo: ['', [Validators.required]]
        });
    }

    ngOnInit(): void {
        this.form.patchValue({
            InputClave: this.datos.cveTipoInventario,
            InputClaveGuardado: this.datos.cveTipoInventario,
            InputDescripcion: this.datos.descripcion,
            InputActivo: this.datos.activo === 'SI' ? 1 : 0
        });
    }

    validacionNoCaracteresEspeciales(event) {
        Util.quitarCaracteresEspeciales(event);
    }

    editar() {
        const body = {
            cveTipoInventario: this.form.get('InputClaveGuardado').value,
            cveTipoInventarioNuevo: this.form.get('InputClave').value,
            descripcion: this.form.get('InputDescripcion').value,
            activo: this.form.get('InputActivo').value
        };

        if (this.form.valid) {
            this.spinner.show();
            this._tipoInventarioService.updateTipoInventario(body).subscribe(
                (data) => {
                    this.activeModal.close();
                    this.spinner.hide();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'El Tipo de Inventario se modifico correctamente',
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
