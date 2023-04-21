import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EstadoprocesoService } from '@services/estadoproceso.service';
import { UsuarioServiceService } from '@services/usuario-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-modal-editar-estado-proceso',
    templateUrl: './modal-editar-estado-proceso.component.html',
    styleUrls: ['./modal-editar-estado-proceso.component.scss']
})
export class ModalEditarEstadoProcesoComponent implements OnInit {
    @Input() tituloModal: any;
    @Input() datos: any;
    form: FormGroup;
    estadoProceso = [];
    user: any = null;

    constructor(
        public activeModal: NgbActiveModal,
        private fb: FormBuilder,
        private _serviceEstadoProceso: EstadoprocesoService,
        private spinner: NgxSpinnerService //Injeccion del spinner,
        ,private _userService: UsuarioServiceService,
    ) {
        this.form = this.fb.group({
            estadoProceso: ['', [Validators.required, Validators.minLength(1)]]
        });
    }

    listarEstadoProceso() {
        this._serviceEstadoProceso.getListEstadoProceso().subscribe(
            (datos) => {
                this.estadoProceso = datos;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    ngOnInit(): void {
        this.listarEstadoProceso();
        console.log(this.datos);
    }

    editar() {
        this.user=this._userService.getCurrentUser();

        const estadoProceso = this.form.get('estadoProceso')?.value;

        if (this.form.valid) {
            this.activeModal.close();

            if (this.datos.length > 0) {

                this.spinner.show();
                this.datos.forEach((element) => {
                    const body = {
                        vin: element.vinCode,
                        estadoProceso: estadoProceso,
                        idUsuario:this.user.idusuario,
                        idServicio:element.idservicio
                    };
                    this._serviceEstadoProceso.updateEstadoProceso(body).subscribe(
                        (datos) => {

                        },
                        (error) => {
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: 'Error',
                                text: error.error.message,
                                showConfirmButton: true,
                               // timer: 2500,
                                showClass: {
                                    popup: 'animate__animated animate__fadeInDown'
                                }
                            });
                            console.log(error);
                            console.log(error.error.message);
                        }
                    );
                });

                this.spinner.hide();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'El Estado Proceso se guardó correctamente',
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
