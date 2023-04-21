import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {ClientesService} from '@services/clientes.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ManifiestoService} from '@services/manifiesto.service';

@Component({
    selector: 'app-seguimiento-manifiestos',
    templateUrl: './seguimiento-manifiestos.component.html',
    styleUrls: ['./seguimiento-manifiestos.component.scss']
})
export class SeguimientoManifiestosComponent implements OnInit {
    public listMarcas: any[] = [];
    public listTabla: any[] = [];
    public mostrarTabla = true;

    form: FormGroup;

    dtOptions: any = {};
    constructor(
        private router: Router,
        private fb: FormBuilder,
        private _clientesService: ClientesService,
        private _serviceManifiesto: ManifiestoService
    ) {
        this.form = this.fb.group({
            marcas: ['', Validators.required],
            fechaIni: ['', Validators.required],
            fechaFin: ['', Validators.required],
            manifiestosCerrados: ['']
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

        this.obtenerMarcas();
    }

    obtenerMarcas() {
        this._clientesService.getListClientes().subscribe(
            (data) => {
                this.listMarcas = [];
                this.listMarcas = data[0];
            },
            (error) => {
                console.log(error);
            }
        );
    }

    filtroTabla() {
        const marcas = this.form.get('marcas')?.value;

        const fechaIni = this.form.get('fechaIni')?.value+" 00:00:00";
        const fechaFin = this.form.get('fechaFin')?.value+" 23:59:59";
        let manifiestosCerrados;
        if (this.form.get('manifiestosCerrados')?.value) {
            manifiestosCerrados = 0;
        } else {
            manifiestosCerrados = 1;
        }

        if (this.form['status'] == 'VALID' ) {
          if(fechaFin > fechaIni){
            this.mostrarTabla = false;

            this._serviceManifiesto
                .busquedaSegunManifiesto(
                    manifiestosCerrados,
                    marcas,
                    fechaIni,
                    fechaFin
                )
                .subscribe(
                    (data) => {
                        this.listTabla = data[0];
                        this.mostrarTabla = true;
                    },
                    (error) => {
                        console.log(error);
                    }
                );
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Verificar Fechas Seleccionadas'
          });
          }

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ingresar Datos Necesarios'
            });
        }
    }

    irVinsManifiesto(id: number) {
        this._serviceManifiesto.vinsManifiesto(Number(id)).subscribe(
            (data) => {
                if (data[0].length > 0) {
                    this.router.navigate([
                        'menu/seguimiento-manifiesto/vins-manifiesto',
                        id
                    ]);
                } else {
                    Swal.fire({
                      icon: 'info',
                      showConfirmButton: false,
                      text: 'El Manifiesto Esta Vacio (No Contiene Vins Vinculados)',
                      timer: 1700,
                      showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                      },
                      hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                      }
                    })
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }

    cerrarManifiesto(id: number, estado: string) {
        console.log(id + estado);

        if (estado == 'Abierto') {
            Swal.fire({
                title: '¿Está seguro de cerrar este manifiesto?',
                text: 'No podrás revertir esta acción',
                icon: 'warning',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                confirmButtonColor: '#d33',
                confirmButtonText: 'Si, cerrar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this._serviceManifiesto
                        .cambiarEstadoManifiesto(id, 'Cerrado')
                        .subscribe(
                            (data) => {
                                Swal.fire(
                                    'Cerrado!',
                                    'El manifiesto ha sido cerrado',
                                    'success'
                                );
                            },
                            (error) => {
                                console.log(error);
                            }
                        );
                }
            });
        }
    }

    validarCerrar(fila: any){
        if (fila.vinsPendientesProcesar == 0) {
            return false;
        } else {
            return true;
        }
    }
}
