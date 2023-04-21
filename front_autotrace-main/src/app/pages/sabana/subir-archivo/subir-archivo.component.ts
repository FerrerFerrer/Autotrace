import {Component, OnInit} from '@angular/core';
import {async} from '@angular/core/testing';
import {VinService} from '@services/vin.service';
import {Mode} from 'ol/interaction/MouseWheelZoom';
import * as XLSX from 'xlsx';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {ModalArchivosSubidosComponent} from '../modal-archivos-subidos/modal-archivos-subidos.component';

@Component({
    selector: 'app-subir-archivo',
    templateUrl: './subir-archivo.component.html',
    styleUrls: ['./subir-archivo.component.scss']
})
export class SubirArchivoComponent implements OnInit {
    fileReady: boolean = false;
    reader = new FileReader();
    data: [][];
    datos: any = [];
    sabana: any = [];
    archivoActual: string;
    preview: any = [];

    datosRechazados: any[] = [];
    datosAceptados: any[] = [];

    modalOptions: NgbModalOptions;
    constructor(
        private _vinService: VinService,
        private spinner: NgxSpinnerService,
        private modalService: NgbModal
    ) {}

    // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
    async ngOnInit(){
      await this._vinService.consultaSabana().subscribe(
        (data) =>{
          this.sabana = data;
          // let data2 = this.sabana[0];
        }
      )
    }

    leerArchivosExcel(evento, archivo: string): any {
        this.spinner.show();
        this.archivoActual = '';
        // console.log(evento.target.files[0]);
        const target: DataTransfer = <DataTransfer>evento.target;

        const reader: FileReader = new FileReader();

        reader.onload = (e: any) => {
            const bstr: string = e.target.result;

            const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

            const wsname: string = wb.SheetNames[0];

            const ws: XLSX.WorkSheet = wb.Sheets[wsname];
            this.data = XLSX.utils.sheet_to_json(ws, {header: 1});
            // mostrar tabla
            this.tablaPreview();

            // nombre de archivo leido
            this.archivoActual = archivo;
            // console.log(this.data);
            this.spinner.hide();
        };
        reader.readAsBinaryString(target.files[0]);
    }

    subirArchivos() {
        if (
            this.archivoActual == 'Gm' ||
            this.archivoActual == 'LC logistics'
        ) {
            this.prepararGmTotal();
        } else if (this.archivoActual == 'Daily shipement') {
            this.prepararDailyShipement();
        } else if (this.archivoActual == 'txt') {
            this.subirTxt(this.datos);
        }
        this.fileReady = false;
        this.modalArchivos();
    }

    prepararGmTotal() {
        let revision: any = [];
        // pasar la dupla a array

        for (let i = 0; i < this.data.length; i++) {
            revision[i] = this.data[i];
        }
        // recorrer array y comprobar si un vin ya fue registrado
        console.log(revision.length);
        for (let renglon of revision) {
            if (this.archivoActual == 'Gm') {
                if (renglon[2] != 'VIN') {
                    this.subirGmTotal(renglon);
                }
            } else if (this.archivoActual == 'LC logistics') {
                if (renglon[3] != 'VIN') {
                    this.subirLC(renglon);
                }
            }
        }
        this.fileReady = false;
    }

    prepararDailyShipement() {
        console.log('upDailyShipement');
        this.fileReady = false;
    }

    decifrarClienteEmpresaVin(vin) {
        let empresa = '';
        let idCliente;
        empresa += vin.charAt(0);
        empresa += vin.charAt(1);
        empresa += vin.charAt(2);

        let GM = [
            'KL',
            'LSG',
            'SED',
            'XUF',
            'XUU',
            '1G',
            '2GX',
            '3G',
            '6G1',
            '6H8'
        ];
        let FCA = ['WDC', '1C3', '1C4', '1C6', '2A4', '2C3', '34C'];
        let HYUNDAI = [
            'AC5',
            'ADD',
            'KM',
            'LBE',
            'MAL',
            'NLH',
            'TMA',
            'XWE',
            'X7M',
            '2HM',
            '5NP'
        ];
        let KIA = ['KN', 'U5Y', 'U6Y', 'XWE'];
        let TOYOTA = [
            'AHT',
            'JT',
            'LTV',
            'MBJ',
            'MHF',
            'MR0',
            'NMT',
            'SB1',
            'TW1',
            'VNK',
            '2T',
            '4T',
            '5T',
            '6T1',
            '8AJ',
            '93R',
            '9BR'
        ];

        if (GM.includes(empresa)) {
            idCliente = 2;
        } else if (FCA.includes(empresa)) {
            idCliente = 1;
        } else if (HYUNDAI.includes(empresa)) {
            idCliente = 3;
        } else if (KIA.includes(empresa)) {
            idCliente = 4;
        } else if (TOYOTA.includes(empresa)) {
            idCliente = 5;
        }
        return idCliente;
    }

