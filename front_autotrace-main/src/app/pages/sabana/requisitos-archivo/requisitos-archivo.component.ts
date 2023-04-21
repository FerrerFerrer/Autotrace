import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-requisitos-archivo',
  templateUrl: './requisitos-archivo.component.html',
  styleUrls: ['./requisitos-archivo.component.scss']
})
export class RequisitosArchivoComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
  }

  closeModal() {
    this.activeModal.close();
  }
}
