import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SendMailService} from '@services/send-mail.service';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-modal-enviar-lista-correo',
    templateUrl: './modal-enviar-lista-correo.component.html',
    styleUrls: ['./modal-enviar-lista-correo.component.scss']
})
export class ModalEnviarListaCorreoComponent implements OnInit {
    @Input() tituloModal: any;
    @Input() JSOnExcel: any;
    @Input() IdLista: any;
    dtOptions: any = {};
    listCorreos: any[] = [];
    public mostrarTabla = false;

    constructor(
        public activeModal: NgbActiveModal,
        private servcieEmail: SendMailService
    ) {}

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
        this.ListarCorreos();
    }

    ListarCorreos() {
        this.servcieEmail.getListCorreos().subscribe((data) => {
            this.mostrarTabla = false;
            this.listCorreos = data[0];

            this.mostrarTabla = true;
        });
    }

    enviar() {
        let arreglodatos = [];
        var items: any = document.getElementsByName('checkCorreo');
        let j = 0;
        var cadena = '';

        for (var i = 0; i < items.length; i++) {
            if (items[i].checked == true) {
                arreglodatos[j] = items[i]['value'];
                j++;
            }
        }

        for (let index = 0; index < arreglodatos.length; index++) {
            cadena = cadena + arreglodatos[index];
            if (index < arreglodatos.length - 1) {
                cadena = cadena + ',';
            }
        }

        const body: any = {
            doc: this.JSOnExcel,
            cadena: cadena,
            IdLista: this.IdLista
        };
        this.servcieEmail.sendMail(body).subscribe(
            (data) => {
                this.activeModal.close();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Correo Enviado Correctamente',
                    showConfirmButton: false,
                    timer: 1500
                });
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
