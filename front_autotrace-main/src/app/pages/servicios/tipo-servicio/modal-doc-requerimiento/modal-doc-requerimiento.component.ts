import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import bsCustomFileInput from 'bs-custom-file-input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArchivosTipoServicioService } from '@services/archivos-tipo-servicio.service';
import { FuncionesArchivos } from '../FuncionesArchivos';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
    selector: 'app-modal-doc-requerimiento',
    templateUrl: './modal-doc-requerimiento.component.html',
    styleUrls: ['./modal-doc-requerimiento.component.scss']
})
export class ModalDocRequerimientoComponent implements OnInit {
    @Input() tituloModal: any;
    @Input() datos: any;
    form: FormGroup;
    descargar: boolean = false;

    constructor(
        public activeModal: NgbActiveModal,
        private _serviceSubirDocumento: ArchivosTipoServicioService,
        private fb: FormBuilder,
        private _funcionesArchivo: FuncionesArchivos,
        private spinner: NgxSpinnerService
    ) {
        this.form = this.fb.group({
            file: ['', [Validators.required]]
        });
    }

    ngOnInit(): void {
        if (this.datos.documentoReq) {
            this.descargar = true;
        }
        bsCustomFileInput.init();
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
        let exArchivo = this.datos.documentoReq;
        (exArchivo = exArchivo.split('.')),
            (exArchivo = exArchivo[exArchivo.length - 1]);
        const id = this.datos.idtipoServicio;
        const tipo = 'req.' + exArchivo;

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


    subir() {
        this.spinner.show();
        const formData = new FormData();
        formData.append('id', this.datos.idtipoServicio);
        formData.append('tipo', 'req');
        formData.append('file', this.form.get('file').value);
        if (this.form.get('file').value) {
            if (
                this.datos.estado != 'Aprobado' &&
                this.form.get('file').value
            ) {
                this._serviceSubirDocumento
                    .subirDocRequerimientos(formData)
                    .subscribe(
                        (data) => {
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
                            console.log(error);
                        }
                    );
            } else {
                this.spinner.hide();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El servicio ya tiene un estado aprobado!',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } else {
            this.spinner.hide();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Seleccione un archivo',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
}