    async subirGmTotal(datos) {
        let req = {
            idlocalidadUsuario: '',
            vin: datos[2],
            truckId: '',
            model: datos[0] + ' ' + datos[7],
            origin: '',
            dealer: '',
            weight: 0,
            modelId: '',
            truckDriver: '',
            carrier: '',
            buqueViaje: '',
            puertoDescarga: '',
            destinoFinal: '',
            eta: '',
            demandArea: '',
            rampa: '',
            mode: 'MADRINA'
        };

        this.procesoModelos(req);
        this.procesoVin(req);

        let req2 = {
            model_year: datos[0],
            o_v: datos[1],
            vin: datos[2],
            cd_model: datos[3],
            pack: datos[4],
            color_ext: datos[5],
            color_int: datos[6],
            nomenclatura: datos[7],
            d_code: datos[8],
            owner: datos[9],
            entity: datos[10],
            order_type: datos[11],
            location: datos[12],
            status: datos[13],
            subst: datos[14],
            voms_sts: datos[15],
            voms_sts_desc: datos[16],
            qty: datos[17],
            comments: datos[18],
            age_produced: datos[19],
            age_st: datos[20],
            age_orig_invoice: datos[21],
            age_at_vdc: datos[22],
            age_avail: datos[23],
            rcvd_date: datos[24],
            sts_date: datos[25]
        };

        await this._vinService.ingresoGm_total(req2).subscribe(
            (data) => {
                // console.log("Ingreso gm correcto");
                this.datosAceptados.push("{vin:" + req2.vin +"}");
            },
            (error) => {
                // console.log("ingreso gm malo");
                this.datosRechazados.push("{vin:" + req2.vin +"}");
                // console.log(error);
            }
        );
    }

