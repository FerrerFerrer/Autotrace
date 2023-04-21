import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ListasService } from '@services/listas.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listas-holds',
  templateUrl: './listas-holds.component.html',
  styleUrls: ['./listas-holds.component.scss']
})
export class ListasHoldsComponent implements OnInit {


  mostrarTabla: boolean = false;
  mostrarFila: boolean = false;
  dtOptions: any = {};

  public listaList: any[] = [];
  private vinsMarker = {
    "type": "FeatureCollection", "features": [

    ]
  };

  form: FormGroup

  constructor(private router: Router, private _listaService: ListasService, private fb: FormBuilder) {

    this.form = this.fb.group({
      nombreLista: ['', Validators.required],
      fechaInicial: ['', Validators.required],
      fechaFinal: ['', Validators.required]
    })

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
    this.obtenerLista();

  }

  public obtenerLista() {
    this._listaService.getListListaDefault("Activo").subscribe(
      data => {
        this.listaList = [];

        this.listaList = data[0];

        this.mostrarTabla = true;
      }, error => {
        console.log(error);
      }
    )

  }

  filtrarLista() {
    let nombre = this.form.get('nombreLista')?.value; let fechaIni = this.form.get('fechaInicial')?.value; let fechaFin = this.form.get('fechaFinal')?.value;

    if (nombre) {

    } else {
      nombre = ' ';
      // console.log(nombre);
    }
    if (fechaIni) {
      // console.log(fechaIni);
    } else {
      fechaIni = ' ';
      // console.log(fechaIni);
    }

    if (fechaFin) {
      // console.log(fechaFin);
    } else {
      fechaFin = ' ';
      // console.log(fechaFin);
    }
    if (fechaIni === ' ' || fechaFin === ' ') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Verificar Fechas Seleccionadas',

      })
    } else {

      this._listaService.getLisbusquedaLista('' + nombre, '' + fechaIni+" 00:00:00", '' + fechaFin+" 23:59:59").subscribe(
        data => {
          this.listaList = [];
          this.listaList = data[0];
          this.mostrarTabla = false;
          this.mostrarTabla = true;
        }
      )
    }



  }

  cambiarEstadoLista() {

  }


  eliminarRegistro(lista: any) {
    Swal.fire({
      title: '¿Está seguro de desactivar la lista?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, desactivar!'
    }).then((result) => {
      if (result.isConfirmed) {

        const id = lista.idlista; let estado = lista.estado;
        if (estado === 'Activo') {
          estado = 'Inactivo';
        } else {
          estado = 'Activo';
        }

        this._listaService.cambiarEstadoLista(id, estado).subscribe(
          data => {
            Swal.fire(
              'Desactivado!',
              'La lista se ha desactivado',
              'success'
            );
            this.obtenerLista();
          }, error => {
            console.log(error);
          }
        )
      }
    });
  }

  irVinsLista(id: number) {
    this.router.navigate(['listas-hold/vins-lista', id]);
  }
}
