import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabla-modal',
  templateUrl: './tabla-modal.component.html',
  styleUrls: ['./tabla-modal.component.scss']
})
export class TablaModalComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  constructor() { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      serverSide: false,
      processing: false,
      dom: 'Bfrtip',
      scrollX: true,
    };
  }
}
