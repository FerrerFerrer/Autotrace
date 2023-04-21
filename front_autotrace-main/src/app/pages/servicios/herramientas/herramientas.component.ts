import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalAgregarHerramientaComponent } from './modal-agregar-herramienta/modal-agregar-herramienta.component';
import { ModalEditarHerramientaComponent } from './modal-editar-herramienta/modal-editar-herramienta.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HerramientasService } from '@services/herramientas.service';

@Component({
  selector: 'app-herramientas',
  templateUrl: './herramientas.component.html',
  styleUrls: ['./herramientas.component.scss']
})
export class HerramientasComponent implements OnInit {

  dtOptions: any = {};
  listaHerramientas: any[];
  mostrarTabla: boolean = false;
  form: FormGroup;

  modalOptions: NgbModalOptions;
  dtTrigger = new Subject<any>();

  constructor( private modalService: NgbModal,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private _herramientaService: HerramientasService) {
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
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }

    this.obtenerHerramientas();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  abrirModalAgregar() {
    const modalRef = this.modalService.open(ModalAgregarHerramientaComponent, {
      size: 'md'
    });
    modalRef.componentInstance.tituloModal = 'Agregar herramienta';
    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerHerramientas();
    });
  }

  abrirModalEditar(row) {
    const modalRef = this.modalService.open(ModalEditarHerramientaComponent, {
      size: 'md'
    });
    modalRef.componentInstance.tituloModal = 'Editar herramienta';
    modalRef.componentInstance.datos = row;

    modalRef.closed.subscribe((cambio) => {
      this.mostrarTabla = false;

      this.syncDelay(10);
      this.obtenerHerramientas();
    });
  }

  eliminarRegistro(row) {
    Swal.fire({
      title: '¿Está seguro de eliminar esta herramienta?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      
      if (result.isConfirmed) {
        this._herramientaService.deleteHerramienta(row.cveHerramienta).subscribe(data => {
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
          this.obtenerHerramientas();
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
        this._herramientaService.buscarPatron(cadena).subscribe(
            (data) => {
                this.listaHerramientas = data[0];
                this.mostrarTabla = true;
                this.spinner.hide();
            },
            (error) => {
                console.log(error);
            }
        );
    } else {
      this.obtenerHerramientas();
    }
  }

  obtenerHerramientas(){
    this.spinner.show();
    this._herramientaService.getListHerramientas().subscribe(data => {
      this.listaHerramientas = data[0];
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