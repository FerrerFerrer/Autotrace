import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

import { ActividadesService } from '@services/actividades.service';

@Component({
  selector: 'app-modal-empleados-actividad',
  templateUrl: './modal-empleados-actividad.component.html',
  styleUrls: ['./modal-empleados-actividad.component.scss']
})
export class ModalEmpleadosActividadComponent implements OnInit {

  dtOptions: any = {};
  dtTrigger = new Subject<any>();

  @Input() tituloModal: any;
  @Input() datos: any;

  listEmpleadosActividad: any[] = [];
  listEmpleadosNoActividad: any[] = [];
  value: any;

  constructor(public activeModal: NgbActiveModal,
    private _actividadesService: ActividadesService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      serverSide: false,
      processing: true,
      scrollX: true,
      scrollY: "300px",
      scrollCollapse: true,
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
    this.obtenerEmpleadosActividad();
    this.obtenerEmpleadosNoActividad();
  }

  editarEmpleados() {
    var items: any = document.getElementsByName('existentes');
    for (var i = 0; i < items.length; i++) {
      if (items[i].checked == true) {
      } else {
        const element = items[i]['value'];

        const cveActividad = this.datos.cveActividad;
        const cveEmpleado = element;
        this._actividadesService
          .eliminarActividadEmpleado(cveActividad, cveEmpleado)
          .subscribe(
            (data) => { },
            (error) => {
              console.log(error);
            }
          );
      }
    }

    var items2: any = document.getElementsByName('noExistentes');

    for (var i = 0; i < items2.length; i++) {
      if (items2[i].checked == true) {
        const element = items2[i]['value'];
        
        const body: any = {
          cveActividad: this.datos.cveActividad,
          cveEmpleado: element
        };

        this._actividadesService
          .crearActividadEmpleado(body)
          .subscribe(
            (data) => { },
            (error) => {
              console.log(error);
            }
          );
      } else {}
    }


    this.activeModal.close();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Datos guardados correctamente',
      showConfirmButton: false,
      timer: 1500
    });

  }

  obtenerEmpleadosActividad() {
    this._actividadesService.getActividadesEmpleado(this.datos.cveActividad).subscribe(data => {
      this.listEmpleadosActividad = data[0];
    })
  }

  obtenerEmpleadosNoActividad() {
    this._actividadesService.getActividadesSinEmpleado(this.datos.cveActividad).subscribe(data => {
      this.listEmpleadosNoActividad = data[0];
    })
  }
}
