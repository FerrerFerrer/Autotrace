import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VinService } from '@services/vin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-editar-status-vitims',
  templateUrl: './modal-editar-status-vitims.component.html',
  styleUrls: ['./modal-editar-status-vitims.component.scss']
})
export class ModalEditarStatusVitimsComponent implements OnInit {

  @Input() tituloModal: any;
  @Input() datos: any;
  form: FormGroup;


  constructor(public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private _serviceVin: VinService,
    private spinner: NgxSpinnerService //Injeccion del spinner
    ) {

      this.form = this.fb.group({
        estadoVTIMS: ['', [Validators.required, Validators.minLength(1)]]
    });

    }

  ngOnInit(): void {
  }

  editar() {

    const statusVtims = this.form.get('estadoVTIMS')?.value;

    if (this.form.valid) {
        if (this.datos.length > 0) {
            this.spinner.show();
            this.datos.forEach((element) => {
                const body = {
                  idServicio: element.idservicio,
                  statusVtims: statusVtims
                };
                this._serviceVin.updateStatusVtims(body).subscribe(
                    (datos) => {
                      
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            });
            this.activeModal.close();

            this.spinner.hide();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'El Estado Vtims se guardó correctamente',
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
