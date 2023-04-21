import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AreadanioService } from '@services/areadanio.service';
import { ClientesService } from '@services/clientes.service';
import { DanioService } from '@services/danio.service';
import { GeocercasService } from '@services/geocercas.service';
import { SelectLocalidadService } from '@services/select-localidad.service';
import { TipodanioService } from '@services/tipodanio.service';
import { Subject } from 'rxjs';
import { ModalDetallesDanioComponent } from './modal-detalles-danio/modal-detalles-danio.component';
import Swal from 'sweetalert2';
import { DanioEstadoService } from '@services/danio-estado.service';
import { NgxSpinnerService } from "ngx-spinner"; //Importancion del spinner
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-listado-danios',
  templateUrl: './listado-danios.component.html',
  styleUrls: ['./listado-danios.component.scss']
})
export class ListadoDaniosComponent implements OnInit {

  @ViewChild('tableConsulta') table: ElementRef;
  dtOptions: any = {};
  listaClientes: any[] = [];
  listaAreaDanio: any[] = [];
  listaTipoDanio: any[] = [];
  geocercasList: any[] = [];
  listaDanioEstado: any[] = [];
  dtTrigger = new Subject<any>();
  modalOptions: NgbModalOptions;
  form: FormGroup;
  mostrarTabla: boolean = false;
  listaFiltroTabla: any[] = [];
  arregloCadenaFotos: any[] = [];

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private _ServicioCliente: ClientesService,
    private serviceAreaDanio: AreadanioService,
    private serviceTipoDanio: TipodanioService,
    private _geocercaService: GeocercasService,
    private selectService: SelectLocalidadService,
    private DanioService: DanioService,
    private DanioEstadoService: DanioEstadoService,
    private spinner: NgxSpinnerService, //Injeccion del spinner
  ) {
    this.form = this.fb.group({
      fechaIni: [''],
      fechaFin: [''],
      cliente: [''],
      cveAreaDanio: [''],
      cveTipoDanio: [''],
      danioEstado: [''],
      geocercaControl: [''],
      vins: ['']
    });
  }

  ngOnInit(): void {

    this.spinner.show("interceptor");
    this.metodosParaSelects();
    this.selectService.cambioLocalidad.subscribe((cambio) => {
      this.geocercasLocalidad(
        localStorage.getItem('idlocalidad')
      );
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      serverSide: false,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
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
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }

  abrirModalDetallesDanio(row) {
    this.consultaDetallesDanio(row);
  }

  consultaDetallesDanio(datos) {
    this.spinner.show();//Se activa el spinner
    let listDetallesDanio: any[] = [];
    let Fotos = '';
    this.arregloCadenaFotos = [];
    this.DanioService.consultaDetallesDanio(datos.vin).subscribe(
      (data) => {
        listDetallesDanio = data[0];

        Fotos = '';
        for (
          let index1 = 0;
          index1 < listDetallesDanio.length;
          index1++
        ) {
          const iteracion = index1;
          this.DanioService.getAllFotografiasDanio(
            listDetallesDanio[iteracion]['idDanio']
          ).subscribe(
            (data) => {
              const arregloFotos = data[0];
              Fotos = '';

              if (arregloFotos.length == 0) {
                Fotos = 'sin Fotos';
                this.arregloCadenaFotos.push([Fotos, listDetallesDanio[iteracion]['idDanio']]);
              }

              for (let index = 0; index < arregloFotos.length; index++) {
                const i = index;

                if (i > 0) {
                  Fotos =
                    Fotos +
                    `
                              <div class="card card-danger">
                              <div class="card-header">
                              <h4 class="card-title w-100">
                              <a class="d-block w-100 collapsed"
                              data-toggle="collapse" href="#collapse` +
                    arregloFotos[i]['idFotografiaDanio'] +
                    `"
                              aria-expanded="false">
                              Fotografia `+ (i + 1) + `
                              </a>
                              </h4>
                              </div>
                              <div id="collapse` +
                    arregloFotos[i]['idFotografiaDanio'] +
                    `" class="collapse " data-parent="#accordion">
                              <div class="card-body">
                              <img alt="imagen aleatoria" class="img-fluid pt-1"
                              src="/assets/uploads/danios` +
                    arregloFotos[i]['urlFotografia'] +
                    `">
                              </div>
                              </div>
                              </div>`;
                } else {
                  Fotos =
                    Fotos +
                    `
                              <div class="card card-danger">
                              <div class="card-header">
                              <h4 class="card-title w-100">
                              <a class="d-block w-100 collapsed"
                              data-toggle="collapse" href="#collapse` +
                    arregloFotos[i]['idFotografiaDanio'] +
                    `"
                              aria-expanded="false">
                              Fotografia `+ (i + 1) + `
                              </a>
                              </h4>
                              </div>
                              <div id="collapse` +
                    arregloFotos[i]['idFotografiaDanio'] +
                    `" class="collapse show" data-parent="#accordion">
                              <div class="card-body">
                              <img alt="imagen aleatoria" class="img-fluid pt-1"
                              src="/assets/uploads/danios` +
                    arregloFotos[i]['urlFotografia'] +
                    `">
                              </div>
                              </div>
                              </div>`;
                }


                if (i == arregloFotos.length - 1) {
                  if (Fotos == '') {
                    Fotos = 'sin Fotos';
                  }
                  this.arregloCadenaFotos.push([Fotos, listDetallesDanio[iteracion]['idDanio']]);

                }

              }

              if (iteracion == listDetallesDanio.length - 1) {
                const modalRef = this.modalService.open(ModalDetallesDanioComponent, {
                  size: 'xl'
                });
                modalRef.componentInstance.tituloModal = 'Detalles de daños';
                modalRef.componentInstance.datos = datos;



                modalRef.componentInstance.arregloCadenaFotos = this.arregloCadenaFotos;
                this.spinner.hide();//Se activa el spinner
              }

            },
            (error) => {
              console.log(error);
              this.spinner.hide();//Se activa el spinner
            }
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );

  }

  filtroListaDanio() {
    this.spinner.show();//Se activa el spinner
    const vins = this.form.get('vins')?.value;
    const fechaIn = this.form.get('fechaIni')?.value + " 00:00:00";
    const fechaFin = this.form.get('fechaFin')?.value + " 23:59:59";

    let cliente = this.form.get('cliente')?.value;
    let cveAreaDanio = this.form.get('cveAreaDanio')?.value;
    let cveTipoDanio = this.form.get('cveTipoDanio')?.value;
    let danioEstado = this.form.get('danioEstado')?.value;
    let geocerca = this.form.get('geocercaControl')?.value;

    var texto_sin_enter = "'";
    if (!cliente) {
      cliente = 0;
    }

    if (!cveAreaDanio) {
      cveAreaDanio = 0;
    }

    if (!cveTipoDanio) {
      cveTipoDanio = 0;
    }

    if (!danioEstado) {
      danioEstado = 0;
    }

    if (!geocerca) {
      geocerca = 0;
    }


    this.mostrarTabla = false;

    if (vins) {
      for (let i = 0; i < vins.length; i++) {
        if (vins[i] === '\n' || vins[i] === '\r') {
          texto_sin_enter = texto_sin_enter + "','";
        } else {
          texto_sin_enter = texto_sin_enter + vins[i];
        }
      }
      texto_sin_enter = texto_sin_enter + "'";
      const vinsArray = vins.split('\n');
      // -----------------------------------------------------------------------------------------

      // funcion que permite recibir lista de visn 3GTPUEEL 3GTUUEE

      this.DanioService.busqFiltradaXVinsDaniosV2(
        vinsArray, localStorage.getItem('idlocalidad')
      ).subscribe(
        (data) => {
        
          data.forEach((element) => {
            element.forEach((element2) => {
              this.listaFiltroTabla.push(element2);
            });
          });
          this.spinner.hide();//Se oculta el spinner
          this.mostrarTabla = true;
        },
        (error) => {
          this.spinner.hide();//Se oculta el spinner
          console.log(error);
        }
      );

      // --------------------------------------------------------------------------------------------
    } else {
      if (fechaFin && fechaIn) {
        if (fechaFin > fechaIn) {
          this.spinner.show();//Se activa el spinner
          this.DanioService.busqFiltradaListaDanios(
            fechaIn,
            fechaFin,
            cliente,
            cveAreaDanio,
            cveTipoDanio,
            danioEstado,
            geocerca,
            localStorage.getItem('idlocalidad')
          ).subscribe(
            (data) => {
              this.spinner.hide();//Se oculta el spinner
              this.listaFiltroTabla = data[0];
              this.mostrarTabla = true;
              console.log(data);
            },
            (error) => {
              console.log(error);
            }
          );
        } else {
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
          text: 'Es necesario introducir fechas'
        });
      }
    }
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    //this.dtTrigger.unsubscribe();
  }

  metodosParaSelects() {
    this.getListClientes();
    this.getListAreadanio();
    this.getListTipoDanio();
    this.geocercasLocalidad(localStorage.getItem('idlocalidad'));
    this.getListDanioEstado();
  }
  getListClientes() {
    this._ServicioCliente.getListClientes().subscribe(
      (data) => {
        this.listaClientes = data[0];
        console.log(data[0]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getListAreadanio() {
    this.serviceAreaDanio.getListAreadanio().subscribe(
      (data) => {
        this.listaAreaDanio = data[0];
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getListTipoDanio() {
    this.serviceTipoDanio.getListTipoDanio().subscribe(
      (data) => {
        this.listaTipoDanio = data[0];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  geocercasLocalidad(id: string) {
    this._geocercaService.getListGeocercasLocalidad(id).subscribe(
      (data) => {
        this.geocercasList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getListDanioEstado() {
    this.DanioEstadoService.getListDanioEstado().subscribe(
      (data) => {
        this.listaDanioEstado = data[0];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  exportarConsulta() {
    this.spinner.show();
    let cadena = "";
    for (let i = 0; i < this.listaFiltroTabla.length; i++) {

      if (i == this.listaFiltroTabla.length - 1) {
        cadena = cadena + "'" + this.listaFiltroTabla[i]["vin"] + "'";
      } else {
        cadena = cadena + "'" + this.listaFiltroTabla[i]["vin"] + "',";
      }
    }

    this.DanioService.exportExcel(cadena).subscribe(data => {

      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data[0]);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      let JSOnExcel = XLSX.utils.sheet_to_json(ws);
      let test = XLSX.utils.sheet_to_csv(ws);
      XLSX.writeFile(wb, "FiltroListadoDaño.csv");

      this.spinner.hide();
    }, error => {
      console.log(error);
      this.spinner.hide();
    })


  }
}
