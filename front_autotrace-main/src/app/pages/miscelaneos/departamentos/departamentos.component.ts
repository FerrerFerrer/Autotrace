import { Component, OnInit } from '@angular/core';
import { ModalAgregarDepartamentoComponent } from './modal-agregar-departamento/modal-agregar-departamento.component';
import { ModalEditarDepartamentoComponent } from './modal-editar-departamento/modal-editar-departamento.component';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner"; //Importancion del spinner
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartamentosService } from '@services/departamentos.service';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.scss']
})
export class DepartamentosComponent implements OnInit {

  dtOptions: any = {};
  listaDepartamentos: any[];
  mostrarTabla: boolean = false;
  form: FormGroup;

  modalOptions: NgbModalOptions;
  dtTrigger = new Subject<any>();

  constructor(private modalService: NgbModal, private servicioDepartamento: DepartamentosService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService) {
    this.form = this.fb.group({
      patronBusqueda: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
    this.obtenerDepartamentos();
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

  obtenerDepartamentos() {
    this.spinner.show();
    this.servicioDepartamento.getListDepartamento().subscribe(data => {
      this.listaDepartamentos = data[0];
      this.mostrarTabla = true;
      this.spinner.hide();
    },
      (error) => {
        this.spinner.hide();
        console.log(error);
      })
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  filtroPatron() {
    const cadena = this.form.get('patronBusqueda')?.value;
    this.mostrarTabla = false;
    this.spinner.show();

    if (cadena != '') {
      this.servicioDepartamento.buscarPatronDepartamento(cadena).subscribe(
        (data) => {
          this.spinner.hide();
          this.listaDepartamentos = data[0];
          this.mostrarTabla = true;
        },
        (error) => {
          this.spinner.hide();
          console.log(error);
        }

      )
    } else {
      this.obtenerDepartamentos();
    }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  abrirModalAgregar() {
    const modalRef = this.modalService.open(ModalAgregarDepartamentoComponent);
    modalRef.componentInstance.tituloModal = 'Agregar departamento';
    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;
      this.syncDelay(10);
      this.obtenerDepartamentos();
    });

  }

  abrirModalEditar(row) {
    const modalRef = this.modalService.open(ModalEditarDepartamentoComponent);
    modalRef.componentInstance.tituloModal = 'Editar departamento';
    modalRef.componentInstance.datos = row;
    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;
      this.syncDelay(10);
      this.obtenerDepartamentos();
    });
  }

  eliminarRegistro(row) {
    Swal.fire({
      title: '¿Está seguro de eliminar este registro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioDepartamento.delete(row.cveDepartamento).subscribe(
          (data) => {
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
            this.obtenerDepartamentos();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }
  syncDelay(milliseconds) {
    var start = new Date().getTime();
    var end = 0;
    while (end - start < milliseconds) {
      end = new Date().getTime();
    }
  }

}
