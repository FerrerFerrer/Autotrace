import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoServicioService } from '@services/tipo-servicio.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
    selector: 'app-modal-cambiar-estado-servicio',
    templateUrl: './modal-cambiar-estado-servicio.component.html',
    styleUrls: ['./modal-cambiar-estado-servicio.component.scss']
})
export class ModalCambiarEstadoServicioComponent
    implements OnInit, AfterViewInit {
    @Input() tituloModal: any;
    @Input() datos: any;
    form: FormGroup;
    estadoSiguiente: any;
    mostrar;
    cambiarEstadoVal;
    constructor(
        public activeModal: NgbActiveModal,
        private _serviceTipoServicio: TipoServicioService,
        private spinner: NgxSpinnerService,
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            estado: ['', [Validators.required]]
        });
    }
    ngAfterViewInit(): void { }

    ngOnInit(): void {
        this.obtenerEstadoSiguiente();
    }

    obtenerEstadoSiguiente() {
        this.spinner.show();
        const UsuarioData = JSON.parse(localStorage.getItem('usuario'));

        const idUsuario = UsuarioData['idusuario'];

        this._serviceTipoServicio
            .obtenerEstadoSiguiente(this.datos.idtipoServicio, idUsuario)
            .subscribe(
                (data) => {
                    this.estadoSiguiente = data[0];
                    this.mostrar = this.estadoSiguiente[0].estadoSiguiente;
                    this.cambiarEstadoVal =
                        this.estadoSiguiente[0].cambiarEstado;
                    this.spinner.hide();
                },
                (error) => {
                    this.spinner.hide();
                    console.log(error);
                }
            );
    }

    cambiarEstado() {
        this.spinner.show();
        const body: any = {
            idtipoServicio: this.datos.idtipoServicio,
            estado: this.mostrar
        };

        this._serviceTipoServicio
            .actualizarEstadoTipoServicio(body)
            .subscribe(
                (data) => {
                    this.activeModal.close();
                    this.spinner.hide();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Datos actualizados correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                },
                (error) => {
                    this.spinner.hide();
                    console.log(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            );

    }
}
