import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import bsCustomFileInput from 'bs-custom-file-input';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ArchivosTipoServicioService} from '@services/archivos-tipo-servicio.service';
import {FuncionesArchivos} from '../FuncionesArchivos';
import {DepartamentosService} from '@services/departamentos.service';
import {ClientesService} from '@services/clientes.service';
import {TipoServicioService} from '@services/tipo-servicio.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
    selector: 'app-modal-doc-cotizacion',
    templateUrl: './modal-doc-cotizacion.component.html',
    styleUrls: ['./modal-doc-cotizacion.component.scss']
})
export class ModalDocCotizacionComponent implements OnInit {
    @Input() tituloModal: any;
    @Input() datos: any;
    form: FormGroup;
    descargar: boolean = false;
    listaDepartamentos: any[];
    listClientes: any[] = [];
    listActiviadades: any[] = [];
    listActiviadadesNo: any[] = [];

    tarifa = 0;
    constructor(
        public activeModal: NgbActiveModal,
        private _serviceSubirDocumento: ArchivosTipoServicioService,
        private fb: FormBuilder,
        private _funcionesArchivo: FuncionesArchivos,
        private servicioDepartamento: DepartamentosService,
        private _serviceCliente: ClientesService,
        private spinner: NgxSpinnerService,
        private servicioTipoServicio: TipoServicioService
    ) {
        this.form = this.fb.group({
            file: ['', [Validators.required]],
            actividades: [''],
            departamento: [''],
            moneda: [''],
            tarifa: [''],
            descuento: [''],
            total: ['']
        });
    }

    obtenerDepartamentos() {
        this.servicioDepartamento.getListDepartamento().subscribe((data) => {
            this.listaDepartamentos = data[0];
        });
    }

    ngOnInit(): void {
        if (this.datos.documentoCot) {
            this.descargar = true;
        }
        bsCustomFileInput.init();

        this.obtenerDepartamentos();
        this.obtenerListaClientes();

        this.form.patchValue({
            departamento: this.datos.cveDepartamento,
            moneda: this.datos.moneda,
            total: this.datos.tarifa
        });
    }

