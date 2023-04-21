import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-archivos-subidos',
  templateUrl: './modal-archivos-subidos.component.html',
  styleUrls: ['./modal-archivos-subidos.component.scss']
})
export class ModalArchivosSubidosComponent implements OnInit {

  @Input() data;
  dtOptions: any = {};
  constructor(public activeModal: NgbActiveModal) { }

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
    console.log(this.data);
  }

  closeModal() {
    this.activeModal.close();
  }
}


