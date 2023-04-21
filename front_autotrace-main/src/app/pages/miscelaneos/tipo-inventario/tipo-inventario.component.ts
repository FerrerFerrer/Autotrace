import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalAgregarTipoInventarioComponent } from './modal-agregar-tipo-inventario/modal-agregar-tipo-inventario.component';
import { ModalEditarTipoInventarioComponent } from './modal-editar-tipo-inventario/modal-editar-tipo-inventario.component';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner"; //Importancion del spinner

import { TipoInventarioService } from '@services/tipo-inventario.service';

@Component({
  selector: 'app-tipo-inventario',
  templateUrl: './tipo-inventario.component.html',
  styleUrls: ['./tipo-inventario.component.scss']
})
export class TipoInventarioComponent implements OnInit {

  dtOptions: any = {};
  listaTipoInventario: any[];
  mostrarTabla: boolean = false;
  form: FormGroup;

  modalOptions: NgbModalOptions;
  dtTrigger = new Subject<any>();

  constructor(private modalService: NgbModal,
    private fb: FormBuilder,
    private _tipoInventarioService: TipoInventarioService,
    private spinner: NgxSpinnerService) {
    this.form = this.fb.group({
      patronBusqueda: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
    this.obtenerTipoInventario();
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
    const modalRef = this.modalService.open(ModalAgregarTipoInventarioComponent);
    modalRef.componentInstance.tituloModal = 'Agregar tipo de inventario';
    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerTipoInventario();
    });
  }

  abrirModalEditar(row) {
    const modalRef = this.modalService.open(ModalEditarTipoInventarioComponent);
    modalRef.componentInstance.tituloModal = 'Editar tipo de inventario';
    modalRef.componentInstance.datos = row;

    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerTipoInventario();
    });
  }

  eliminarRegistro(row) {
    Swal.fire({
      title: '¿Está seguro de eliminar este tipo de inventario?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {

      if (result.isConfirmed) {
        this._tipoInventarioService.deleteTipoInventario(row.cveTipoInventario).subscribe(data => {
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
          this.obtenerTipoInventario();
        }, (error) => {
          console.log(error);
        })
      }
    })
  }

  filtroPatron() {
    const cadena = this.form.get('patronBusqueda')?.value;
    this.spinner.show();
    this.mostrarTabla = false;
    if (cadena != '') {
      this._tipoInventarioService.buscarPatron(cadena).subscribe(
        (data) => {
          this.listaTipoInventario = data[0];
          this.mostrarTabla = true;
          this.spinner.hide();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.obtenerTipoInventario();
    }
  }

  obtenerTipoInventario() {
    this.spinner.show();
    this._tipoInventarioService.getListTipoInventarios().subscribe(data => {
      this.listaTipoInventario = data[0];
      this.mostrarTabla = true;
      this.spinner.hide();
    },
      (error) => {
        this.spinner.hide();
        console.log(error);
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
