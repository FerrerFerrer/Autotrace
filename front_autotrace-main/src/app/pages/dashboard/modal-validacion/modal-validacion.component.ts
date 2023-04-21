import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-validacion',
  templateUrl: './modal-validacion.component.html',
  styleUrls: ['./modal-validacion.component.scss']
})
export class ModalValidacionComponent implements OnInit {

  @Input() fromParent;
  dtOptions: any = {};

  constructor(public activeModal: NgbActiveModal){ }

  ngOnInit() {
    
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


  }

  closeModal() {
    this.activeModal.close();
  }

}
