import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ModalAgregarInventarioComponent } from './modal-agregar-inventario/modal-agregar-inventario.component';
import { ModalEditarInventarioComponent } from './modal-editar-inventario/modal-editar-inventario.component';
import { NgxSpinnerService } from "ngx-spinner"; //Importancion del spinner
import { InventarioEtiquetaService } from '@services/inventario-etiqueta.service';
@Component({
  selector: 'app-miscelanio-inventario',
  templateUrl: './miscelanio-inventario.component.html',
  styleUrls: ['./miscelanio-inventario.component.scss']
})
export class MiscelanioInventarioComponent implements OnInit {

  form: FormGroup;
  dtOptions: any = {};
  listaInventarioEtiqueta: any[];
  mostrarTabla: boolean = false;

  modalOptions: NgbModalOptions;
  dtTrigger = new Subject<any>();

  constructor(private modalService: NgbModal,
    private fb: FormBuilder,
    private _inventarioEtiquetaService: InventarioEtiquetaService,
    private spinner: NgxSpinnerService) {
    this.form = this.fb.group({
      patronBusqueda: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
    this.obtenerInventarioEtiqueta();
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
    const modalRef = this.modalService.open(ModalAgregarInventarioComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.tituloModal = 'Agregar inventario';
    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerInventarioEtiqueta();
    });
  }

  abrirModalEditar(row) {
    const modalRef = this.modalService.open(ModalEditarInventarioComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.tituloModal = 'Editar inventario';
    modalRef.componentInstance.datos = row;

    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerInventarioEtiqueta();
    });
  }

  eliminarRegistro(row) {
    Swal.fire({
      title: '¿Está seguro de eliminar?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {

      if (result.isConfirmed) {
        this._inventarioEtiquetaService.eliminarInventarioEtiqueta(row.idInventarioEtiqueta).subscribe(data => {
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
          this.obtenerInventarioEtiqueta();
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
      this._inventarioEtiquetaService.buscarInventarioEtiqueta(cadena).subscribe(
        (data) => {
          this.listaInventarioEtiqueta = data[0];
          this.mostrarTabla = true;
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          console.log(error);
        }
      );
    }else{
      this.obtenerInventarioEtiqueta();
    }

  }

  obtenerInventarioEtiqueta() {
    this.spinner.show();
    this._inventarioEtiquetaService.listarInventarioEtiqueta().subscribe(data => {
      this.listaInventarioEtiqueta = data[0];
      this.mostrarTabla = true;
      this.spinner.hide();
    },(error)=>{
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