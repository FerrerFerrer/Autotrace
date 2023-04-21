import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalAgregarEmpleadoComponent } from './modal-agregar-empleado/modal-agregar-empleado.component';
import { ModalEditarEmpleadoComponent } from './modal-editar-empleado/modal-editar-empleado.component';
import { NgxSpinnerService } from "ngx-spinner"; //Importancion del spinner
import { EmpleadosService } from '@services/empleados.service';
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit {

  dtOptions: any = {};
  listaEmpleados: any[];
  mostrarTabla: boolean = false;
  form: FormGroup;

  modalOptions: NgbModalOptions;
  dtTrigger = new Subject<any>();

  constructor( private modalService: NgbModal,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private _empleadosService: EmpleadosService) {
    this.form = this.fb.group({
      patronBusqueda: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
    this.obtenerEmpleados();
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
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
    
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  abrirModalAgregar() {
    const modalRef = this.modalService.open(ModalAgregarEmpleadoComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.tituloModal = 'Agregar empleado';
    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerEmpleados();
    });
  }

  abrirModalEditar(row) {
    const modalRef = this.modalService.open(ModalEditarEmpleadoComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.tituloModal = 'Editar empleado';
    modalRef.componentInstance.datos = row;

    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerEmpleados();
    });
  }

  eliminarRegistro(row) {
    Swal.fire({
      title: '¿Está seguro de eliminar este empleado?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      
      if (result.isConfirmed) {
        this._empleadosService.borrarEmpleado(row.cveEmpleado).subscribe(data => {
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
          this.obtenerEmpleados();
        }, (error) => {
          console.log(error);
        })
      }
    })
  }

  filtroPatron() {
    const cadena = this.form.get('patronBusqueda')?.value;
    this.spinner.show();
    if (this.form.valid) {
        this.mostrarTabla = false;
        this._empleadosService.buscarEmpleados(cadena).subscribe(
            (data) => {
                this.listaEmpleados = data[0];
                this.mostrarTabla = true;
                this.spinner.hide();
            },
            (error) => {
               this.spinner.hide();
                console.log(error);
            }
        );
    } else {
      this.obtenerEmpleados();
    }
  }

  obtenerEmpleados(){
    this.spinner.show();
    this.mostrarTabla = false;
    this._empleadosService.getListEmpleados().subscribe(data => {
      this.listaEmpleados = data[0];
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
