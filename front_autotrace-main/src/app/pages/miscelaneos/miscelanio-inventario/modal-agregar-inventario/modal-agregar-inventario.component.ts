import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import { InventarioEtiquetaService } from '@services/inventario-etiqueta.service';
import { LocalidadesService } from '@services/localidades.service';
import { TipoInventarioService } from '@services/tipo-inventario.service';
import {Util} from '@/utils/Util';
@Component({
  selector: 'app-modal-agregar-inventario',
  templateUrl: './modal-agregar-inventario.component.html',
  styleUrls: ['./modal-agregar-inventario.component.scss']
})
export class ModalAgregarInventarioComponent implements OnInit {

    @Input() tituloModal: any;
    form: FormGroup;

    listaTipoInventario: any[];
    listaLocalidades: any[];

    constructor(public activeModal: NgbActiveModal,
      private fb: FormBuilder,
      private _inventarioEtiquetaService : InventarioEtiquetaService,
      private _tipoInventarioService: TipoInventarioService,
      private spinner: NgxSpinnerService,
      private _localidadesService: LocalidadesService) {
        this.form = this.fb.group({
          InputManualEtiqueta: ['',[Validators.required, Validators.maxLength(10)]],
          InputTipoInventario: ['',[Validators.required]],
          InputBodyModel: ['',[Validators.required, Validators.maxLength(10)]],
          InputNumeroParte: ['',[Validators.required, Validators.maxLength(10)]],
          InputInicial: ['', [Validators.required]],
          InputDescontar: [],
          InputRecibida: [],
          InputEnviada: [],
          InputConsumido: [],
          InputActual: [],
          InputTotal: [],
          InputAnio: [],
          InputLocalidad: ['',[Validators.required]]
        });
      }

    ngOnInit(): void {
      this.obtenerTipoInventario();
      this.obtenerLocalidades();
    }

    validacionNoCaracteresEspeciales(event) {
      Util.quitarCaracteresEspeciales(event);
    }

    agregar() {
      const body : any = {
        manualEtiqueta: this.form.get('InputManualEtiqueta')?.value,
        cveTipoInventario: this.form.get('InputTipoInventario')?.value,
        idlocalidad: this.form.get('InputLocalidad')?.value,
        bodyModel: this.form.get('InputBodyModel')?.value,
        numeroParte: this.form.get('InputNumeroParte')?.value,
        inicial: this.form.get('InputInicial')?.value,
        descontar: this.form.get('InputDescontar')?.value,
        recibida: this.form.get('InputRecibida')?.value,
        enviada: this.form.get('InputEnviada')?.value,
        consumido: this.form.get('InputConsumido')?.value,
        actual: this.form.get('InputActual')?.value,
        total: this.form.get('InputTotal')?.value,
        anio: this.form.get('InputAnio')?.value,
      }

      if (this.form.valid) {
        this.spinner.show();
        this._inventarioEtiquetaService.crearInventarioEtiqueta(body).subscribe((data) => {
          this.activeModal.close();
          this.spinner.hide();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'El Inventario Etiqueta se guardo correctamente',
            showConfirmButton: false,
            timer: 1500
          });
        },(error) => {
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

    obtenerLocalidades(){
      this._localidadesService.getListLocalidades().subscribe(data => {
        this.listaLocalidades = data[0];
      })
    }

    obtenerTipoInventario(){
      this._tipoInventarioService.getListTipoInventarios().subscribe(data => {
        this.listaTipoInventario = data[0];
      })
    }
}
