import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UsuarioServiceService} from '@services/usuario-service.service';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-modal-localidades-usuario',
    templateUrl: './modal-localidades-usuario.component.html',
    styleUrls: ['./modal-localidades-usuario.component.scss']
})
export class ModalLocalidadesUsuarioComponent implements OnInit {
    dtOptions: any = {};
    @Input() tituloModal: any;
    @Input() datos: any;

    localidadesExistentes: any[];
    localidadesNoExistentes: any[];
    mostrarTabla: boolean = false;

    constructor(
        public activeModal: NgbActiveModal,
        private _serviceUsaurios: UsuarioServiceService
    ) {}

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 20,
            serverSide: false,
            processing: true,
            scrollX: true,
            scrollY: "400px",
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


        this.listarLocalidadesUsuario();
    }

    listarLocalidadesUsuario() {
        this.obtenerLocalidadesUsuario();
        this.obtenerLocalidadesNoUsuario();
    }

    obtenerLocalidadesUsuario() {
        this._serviceUsaurios
            .obtenerLocalidadesUsuario(this.datos.idusuario)
            .subscribe(
                (data) => {
                    this.mostrarTabla = false;
                    this.localidadesExistentes = data[0];

                    this.mostrarTabla = true;
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    obtenerLocalidadesNoUsuario() {
        this._serviceUsaurios
            .obtenerLocalidadesNoUsuario(this.datos.idusuario)
            .subscribe(
                (data) => {
                    this.mostrarTabla = false;
                    this.localidadesNoExistentes = data[0];

                    this.mostrarTabla = true;
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    editarLocalidades() {
        var items: any = document.getElementsByName('existentes');

        for (var i = 0; i < items.length; i++) {
            if (items[i].checked == true) {
            } else {
                const element = items[i]['value'];

                const bodylocalidad: any = {
                    idusuario: this.datos.idusuario,
                    idlocalidad: element
                };
                this._serviceUsaurios
                    .eliminarLocalidadUsuario(bodylocalidad)
                    .subscribe(
                        (data) => {},
                        (error) => {
                            Swal.fire({
                                title: 'Ha ocurrido un error',
                                showClass: {
                                  popup: 'animate__animated animate__fadeInDown'
                                },
                                hideClass: {
                                  popup: 'animate__animated animate__fadeOutUp'
                                }
                              })
                        }
                    );
            }
        }

        var items2: any = document.getElementsByName('noexistentes');

        for (var i = 0; i < items2.length; i++) {
            if (items2[i].checked == true) {
              const element = items2[i]['value'];

              const bodylocalidad: any = {
                  idusuario: this.datos.idusuario,
                  idlocalidad: element
              };
              this._serviceUsaurios
                  .insertarLocalidadUsuario(bodylocalidad)
                  .subscribe(
                      (data) => {},
                      (error) => {
                        Swal.fire({
                            title: 'Ha ocurrido un error',
                            showClass: {
                              popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                              popup: 'animate__animated animate__fadeOutUp'
                            }
                          })
                      }
                  );
            } else {
            }
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
}
