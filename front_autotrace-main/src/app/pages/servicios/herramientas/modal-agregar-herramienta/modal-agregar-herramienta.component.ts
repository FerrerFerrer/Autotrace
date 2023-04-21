import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HerramientasService } from '@services/herramientas.service';

@Component({
  selector: 'app-modal-agregar-herramienta',
  templateUrl: './modal-agregar-herramienta.component.html',
  styleUrls: ['./modal-agregar-herramienta.component.scss']
})
export class ModalAgregarHerramientaComponent implements OnInit {

  @Input() tituloModal: any;
  form: FormGroup;

  constructor(public activeModal: NgbActiveModal,
    private _herramientaService : HerramientasService,
    private fb: FormBuilder) {
      this.form = this.fb.group({
        InputClave: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
        InputNombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
        InputActivo: ['', [Validators.required]],
        InputComentario: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      });
    }

  ngOnInit(): void {
  }

  agregar() {
    const body = {
      cveHerramienta: this.form.get('InputClave').value,
      nombre: this.form.get('InputNombre').value,
      comentario: this.form.get('InputComentario')?.value,
      activo: this.form.get('InputActivo').value
    }

    if (this.form.valid) {
      this._herramientaService.crearHerramienta(body).subscribe((data) => {
        this.activeModal.close();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'La herramienta se guardo correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      },(error) => {
        console.log(error);
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
