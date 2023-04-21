import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import bsCustomFileInput from 'bs-custom-file-input';
import { ArchivosTipoServicioService } from '@services/archivos-tipo-servicio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoServicioService } from '@services/tipo-servicio.service';
import { FuncionesArchivos } from '../FuncionesArchivos';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
    selector: 'app-modal-doc-aprobacion',
    templateUrl: './modal-doc-aprobacion.component.html',
    styleUrls: ['./modal-doc-aprobacion.component.scss']
})
export class ModalDocAprobacionComponent implements OnInit {
    @Input() tituloModal: any;
    @Input() datos: any;
    form: FormGroup;
    filesToUpload;
    descargar: boolean = false;

    constructor(
        public activeModal: NgbActiveModal,
        private _serviceSubirDocumento: ArchivosTipoServicioService,
        private _serviceTipoServicio: TipoServicioService,
        private fb: FormBuilder,
        private spinner: NgxSpinnerService,
        private _funcionesArchivo: FuncionesArchivos
    ) {
        this.form = this.fb.group({
            file: ['', [Validators.required]]
        });
    }

    ngOnInit(): void {
        if (this.datos.documentoApr) {
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
        let exArchivo = this.datos.documentoApr;
        (exArchivo = exArchivo.split('.')),
            (exArchivo = exArchivo[exArchivo.length - 1]);
        const id = this.datos.idtipoServicio;
        const tipo = 'apro.' + exArchivo;

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
        formData.append('tipo', 'apro');
        formData.append('file', this.form.get('file').value);
        if (this.form.get('file').value) {
            if (
                this.datos.estado != 'Aprobado' &&
                this.form.get('file').value
            ) {
                this._serviceSubirDocumento
                    .subirDocAprobacion(formData)
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
                            this.spinner.hide();
                            console.log(error);
                        }
                    );
            } else {
                this.spinner.hide();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El servicio ya tiene un status de aprobado!',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } else {
            this.spinner.hide();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Seleccione un archivo válido!',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
}
