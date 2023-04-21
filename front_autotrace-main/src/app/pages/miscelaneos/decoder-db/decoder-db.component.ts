import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DecoderService } from '@services/decoder.service';
import { Decoder13Service } from '@services/decoder13.service';
import { Decoder4Service } from '@services/decoder4.service';
import { Decoder57Service } from '@services/decoder57.service';
import { Decoder8Service } from '@services/decoder8.service';
import { Decoder10Service } from '@services/decoder10.service';
import { Decoder11Service } from '@services/decoder11.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner"; //Importancion del spinner
@Component({
  selector: 'app-decoder-db',
  templateUrl: './decoder-db.component.html',
  styleUrls: ['./decoder-db.component.scss']
})
export class DecoderDbComponent implements OnInit {

  countRegistrosDecoder13: number = 0;
  countRegistrosDecoder4: number = 0;
  countRegistrosDecoder57: number = 0;
  countRegistrosDecoder8: number = 0;
  countRegistrosDecoder10: number = 0;
  countRegistrosDecoder11: number = 0;

  constructor(private router: Router,
    private _decoderService: DecoderService,
    private _decoder13Service: Decoder13Service,
    private _decoder4Service: Decoder4Service,
    private _decoder57Service: Decoder57Service,
    private _decoder8Service: Decoder8Service,
    private _decoder10Service: Decoder10Service,
    private _decoder11Service: Decoder11Service,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this._decoder13Service.getListDecoder13().subscribe(data => { this.countRegistrosDecoder13 = data[0].length; });
    this._decoder4Service.getListDecoder4().subscribe(data => { this.countRegistrosDecoder4 = data[0].length; });
    this._decoder57Service.getListDecoder57().subscribe(data => { this.countRegistrosDecoder57 = data[0].length; });
    this._decoder8Service.getListDecoder8().subscribe(data => { this.countRegistrosDecoder8 = data[0].length; });
    this._decoder10Service.getListDecoder10().subscribe(data => { this.countRegistrosDecoder10 = data[0].length; });
    this._decoder11Service.getListDecoder11().subscribe(data => { this.countRegistrosDecoder11 = data[0].length; });
  }

  sincronizarDecoder() {
    this.spinner.show();
    this._decoderService.actualizarDecoder().subscribe(data => {
      this.spinner.hide();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Sincronización completa',
        showConfirmButton: false,
        timer: 1500
      });
    })
  }

  irAdministrarDigito13() {
    this.router.navigateByUrl("miscelaneo/decoder-db/digito1-3");
  }

  irAdministraDigito4() {
    this.router.navigateByUrl("miscelaneo/decoder-db/digito4");
  }

  irAdministrarDigito57() {
    this.router.navigateByUrl("miscelaneo/decoder-db/digito5-7");
  }

  irAdministrarDigito8() {
    this.router.navigateByUrl("miscelaneo/decoder-db/digito8");
  }

  irAdministrarDigito10() {
    this.router.navigateByUrl("miscelaneo/decoder-db/digito10");
  }

  irAdministrarDigito11() {
    this.router.navigateByUrl("miscelaneo/decoder-db/digito11");
  }
}