import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlacardMultipleComponent } from '@pages/componentes-utiles/placard-multiple/placard-multiple.component';

@Component({
  selector: 'app-imprimir-vin',
  templateUrl: './imprimir-vin.component.html',
  styleUrls: ['./imprimir-vin.component.scss']
})
export class ImprimirVinComponent implements OnInit {

  public listaVins: any[] = [];

  constructor(private modalService: NgbModal,) { }

  ngOnInit(): void {
  }

  async abrirModalMuiltiplePlacard() {
    const modalRef = this.modalService.open(PlacardMultipleComponent);
    modalRef.componentInstance.Vin = this.listaVins;
    modalRef.componentInstance.Tipo = "Lista";
  }

}
