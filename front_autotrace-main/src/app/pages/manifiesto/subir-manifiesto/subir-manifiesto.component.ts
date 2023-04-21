import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import bsCustomFileInput from 'bs-custom-file-input';
import Swal from 'sweetalert2';

import { ClientesService } from '@services/clientes.service';
import { ManifiestoService } from '@services/manifiesto.service';
import { UsuarioServiceService } from '@services/usuario-service.service';
import { VinService } from '@services/vin.service';
import { data } from 'jquery';

type AOA = [][];
@Component({
    selector: 'app-subir-manifiesto',
    templateUrl: './subir-manifiesto.component.html',
    styleUrls: ['./subir-manifiesto.component.scss']
})
export class SubirManifiestoComponent implements OnInit {
    user: any = null;
    listClientes: any[] = [];
    listManifiestosExistentes: any[] = [];
    mostrarTablaNoProcesados: boolean = false;
    mostrarTablaProcesados: boolean = false;

    formSubirManifiesto: FormGroup;

    dtOptions: any = {};
    dtOptions2: any = {};
    data: AOA;
    datos: any[] = [];
    wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
    fileName: string = 'SheetJS.xlsx';
    contadorEncabezados: number = 0;
    layout: boolean = false;
    almacenados: number = 0;
    procesados: number = 0;
    tablaAlmacenados: any[] = [];
    tablaNoAlmacenados: any[] = [];

    title = 'XlsRead';
    file: File;
    arrayBuffer: any;
    arraylist: any;

    encabezados = [
        'VIN',
        'Model',
        'Dealer',
        'Nomeclature',
        'Weight KGS',
        'Plant of Origin',
        'FOB Price (USD)',
        'Ocean Freight',
        'TOTAL (CFR)',
        'LOC'
    ];

    constructor(
        private _clientesService: ClientesService,
        private _manifiestoService: ManifiestoService,
        private _userService: UsuarioServiceService,
        private _vinService: VinService,
        private fb: FormBuilder
    ) {
        this.formSubirManifiesto = this.fb.group({
            Buque: ['', [Validators.required, Validators.maxLength(100)]],
            Viaje: ['', [Validators.required, Validators.maxLength(100)]],
            FechaBuque: [''],
            IdCliente: [Validators.required],
            archivo: ['']
        });
    }