    onChange(deviceValue) {
      this.listActiviadadesNo = [];
      this.listActiviadades = [];
      console.log(deviceValue);
        this.servicioTipoServicio
            .getActiviadesXclienteNo(deviceValue, this.datos.idtipoServicio)
            .subscribe(
                (data) => {
                    this.listActiviadadesNo = data[0];
                    console.log(data[0]);
                    this.servicioTipoServicio
                        .getActiviadesXcliente(
                            deviceValue,
                            this.datos.idtipoServicio
                        )
                        .subscribe(
                            (data) => {
                                this.listActiviadades = data[0];
                                console.log(data[0]);
                            },
                            (error) => {
                                console.log(error);
                            }
                        );
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    obtenerListaClientes() {
        this._serviceCliente.getListClientes().subscribe(
            (data) => {
                this.listClientes = data[0];
            },
            (error) => {
                console.log(error);
            }
        );
    }

    fileChangeEvent(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            if (
                this._funcionesArchivo.obtenerExtencoinArchivo(file.type) ==
                    'docx' ||
                this._funcionesArchivo.obtenerExtencoinArchivo(file.type) ==
                    'doc' ||
                this._funcionesArchivo.obtenerExtencoinArchivo(file.type) ==
                    'pdf'
            ) {
                this.form.get('file').setValue(file);
            } else {
                this.form.get('file').setValue(null);
            }
        }
    }

    descargarMetodo() {
        let exArchivo = this.datos.documentoCot;
        (exArchivo = exArchivo.split('.')),
            (exArchivo = exArchivo[exArchivo.length - 1]);
        const id = this.datos.idtipoServicio;
        const tipo = 'cot.' + exArchivo;

        this._serviceSubirDocumento
            .descargarDocumentosTipoServicio(id, tipo)
            .subscribe(
                (data) => {
                    const nombre =
                        Math.random() +
                        '.' +
                        this._funcionesArchivo.obtenerExtencoinArchivo(
                            data.type
                        );
                    this._funcionesArchivo.download(data, nombre);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    calcularTotal() {
        this.calcularTarifa();
    }

    onChangeActividades() {
        this.calcularTarifa();
    }

    calcularTarifa() {
        let suma = 0;
        this.tarifa = 0;
        let actividadesArray = this.form.get('actividades')?.value;
        this.tarifa = 0;

        for (let index = 0; index < actividadesArray.length; index++) {
            const element = actividadesArray[index];

            this.tarifa = this.tarifa + this.tarifaEnLista(element);

            if (index == actividadesArray.length - 1) {
                suma = this.tarifa;
                this.tarifa =
                    this.tarifa -
                    this.tarifa * (0.01 * this.form.get('descuento')?.value);
                this.form.patchValue({
                    total: this.tarifa
                });
                this.tarifa = suma;
            }
        }
    }
    tarifaEnLista(element) {
        let encontrado = 0;
        let elementoENcontrado;

        if (this.listActiviadades.length != 0) {
            for (let index = 0; index < this.listActiviadades.length; index++) {
                const element2 = this.listActiviadades[index];
                if (element2.cveActividad == element) {
                    encontrado = 1;
                    elementoENcontrado = element2.tarifa;
                }
            }
        }

        if (encontrado == 0 && this.listActiviadadesNo.length != 0) {
            for (
                let index = 0;
                index < this.listActiviadadesNo.length;
                index++
            ) {
                const element3 = this.listActiviadadesNo[index];

                if (element3.cveActividad == element) {
                    // return element2.tarifa;
                    encontrado = 1;
                    elementoENcontrado = element3.tarifa;
                }
            }
        }

        return elementoENcontrado;
    }

    estaRegistrado(valor) {
      let encontrado = 0;
      if(this.listActiviadades.length>0){
        for (let index = 0; index < this.listActiviadades.length; index++)
        {
            const element = this.listActiviadades[index];
            if (element.cveActividad == valor) {
              encontrado = 1;
            }
            if (index == (this.listActiviadades.length - 1)) {
              return encontrado;
          }
        }
      }else{
        return 0;
      }

    }

    EliminarNoSeleccionados(array, idUsuario) {

        for (let index = 0; index < this.listActiviadades.length; index++) {
            const element = this.listActiviadades[index];
            if (
                this.encontrarEnArraySeleccionado(
                    array,
                    element.cveActividad
                ) == 0
            ) {
                // const { idtipoServicio, idUsuario } = req.body;
                const body: any = {
                    idtipoServicio: element.cveActividad,
                    idUsuario: idUsuario
                };
                this.servicioTipoServicio
                    .eliminarActividadTipoServicio(body)
                    .subscribe((data) => {
                        console.log(data);
                    });
            } else {
            }
        }
    }

    encontrarEnArraySeleccionado(array, valor) {
        let encontrado = 0;
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if (element == valor) {
                encontrado = 1;
            }
            if (index == array.length - 1) {
                return encontrado;
            }
        }
    }

    subir() {
        this.spinner.show();
        const formData = new FormData();
        formData.append('id', this.datos.idtipoServicio);
        formData.append('tipo', 'cot');
        formData.append('file', this.form.get('file').value);

        let actividadesArray = this.form.get('actividades')?.value;

        const UsuarioData = JSON.parse(localStorage.getItem('usuario'));

        const idUsuario = UsuarioData['idusuario'];
        if (this.form.get('file').value) {
            if (
                this.datos.estado != 'Aprobado' &&
                this.form.get('file').value
            ) {
                this._serviceSubirDocumento
                    .subirDocCotizacion(formData)
                    .subscribe(
                        (data) => {
                            this.EliminarNoSeleccionados(
                                actividadesArray,
                                idUsuario
                            );

                            for (
                                let index = 0;
                                index < actividadesArray.length;
                                index++
                            ) {
                                const element = actividadesArray[index];
                                console.log(element);
                                console.log(this.estaRegistrado(element));

                                if (this.estaRegistrado(element) == 0) {
                                    const body: any = {
                                        pa_idtipoServicio:
                                            this.datos.idtipoServicio,
                                        pa_cveActividad: element
                                    };

                                    this.servicioTipoServicio
                                        .insertarActividadTipoServicio(body)
                                        .subscribe(
                                            (data) => {console.log('Se inserto dato en actividad tipo servicio')},
                                            (error) => {
                                                console.log(error);
                                            }
                                        );
                                }
                            }

                            const body2: any = {
                                pa_idtipoServicio: this.datos.idtipoServicio,
                                pa_cveDepartamento:
                                    this.form.get('departamento')?.value,
                                pa_moneda: this.form.get('moneda')?.value,
                                pa_tarifa: this.form.get('total')?.value,
                                pa_idusuario: idUsuario
                            };

                            this.servicioTipoServicio
                                .actualizarCotizacionServicio(body2)
                                .subscribe(
                                    (data) => {
                                        console.log('actualizacion exitosa');
                                    },
                                    (error) => {
                                        console.log(error);
                                    }
                                );

                            this.activeModal.close();
                            this.spinner.hide();
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Se seguardó correctamente',
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
                this.spinner.hide();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El servicio ya tiene un estado de aprobado!',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } else {
            this.spinner.hide();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Seleccione un archivo!',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
}
