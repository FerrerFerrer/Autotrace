import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

import { LocalidadesService } from '@services/localidades.service';
import { Util } from '@/utils/Util';

@Component({
  selector: 'app-modal-agregar-localidad',
  templateUrl: './modal-agregar-localidad.component.html',
  styleUrls: ['./modal-agregar-localidad.component.scss']
})
export class ModalAgregarLocalidadComponent implements OnInit {

  @Input() tituloModal: any;
  form: FormGroup;
  IdLocalidad: FormControl;
  InputLocalidad: FormControl;

  constructor(public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder, private _localidadesService: LocalidadesService) {
  }

  ngOnInit(): void {
    this.createFormsControls();
    this.createForm();
  }

  createFormsControls() {
    this.IdLocalidad = new FormControl('', Validators.compose([
      Validators.maxLength(4),
      Validators.required
    ])),
      this.InputLocalidad = new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(3)
      ]))
  }

  createForm() {
    this.form = new FormGroup({
      IdLocalidad: this.IdLocalidad,
      InputLocalidad: this.InputLocalidad
    });
  }

  validacionNoCaracteresEspeciales(event) {
    Util.quitarCaracteresEspeciales(event);
  }

  agregar() {
    const body: any = {
      idlocalidad: this.form.get('IdLocalidad').value,
      localidad: this.form.get('InputLocalidad')?.value
    }

    if (this.form.valid) {
      this.spinner.show();
      this._localidadesService.crearLocalidad(body).subscribe((_data) => {
        this.activeModal.close();
        this.spinner.hide();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'La localidad se guardo correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      }, (error) => {
        console.log(error);
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
      });
    }
    else {
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
