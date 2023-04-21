import {Component, Input, OnInit} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {EmpleadosService} from '@services/empleados.service';
import {LocalidadesService} from '@services/localidades.service';
import {RolserviceService} from '@services/rolservice.service';
import {UsuarioServiceService} from '@services/usuario-service.service';
import Swal from 'sweetalert2';
import {Util} from '@/utils/Util';
import {NgxSpinnerService} from 'ngx-spinner';
@Component({
    selector: 'app-modal-agregar-usuario',
    templateUrl: './modal-agregar-usuario.component.html',
    styleUrls: ['./modal-agregar-usuario.component.scss']
})
export class ModalAgregarUsuarioComponent implements OnInit {
    @Input() tituloModal: any;

    form: FormGroup;
    listaRoles: any[];
    localidades: any[];
    NoValido: boolean = false;
    PassNoValida: boolean = false;
    idusauriouso;
    longPass: boolean = false;
    test = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
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
            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(16),
                    Util.patternValidator(/\d/, {hasNumber: true}),
                    Util.patternValidator(/[A-Z]/, {hasCapitalCase: true}),
                    Util.patternValidator(/[a-z]/, {hasSmallCase: true}),
                    Util.patternValidator(/[!"?@#$%^&'*()[\]_+-./:;<=>`{}~]/, {
                        hasSpecialCharacters: true
                    })
                ]
            ],
            passwordconfirm: [
                '',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(16),
                    Util.patternValidator(/\d/, {hasNumber: true}),
                    Util.patternValidator(/[A-Z]/, {hasCapitalCase: true}),
                    Util.patternValidator(/[a-z]/, {hasSmallCase: true}),
                    Util.patternValidator(/[!"?@#$%^&'*()[\]_+-./:;<=>`{}~]/, {
                        hasSpecialCharacters: true
                    })
                ]
            ],
            numempleado: [
                '',
                [Validators.minLength(1), Validators.maxLength(30)]
            ],
            email: [
                '',
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(100),
                    Util.patternValidator(this.test, {hasCorreo: true})
                ]
            ],
            operativo: ['', [Validators.required]],
            listacorreo: [''],
            localidades: ['', [Validators.required]]
        });
    }

    ngOnInit(): void {
        this.obtenerRoles();
        this.obtenerLocalidades();
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

    validacionNoCaracteresEspeciales(event) {
        Util.quitarCaracteresEspeciales(event);
    }

    validarNumeroEmpleado(event:any) {
        let valor = event.target.value;

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
              this.NoValido = true;
              this.idusauriouso = null;
            }
        );
    }

    validarPassword() {
        console.log(this.form.get('password').errors);
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

    agregar() {
        let final: any[] = [];

        const localidades = this.form.get('localidades')?.value;
        let listaCorreo;
        if (this.form.get('listacorreo')?.value == 1) {
            listaCorreo = 1;
        } else {
            listaCorreo = 0;
        }
        if (
            this.form.valid &&
            this.form.get('password')?.value == this.form.get('password')?.value
        ) {
            if (this.NoValido) {
                const body: any = {
                    idusuario: this.form.get('idusuario')?.value,
                    idrol: this.form.get('idrol')?.value,
                    usuario: this.form.get('usuario')?.value,
                    password: this.form.get('passwordconfirm')?.value,
                    email: this.form.get('email')?.value,
                    operativo: this.form.get('operativo')?.value,
                    listaCorreo: listaCorreo,
                    cveEmpleado: 'vacio'
                };
                final = body;
            } else {
                const body2: any = {
                    idusuario: this.form.get('idusuario')?.value,
                    idrol: this.form.get('idrol')?.value,
                    usuario: this.form.get('usuario')?.value,
                    password: this.form.get('passwordconfirm')?.value,
                    email: this.form.get('email')?.value,
                    operativo: this.form.get('operativo')?.value,
                    listaCorreo: listaCorreo,
                    cveEmpleado: this.form.get('numempleado')?.value
                };
                final = body2;
            }
            this.spinner.show();
            this._serviceUsaurios.insertarUsuario(final).subscribe(
                (data) => {
                    for (let index = 0; index < localidades.length; index++) {
                        const element = localidades[index];
                        const bodylocalidad: any = {
                            idusuario: this.form.get('idusuario')?.value,
                            idlocalidad: element
                        };

                        this._serviceUsaurios
                            .insertarLocalidadUsuario(bodylocalidad)
                            .subscribe(
                                (data) => {},
                                (error) => {
                                    console.log(error);
                                }
                            );
                    }
                    this.spinner.hide();
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
