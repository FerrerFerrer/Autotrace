import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HerramientasService } from '@services/herramientas.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-modal-editar-herramienta',
  templateUrl: './modal-editar-herramienta.component.html',
  styleUrls: ['./modal-editar-herramienta.component.scss']
})
export class ModalEditarHerramientaComponent implements OnInit {

  @Input() tituloModal: any;
  @Input() datos: any;
  form: FormGroup;

  constructor(public activeModal: NgbActiveModal,
    private _herramientaService : HerramientasService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder) {
      this.form = this.fb.group({
        InputClaveGuardado: [],
        InputClave: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
        InputNombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
        InputActivo: ['', [Validators.required]],
        InputComentario: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      });
    }

  ngOnInit(): void {
    this.form.patchValue({
      InputClave: this.datos.cveHerramienta,
      InputClaveGuardado: this.datos.cveHerramienta,
      InputNombre: this.datos.nombre,
      InputActivo: (this.datos.activo === "Si" ? 1 : 0),
      InputComentario: this.datos.comentario
    });
  }

  editar() {
    const body = {
      cveHerramienta: this.form.get('InputClaveGuardado').value,
      cveHerramientaNuevo: this.form.get('InputClave').value,
      nombre: this.form.get('InputNombre').value,
      comentario: this.form.get('InputComentario')?.value,
      activo: this.form.get('InputActivo').value
    }

    if (this.form.valid) {
      this.spinner.show();
      this._herramientaService.updateHerramienta(body).subscribe((data) => {
        this.activeModal.close();
        this.spinner.hide();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'La herramienta se actualizo correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      },(error) => {
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
