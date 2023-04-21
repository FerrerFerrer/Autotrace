import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {EmpleadosService} from '@services/empleados.service';
import {LocalidadesService} from '@services/localidades.service';
import {RolserviceService} from '@services/rolservice.service';
import {UsuarioServiceService} from '@services/usuario-service.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { Util } from '@/utils/Util';
@Component({
    selector: 'app-modal-editar-usuario',
    templateUrl: './modal-editar-usuario.component.html',
    styleUrls: ['./modal-editar-usuario.component.scss']
})
export class ModalEditarUsuarioComponent implements OnInit {
    @Input() tituloModal: any;
    @Input() datos: any;

    form: FormGroup;
    listaRoles: any[];
    localidades: any[];
    NoValido: boolean = false;
    PassNoValida: boolean = false;
    idusauriouso;
    longPass: boolean = false;
    Exprecion=/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
    constructor(
        public activeModal: NgbActiveModal,
        private fb: FormBuilder,
        private _serviceUsaurios: UsuarioServiceService,
        private _ServiceRol: RolserviceService,
        private _localidadesService: LocalidadesService,
        private _empleadoService: EmpleadosService,
        private spinner: NgxSpinnerService
    ) {
        this.form = this.fb.group({
            idusuario: [
                '',
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(10)
                ]
            ],
            idrol: ['', [Validators.required]],
            usuario: [
                '',
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(200)
                ]
            ],
            password: ['', [Validators.minLength(8),                    Validators.maxLength(16),
              Util.patternValidator(/\d/, { hasNumber: true }),
              Util.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
              Util.patternValidator(/[a-z]/, { hasSmallCase: true }),
              Util.patternValidator(/[!"?@#$%^&'*()[\]_+-./:;<=>`{}~]/, { hasSpecialCharacters: true })
            ]],
            passwordconfirm: [
                '',
                [
                  Validators.minLength(8),
                  Validators.maxLength(16),
                  Util.patternValidator(/\d/, { hasNumber: true }),
                  Util.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
                  Util.patternValidator(/[a-z]/, { hasSmallCase: true }),
                  Util.patternValidator(/[!"?@#$%^&'*()[\]_+-./:;<=>`{}~]/, { hasSpecialCharacters: true })]
            ],
            numempleado: [
                '',
                [Validators.minLength(1), Validators.maxLength(6)]
            ],
            email: [
                '',
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(100),
                    Util.patternValidator(this.Exprecion, {hasCorreo:true})
                ]
            ],
            operativo: ['', [Validators.required]],
            listacorreo: ['']
        });
    }

    ngOnInit(): void {

        this.form.patchValue({
            idusuario: this.datos.idusuario,
            usuario: this.datos.usuario,
            idrol: this.datos.idrol,
            email: this.datos.email,
            numempleado: this.datos.cveEmpleado,
            operativo: this.datos.operativo
        });
        if (this.datos.listaCorreo == 1) {
            this.form.patchValue({
                listacorreo: 1
            });
        }



        this.obtenerRoles();
    }
    validacionNoCaracteresEspeciales(event) {
      Util.quitarCaracteresEspeciales(event);
    }
    public obtenerRoles() {
        this._ServiceRol.getLisRol().subscribe(
            (data) => {
                this.listaRoles = data[0];
            },
            (error) => {
                console.log(error);
            }
        );
    }

    validarNumeroEmpleado() {
        let valor = this.form.get('numempleado')?.value;
        if (!valor) {
            valor = 'null';
        }
        this._empleadoService.buscarEmpleadoEspecifico(String(valor)).subscribe(
            (data) => {
                const empleado = data[0];
                if (data[0].length > 0) {
                    if (empleado[0]['idusuario']) {
                        this.NoValido = true;
                        this.idusauriouso =
                            ', En uso Por Usuario ' + empleado[0]['idusuario'];
                    } else {
                        this.NoValido = false;
                    }
                } else {
                    this.NoValido = true;
                    this.idusauriouso = null;
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }

    validarPassword() {
        if (
            this.form.get('password')?.value ==
            this.form.get('passwordconfirm')?.value
        ) {
            this.PassNoValida = false;
        } else {
            this.PassNoValida = true;
        }

        if (
            (this.form.get('password')?.value).length < 8 ||
            (this.form.get('passwordconfirm')?.value).length < 8
        ) {
            this.longPass = true;
        } else {
            if (
                (this.form.get('password')?.value).length >= 8 &&
                (this.form.get('passwordconfirm')?.value).length >= 8
            ) {
                this.longPass = false;
            }
        }
    }

    editar() {
        let final: any[] = [];

        let listaCorreo;
        if (this.form.get('listacorreo')?.value == 1) {
            listaCorreo = 1;
        } else {
            listaCorreo = 0;
        }
        let Passfinal;
        if (this.form.get('password')?.value) {
            Passfinal = 1;
        } else {
            Passfinal = 0;
        }

        if (
            this.form.valid &&
            this.form.get('password')?.value == this.form.get('password')?.value
        ) {
            if (this.NoValido) {
                const body: any = {
                    idusuario: this.datos.idusuario,
                    idusuarioNuevo: this.form.get('idusuario')?.value,
                    idrol: this.form.get('idrol')?.value,
                    usuario: this.form.get('usuario')?.value,
                    password: this.form.get('passwordconfirm')?.value,
                    email: this.form.get('email')?.value,
                    operativo: this.form.get('operativo')?.value,
                    listaCorreo: listaCorreo,
                    cveEmpleado: 'vacio',
                    passAnterior: this.datos.password,
                    passdiferente: Passfinal
                };
                final = body;
            } else {
                const body2: any = {
                    idusuario: this.datos.idusuario,
                    idusuarioNuevo: this.form.get('idusuario')?.value,
                    idrol: this.form.get('idrol')?.value,
                    usuario: this.form.get('usuario')?.value,
                    password: this.form.get('passwordconfirm')?.value,
                    email: this.form.get('email')?.value,
                    operativo: this.form.get('operativo')?.value,
                    listaCorreo: listaCorreo,
                    cveEmpleado: this.form.get('numempleado')?.value,
                    passAnterior: this.datos.password,
                    passdiferente: Passfinal
                };
                final = body2;
            }
            this.spinner.show();
            this._serviceUsaurios.actualizarUsuario(final).subscribe(
                (data) => {
                  this.spinner.hide();//Se oculta el spinner
                    this.activeModal.close();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Datos guardados correctamente',
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
}
