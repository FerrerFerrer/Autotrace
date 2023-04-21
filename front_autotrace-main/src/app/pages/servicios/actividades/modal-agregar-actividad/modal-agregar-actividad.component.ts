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
  selector: 'app-modal-agregar-actividad',
  templateUrl: './modal-agregar-actividad.component.html',
  styleUrls: ['./modal-agregar-actividad.component.scss']
})
export class ModalAgregarActividadComponent implements OnInit {

  @Input() tituloModal: any;
  @Input() isChecked = false;
  @Output() getChange = new EventEmitter();
  listaEmpleados: any[] = [];
  listClientes: any[] = [];
  listaHerramientas: any[] = [];
  form: FormGroup;
  value : any;

  constructor(public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private _actividadesService: ActividadesService,
    private _serviceCliente:ClientesService,
    private _empleadosService: EmpleadosService,
    private _herramientaService: HerramientasService,
    private spinner: NgxSpinnerService) {
    this.form = this.fb.group({
      InputClave: ['', [Validators.required, Validators.maxLength(30)]],
      InputNombre: ['', [Validators.required, Validators.maxLength(100)]],
      InputDescripcion: ['', [Validators.required, Validators.maxLength(100)]],
      InputHerramienta: ['', [Validators.required]],
      InputEmpleados: ['', [Validators.required]],
      InputAdvertencia: ['', [Validators.maxLength(200)]],
      InputCliente: ['', [Validators.required]],
      InputTarifa: ['', [Validators.required]],
      InputActivo: ['', [Validators.required]],
      InputInput: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.obtenerListaClientes();
    this.obtenerEmpleados();
    this.obtenerHerramientas();
  }

  private onChangeCallback: (_: any) => void = noop;

  isChange(isChecked){
    this.value = isChecked;
    this.getChange.emit(this.isChecked);
    this.onChangeCallback(this.value);
  }

  quitarCaracteresEspecialesNoEspacios(event) {
    Util.quitarCaracteresEspecialesNoEspacios(event);
}

  agregar() {
    let actividadClave = this.form.get('InputClave').value
    const bodyActividad = {
      cveActividad: actividadClave,
      cveHerramienta: this.form.get('InputHerramienta').value,
      idcliente: this.form.get('InputCliente').value,
      nombre: this.form.get('InputNombre').value,
      descripcion: this.form.get('InputDescripcion').value,
      tarifa: this.form.get('InputTarifa').value,
      advertencia: this.form.get('InputAdvertencia').value,
      input: (this.value ? 1 : 0),
      activo: this.form.get('InputActivo').value
    };

    let empleadosList = this.form.get('InputEmpleados').value;

    if (this.form.valid) {
      this.spinner.show();
      this._actividadesService.crearActividades(bodyActividad).subscribe((data) => {
        for(let e in empleadosList) {
          const bodyActividadEmpleado = {
            cveActividad: actividadClave,
            cveEmpleado: empleadosList[e]
          }
          this.asociarActividadEmpleado(bodyActividadEmpleado);
        }
        this.activeModal.close();
        this.spinner.hide();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'La Actividad se guardo correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      },(error) => {
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message,
          showConfirmButton: true,
        });
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

  asociarActividadEmpleado(bodyActividadEmpleado: any) {
    this._actividadesService.crearActividadEmpleado(bodyActividadEmpleado).subscribe(data => {
    }, (error) => {
      console.log(error);
    })
  }

  obtenerEmpleados(){
    this._empleadosService.getListEmpleados().subscribe(data => {
      this.listaEmpleados = data[0];
    })
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
