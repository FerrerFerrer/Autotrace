import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ClientesService } from '@services/clientes.service';
import { EmpleadosService } from '@services/empleados.service';
import { HerramientasService } from '@services/herramientas.service';
import { ActividadesService } from '@services/actividades.service';
import {Util} from '@/utils/Util';
import {NgxSpinnerService} from 'ngx-spinner';
const noop = () => {
};
@Component({
  selector: 'app-modal-editar-actividad',
  templateUrl: './modal-editar-actividad.component.html',
  styleUrls: ['./modal-editar-actividad.component.scss']
})
export class ModalEditarActividadComponent implements OnInit {

  @Input() tituloModal: any;
  @Input() datos: any;
  @Input() isChecked = false;
  @Output() getChange = new EventEmitter();
  listaEmpleados: any[] = [];
  listEmpleadosActividad : any[] = [];
  listClientes: any[] = [];
  listaHerramientas: any[] = [];
  form: FormGroup;
  value : any;

  constructor(public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private _actividadesService: ActividadesService,
    private _serviceCliente:ClientesService,
    private _herramientaService: HerramientasService,
    private spinner: NgxSpinnerService) {
    this.form = this.fb.group({
      InputClaveGuardado: [],
      InputClave: ['', [Validators.required, Validators.maxLength(30)]],
      InputNombre: ['', [Validators.required, Validators.maxLength(100)]],
      InputDescripcion: ['', [Validators.required, Validators.maxLength(100)]],
      InputHerramienta: ['', [Validators.required]],
      InputAdvertencia: ['', [Validators.maxLength(200)]],
      InputCliente: ['', [Validators.required]],
      InputTarifa: ['', [Validators.required]],
      InputActivo: ['', [Validators.required]],
      InputInput: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.obtenerListaClientes();
    this.obtenerHerramientas();
    this.form.patchValue({
        InputClave: this.datos.cveActividad,
        InputClaveGuardado: this.datos.cveActividad,
        InputNombre: this.datos.nombre,
        InputDescripcion: this.datos.descripcion,
        InputHerramienta: this.datos.cveHerramienta,
        InputActivo: (this.datos.activo === "SI" ? 1 : 0),
        InputInput: (this.datos.input === "SI" ? this.isChecked : this.value = false),
        InputTarifa: this.datos.tarifa,
        InputCliente: this.datos.idcliente,
        InputAdvertencia: this.datos.advertencia
    });
  }

  quitarCaracteresEspecialesNoEspacios(event) {
    Util.quitarCaracteresEspecialesNoEspacios(event);
}

  private onChangeCallback: (_: any) => void = noop;

  isChange(isChecked){
    this.value = isChecked;
    this.getChange.emit(this.isChecked);
    this.onChangeCallback(this.value);
  }

  editar() {
    let actividadClave = this.form.get('InputClaveGuardado').value
    const bodyActividad = {
      cveActividadNuevo: this.form.get('InputClave').value,
      cveHerramienta: this.form.get('InputHerramienta').value,
      idcliente: this.form.get('InputCliente').value,
      nombre: this.form.get('InputNombre').value,
      descripcion: this.form.get('InputDescripcion').value,
      tarifa: this.form.get('InputTarifa').value,
      advertencia: this.form.get('InputAdvertencia').value,
      input: (this.value ? 1 : 0),
      activo: this.form.get('InputActivo').value
    };
    this.spinner.show();
    this._actividadesService.actualizarActividad(actividadClave,bodyActividad).subscribe((data) => {
      this.activeModal.close();
      this.spinner.hide();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'La Actividad se modifico correctamente',
        showConfirmButton: false,
        timer: 1500
      });
    },(error) => {
      this.spinner.hide();
      console.log(error);
    });
  }

  obtenerListaClientes() {
    this._serviceCliente.getListClientes().subscribe(data => {this.listClientes = data[0];},
      (error) => {
        console.log(error);
      }
    );
  }

  obtenerHerramientas(){
    this._herramientaService.getListHerramientas().subscribe(data => {
      this.listaHerramientas = data[0];
    })
  }
}
