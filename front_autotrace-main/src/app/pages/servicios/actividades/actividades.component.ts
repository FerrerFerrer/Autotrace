import { Component, OnInit } from '@angular/core';
import { ModalAgregarActividadComponent } from './modal-agregar-actividad/modal-agregar-actividad.component';
import { ModalEditarActividadComponent } from './modal-editar-actividad/modal-editar-actividad.component';
import { ModalEmpleadosActividadComponent } from './modal-empleados-actividad/modal-empleados-actividad.component';
import Swal from'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActividadesService } from '@services/actividades.service';
@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss']
})
export class ActividadesComponent implements OnInit {

  dtOptions: any = {};
  listaActividades: any[];
  mostrarTabla: boolean = false;
  form: FormGroup;

  modalOptions: NgbModalOptions;
  dtTrigger = new Subject<any>();

  constructor( private modalService: NgbModal,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private _actividadesService: ActividadesService) {
    this.form = this.fb.group({
      patronBusqueda: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      serverSide: false,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        'csv',
        'excel',
        {
          extend: 'pdfHtml5',
          orientation: 'landscape',
          pageSize: 'LEGAL',
          title: 'AutoTracePDF',
          filename: 'AutoTracePDF',
        },
        'colvis'
      ],
      language: {
        "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
      }
    };

    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }

    this.obtenerActividades();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  

  abrirModalAgregar() {
    const modalRef = this.modalService.open(ModalAgregarActividadComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.tituloModal = 'Agregar actividad';
    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerActividades();
    });
  }

  abrirModalEditar(row) {
    const modalRef = this.modalService.open(ModalEditarActividadComponent, {
      size: 'lg'
  });
    modalRef.componentInstance.tituloModal = 'Editar actividad';
    modalRef.componentInstance.datos = row;
    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerActividades();
    });
  }

  abrirModalEmpleados(row) {
    const modalRef = this.modalService.open(ModalEmpleadosActividadComponent, {
      size: 'xl'
    });
    modalRef.componentInstance.tituloModal = 'Administrar empleados de actividad';
    modalRef.componentInstance.datos = row;

    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerActividades();
    });
  }

  eliminarRegistro(row){
    Swal.fire({
      title: '¿Está seguro de eliminar esta actividad?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._actividadesService.eliminarActividades(row.cveActividad).subscribe(data => {
          this.mostrarTabla = false;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Eliminado',
            text: 'El registro se ha eliminado!',
            showConfirmButton: false,
            timer: 1500
          });
          this.syncDelay(10);
          this.obtenerActividades();
        }, (error) => {
          console.log(error);
        })
      }
    })
  }

  filtroPatron() {
    const cadena = this.form.get('patronBusqueda')?.value;
  
    if (this.form.valid) {
      this.spinner.show();
        this.mostrarTabla = false;
        this._actividadesService.buscarActividad(cadena).subscribe(
            (data) => {
                this.listaActividades = data[0];
                this.mostrarTabla = true;
                this.spinner.hide();
            },
            (error) => {
                this.spinner.hide();
                console.log(error);
            }
        );
    } else {
      this.obtenerActividades();
    }
  }

  obtenerActividades(){
    this.spinner.show();
    this._actividadesService.getActividades().subscribe(data => {
      this.listaActividades = data[0];
      this.mostrarTabla = true;
      this.spinner.hide();
    })
  }

  syncDelay(milliseconds) {
    var start = new Date().getTime();
    var end = 0;
    while (end - start < milliseconds) {
        end = new Date().getTime();
    }
  }

}