    async consultarVinHistorico(datos) {
        let vin = datos[2];
        await this._vinService.historicoVin(vin).subscribe((data) => {
            // guardar nuevo vin
            if (datos.length > 0) {
                let historico = {
                    idpatio: '',
                    cajon: '',
                    fila: '',
                    bloque: '',
                    idtipoServicio: '',
                    longitud: '',
                    latitud: ' ',
                    fechaInicio: '',
                    fechaSalido: '',
                    idusuario: '',
                    dispositivo: '',
                    vin: ' ',
                    estatusDFY: '',
                    estatusVtims: ' ',
                    estadoUnidad: '',
                    folio: ''
                };
                this._vinService.crearVinHistorico(historico).subscribe(
                    (data) => {
                        console.log(data);

                        console.log('Unidad agregada a historico');
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            } else {
                console.log('Nueva unidad');
            }
        });
    }

    leerTxt(e, txt: string) {
        this.spinner.show();
        this.archivoActual = txt;
        var archivo = e.target.files[0];

        if (!archivo) {
            return;
        }

        var lector = new FileReader();
        lector.onload = (e) => {
            var contenido = e.target.result;
            var contenido2 = (<string>contenido).split('\n');
            for (let i = 0; i < contenido2.length; i++) {
                this.datos[i] = this.formatoDat(contenido2[i]);
            }

            for (let i = 0; i < 10; i++) {
                this.preview[i] = this.datos[i];
            }
            this.fileReady = true;
            this.spinner.hide();
        };
        lector.readAsText(archivo);
    }

    consultaSabana() {
        this._vinService.consultaSabana().subscribe(async (data) => {
            console.log('Sabana cargada!!');
            return data;
        });
    }

    subirLC(datos) {
        let req = {
            idlocalidadUsuario: '',
            vin: datos[3],
            truckId: datos[2],
            model: datos[4],
            origin: datos[5],
            dealer: datos[6],
            weight: datos[7],
            modelId: datos[8],
            truckDriver: datos[9],
            carrier: '' /*Naviera*/,
            buqueViaje: datos[11],
            puertoDescarga: datos[12],
            destinoFinal: datos[13],
            eta: datos[14],
            demandArea: datos[15],
            rampa: datos[16],
            mode: 'MADRINA'
        };
        // console.log(req);

        this._vinService.crearVin(req).subscribe(
            (data) => {
                console.log(data);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    procesoModelos(req) {
        this._vinService.verModelos().subscribe(
            async (dataModel) => {
                let modelos = dataModel[0];

                //  // dataModel[0]  es el modelo
                let existe = false;

                // validar si el modelo ya esta en la db
                for (let i = 0; i < dataModel[0].length; i++) {
                    if (req.model == modelos[i].model) {
                        existe = true;
                    }
                }
                if (!existe) {
                    let cliente = this.decifrarClienteEmpresaVin(req.vin);
                    let body = {
                        model: req.model,
                        idCliente: cliente
                    };
                    this._vinService.ingresoModel(body).subscribe((data) => {
                        // console.log("Se ingreso un modelo")
                    });
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }

    procesoVin(req) {
      let repetido = this.buscarDatoRepetidoenDB(req);
      if(repetido) {
        this._vinService.crearVin(req).subscribe(
              async (data) => {
                  // console.log("El vin se creo");

              },
              (error) => {
                  // console.log("Actulizando vin");
              }
        )
      } else {
        this._vinService.actualizarVin(req).subscribe(
          (data) => {
              // console.log("Vin actualizado");
          },
          (error) => {
              // console.log("Vin NO actualizado")
              // console.log(error);
          }
        )
      }
    }

    formatoDat(renglon) {
        renglon = renglon.split(' ').join('');
        let conces: boolean = false;
        let columna: string = '';
        let renglonExcel = [];
        let particion;

        for (let i = 0; i < renglon.length; i++) {
            columna += renglon.charAt(i);
            /* FECHA    CDO    DEALER    MODELID    AÑO   VIN    */
            if (i == 9 || i == 15 || i == 20 || i == 25 || i == 29 || i == 46) {
                renglonExcel.push(columna);
                columna = '';
            }
            if (i >= 47) {
                if (isNaN(renglon.charAt(i))) {
                    // conces = true;
                    // console.log(renglon.slice(i))
                    particion = renglon.slice(i);
                    // console.log(particion + " y "+ i);
                    columna = '';
                    let finFlotilla = 0;
                    let flotilla = true;

                    for (let j = 0; j < particion.length; j++) {
                        columna += particion.charAt(j);
                        if (!isNaN(particion.charAt(j)) && flotilla == true) {
                            flotilla = false; /*Termino el texto raro*/
                            // borramos el ultimo caracter que activo el if
                            columna = columna.slice(0, -1);
                            renglonExcel.push(columna);
                            columna = '';
                            // columna += particion.charAt(j);
                            // j+=1
                            // indice de donde termino la flotilla
                            // finFlotilla = j;
                            j--;
                            particion = particion.slice(j);
                            j = 0;
                        } else if (flotilla == false) {
                            if (
                                j == finFlotilla + 5 ||
                                j == finFlotilla + 12 ||
                                j == finFlotilla + 27 ||
                                j == finFlotilla + 37
                            ) {
                                renglonExcel.push(columna);
                                columna = '';
                            }
                        }
                        if (j == particion.length - 1) {
                            renglonExcel.push(columna);
                            columna = '';
                        }
                    }
                } else {
                    particion = renglon.slice(i);
                    renglonExcel.push(' ');
                    columna = '';
                    for (let j = 0; j < particion.length; j++) {
                        columna += particion.charAt(j);
                        if (j == 4 || j == 11 || j == 26 || j == 36) {
                            renglonExcel.push(columna);
                            columna = '';
                        }
                        if (j == particion.length - 1) {
                            // renglon = renglon.split('\r').join('');
                            renglonExcel.push(columna);
                            columna = '';
                        }
                    }
                }
                i = renglon.length;
            }
        }
        // console.log(renglonExcel);
        return renglonExcel;
    }

    subirTxt(datos) {
        for (let renglon of datos) {
            let req = {
                idlocalidadUsuario: '',
                vin: renglon[5],
                truckId: '',
                model: 'EQUINOX',
                origin: '',
                dealer: '',
                weight: 0,
                modelId: renglon[3],
                truckDriver: '',
                carrier: '',
                buqueViaje: '',
                puertoDescarga: '',
                destinoFinal: '',
                eta: '',
                demandArea: '',
                rampa: '',
                mode: 'MADRINA'
            };

            let req2 = {
                fecha_venta: renglon[0],
                cdo: renglon[1],
                dealer: renglon[2],
                model_id: renglon[3],
                anio_model: renglon[4],
                vin: renglon[5],
                conces: renglon[6],
                ventaDirecta: renglon[7],
                anio_mod: renglon[8],
                orden_venta: renglon[9],
                pedimento: renglon[10],
                fecha_ped: renglon[11],
                color: renglon[12]
            };
            this.procesoVin(req);

            this._vinService.ingresoDat(req2).subscribe(
                (data) => {
                    // console.log("Ingreso dat correcto");
                    this.datosAceptados.push("{vin:" + req2.vin +"}");
                },
                (error) => {
                    // console.log("ingreso gm malo");
                    this.datosRechazados.push("{vin:" + req2.vin +"}");
                    // console.log(error);
                }
            );
        }
        this.fileReady = false;
    }

    modalArchivos() {
        const modalRef = this.modalService.open(ModalArchivosSubidosComponent, {
            size: 'xl',
            scrollable: true,
            windowClass: 'myCustomModalClass'
        });
        let data = {
          datosAceptados: this.datosAceptados,
          datosRechazados: this.datosRechazados
        }
        modalRef.componentInstance.data = data;
    }

    tablaPreview() {
        for (let i = 0; i < 10; i++) {
            this.preview[i] = this.data[i];
        }
        this.fileReady = true;
    }

    buscarDatoRepetidoenDB(datosEntrada){
      let data2 = this.sabana[0];
      let repetido = false;
        for(let j = 0; j < data2.length; j++){
          if(datosEntrada.vin != data2[j].vin){
            //  this.datosAceptados[i] = datosEntrada[i];
             j = data2.length;
             repetido = true;
          }
        }
        return repetido
    }
}