    ngOnInit(): void {
        this.user = this._userService.getCurrentUser();
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

        this.dtOptions2 = {
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

        bsCustomFileInput.init();
        this.obtenerClientes();
        this.obtenerManifiestos();
    }

    cancelarSubida() {
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Subida cancelada',
            showConfirmButton: false,
            timer: 1500
        });
    }

    onFileChange(evt: any) {
        this.datos = [];
        this.data = [];

        /* wire up file reader */
        const target: DataTransfer = <DataTransfer>evt.target;
        if (target.files.length !== 1)
            throw new Error('Cannot use multiple files');
        const reader: FileReader = new FileReader();

        reader.onload = (e: any) => {
            /* read workbook */
            const bstr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

            /* grab first sheet */
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];

            /* save data */
            this.data = <AOA>XLSX.utils.sheet_to_json(ws, { header: 1 });
            console.log(this.data);
            for (let fila = 1; fila < this.data.length; fila++) {
                let columna0 = 0;
                let columna1 = 1;
                let columna2 = 2;
                let columna3 = 3;
                let columna4 = 4;
                let columna5 = 5;
                let columna6 = 6;
                let columna7 = 7;
                let columna8 = 8;
                let columna9 = 9;
                let modelsinespacio: string = this.data[fila][columna1];
                this.datos.push({
                    vin: this.data[fila][columna0],
                    model: modelsinespacio,
                    dealer: this.data[fila][columna2],
                    Nomenclature: this.data[fila][columna3],
                    WeightKGS: this.data[fila][columna4],
                    PlantofOrigin: this.data[fila][columna5],
                    FOBPriceUSD: this.data[fila][columna6],
                    OceanFreight: this.data[fila][columna7],
                    TOTALCRF: this.data[fila][columna8],
                    LOC: this.data[fila][columna9]
                });
            }



            //Contar encabezado
            for (let index = 0; index < this.data[0].length; index++) {
                if (this.data[0][index] == this.encabezados[index]) {
                    this.contadorEncabezados = this.contadorEncabezados + 1;
                    console.log(this.contadorEncabezados)
                } else {
                    console.log(this.data[0][index]);
                }
            }
        };
        reader.readAsBinaryString(target.files[0]);
    }

    validarVins() {
        this.tablaAlmacenados = [];
        this.tablaNoAlmacenados = [];
        this.procesados = 0;
        this.almacenados = 0;

        if (this.contadorEncabezados < 10) {
            console.log(this.contadorEncabezados);
            Swal.fire(
                'Error!',
                'Los encabezados del archivo seleccionado estan mal',
                'error'
            )
        } else {
            let usar2 = 0;
            for (var index in this.datos) {
                const test = index;

                if (
                    this.validarTamanioVin(this.datos[test]) &&
                    this.validarAlfanumerico(this.datos[test])
                ) {
                    this._vinService.getOne(this.datos[test].vin).subscribe(
                        (data) => {
                            console.log("dentro de getOne");
                            this.tablaAlmacenados.push(this.datos[test]);
                            this._vinService
                                .manifiesto(this.datos[test])
                                .subscribe((data) => { });

                            usar2++;
                            console.log("usar2: " + usar2);
                            if (Number(usar2) == this.datos.length) {
                                console.log("final del arreglo");
                                this.procesados = this.datos.length;
                                this.almacenados = this.tablaAlmacenados.length;
                                this.mostrarTablaNoProcesados = false;
                                this.mostrarTablaProcesados = false;

                                if (this.tablaAlmacenados.length > 0) {
                                    const body: any = {
                                        idusuario: this.user.idusuario,
                                        tipoEvento: 'Ingreso',
                                        resultado: this.almacenados + ' VINs'
                                    };
                                    this._vinService
                                        .bitacora(body)
                                        .subscribe((data) => { });

                                    const bodyManifiesto: any = {
                                        buque: this.formSubirManifiesto.get('Buque')?.value,
                                        viaje: this.formSubirManifiesto.get('Viaje')?.value,
                                        fechaBuque: this.formSubirManifiesto.get('FechaBuque')?.value,
                                        localidad: Number(localStorage.getItem('idlocalidad')),
                                        vins_csv: this.procesados,
                                        vins_pendientes_procesar: this.almacenados
                                    };

                                    this._manifiestoService.crearManifiesto(bodyManifiesto).subscribe((data) => {
                                        console.log("dentro de crear manifiesto");
                                        const id =
                                            data['id'][0]['idManifiestoInsertada'];
                                        for (
                                            let index = 0;
                                            index <
                                            this.tablaAlmacenados.length;
                                            index++
                                        ) {
                                            let actualizarVin: any = {
                                                idmanifiesto: id
                                            };
                                            this._vinService.actualizarVinManifiesto(
                                                actualizarVin, this.tablaAlmacenados[index].vin).
                                                subscribe((data) => {
                                                    console.log("dentro de actualiazrVinmanifiesto");
                                                    this.mostrarTablaNoProcesados = true;
                                                    this.mostrarTablaProcesados = true;
                                                    console.log(data);
                                                });
                                        }
                                    });
                                }
                            }
                        },
                        (error) => {
                            console.log("El vin no existe");
                            usar2++;
                            this.tablaNoAlmacenados.push({
                                vin: this.datos[index].vin,
                                validacion: 'El VIN no existe'
                            });

                            if (Number(usar2) == this.datos.length) {
                                this.procesados = this.datos.length;
                                this.almacenados = this.tablaAlmacenados.length;
                                this.mostrarTablaNoProcesados = true;
                                this.mostrarTablaProcesados = true;

                                if (this.tablaAlmacenados.length > 0) {
                                    const body: any = {
                                        idusuario: this.user.idusuario,
                                        tipoEvento: 'Ingreso',
                                        resultado: this.almacenados + ' VINs'
                                    };
                                    this._vinService
                                        .bitacora(body)
                                        .subscribe((data) => { });

                                    const bodyManifiesto: any = {
                                        buque: this.formSubirManifiesto.get(
                                            'Buque'
                                        )?.value,
                                        viaje: this.formSubirManifiesto.get(
                                            'Viaje'
                                        )?.value,
                                        fechaBuque:
                                            this.formSubirManifiesto.get(
                                                'FechaBuque'
                                            )?.value,
                                        localidad: Number(
                                            localStorage.getItem('idlocalidad')
                                        ),
                                        vins_csv: this.procesados,
                                        vins_pendientes_procesar:
                                            this.almacenados,
                                        vins_segregados: 0,
                                        vins_salidas: 0,
                                        vins_inspeccion_muelle: 0,
                                        estado: 'Abierto'
                                    };

                                    this._manifiestoService
                                        .crearManifiesto(bodyManifiesto)
                                        .subscribe((data) => {
                                            const id =
                                                data['id'][0]['idManifiestoInsertada'];
                                            for (
                                                let index = 0;
                                                index <
                                                this.tablaAlmacenados.length;
                                                index++
                                            ) {
                                                let actualizarVin: any = {
                                                    idmanifiesto: id
                                                };
                                                this._vinService
                                                    .actualizarVinManifiesto(
                                                        actualizarVin,
                                                        this.tablaAlmacenados[
                                                            index
                                                        ].vin
                                                    )
                                                    .subscribe((data) => {
                                                        console.log(data);
                                                    });
                                            }
                                        });
                                }
                            }
                        }
                    );
                } else {
                    usar2++;

                    if (!this.validarTamanioVin(this.datos[index])) {
                        this.tablaNoAlmacenados.push({
                            vin: this.datos[index].vin,
                            validacion: 'El tamaño del vin no es correcto'
                        });
                    } else {
                        if (!this.validarAlfanumerico(this.datos[index])) {
                            this.tablaNoAlmacenados.push({
                                vin: this.datos[index].vin,
                                validacion: 'Se utilizan caracteres especiales'
                            });
                        }
                    }
                }

                if (Number(test) == this.datos.length - 1) {
                    console.log("Se concluyo recorrido array");
                }
            }
        }
    }

    syncDelay(milliseconds) {
        var start = new Date().getTime();
        var end = 0;
        while (end - start < milliseconds) {
            end = new Date().getTime();
        }
    }

    validarTamanioVin(fila: any) {
        let vin: string = fila.vin;
        console.log(fila);
        console.log(vin);
        if (vin) {
            if (vin.length == 17) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    validarAlfanumerico(fila: any) {
        let vin: string = fila.vin;
        if (vin) {
            if (!/^[a-zA-Z0-9]+$/.test(vin)) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }

    }

    obtenerClientes() {
        this._clientesService
            .getListClientes()
            .subscribe((data) => (this.listClientes = data[0]));
    }

    obtenerManifiestos() {
        this._manifiestoService
            .getManifiestosExistentes()
            .subscribe((data) => (this.listManifiestosExistentes = data));
    }
}
