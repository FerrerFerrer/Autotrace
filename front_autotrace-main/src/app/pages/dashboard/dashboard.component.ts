import {
    Component,
    OnInit,
    EventEmitter,
    Output,
    Input,
    OnDestroy,
    ElementRef,
    Renderer2,
    AfterViewInit
} from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import bsCustomFileInput from 'bs-custom-file-input';
import { ModalValidacionComponent } from './modal-validacion/modal-validacion.component';
import { UsuarioServiceService } from '@services/usuario-service.service';
import { GeocercasService } from '@services/geocercas.service';
import { SelectLocalidadService } from '@services/select-localidad.service';
import { VinService } from '@services/vin.service';
import { TipoServicioService } from '@services/tipo-servicio.service';
import { Chart } from 'chart.js';
import { ModalHistorialVinComponent } from '@pages/historial/modal-historial-vin/modal-historial-vin.component';
import { Subject } from 'rxjs';
import { ListasService } from '@services/listas.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { interval, Subscription } from 'rxjs';

type AOA = [][];
const noop = () => { };

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
    mensajeSpinner: string = 'Leyendo archivo';
    cantidadProcesados = 0;
    mostrarTabla: boolean = false;
    form: FormGroup;
    formBusqueda: FormGroup;
    formListaVins: FormGroup;

    @Input() isChecked = false;
    @Output() getChange = new EventEmitter();
    value: any;
    Subir: boolean = false;
    data: AOA;
    datos: any[] = [];
    wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
    fileName: string = 'SheetJS.xlsx';
    contadorEncabezados = 0;
    layout: boolean = false;
    procesados: number;
    almacenados: number;
    tablaAlmacenados: any[] = [];
    tablaNoAlmacenados: any[] = [];
    modalOptions: NgbModalOptions;

    dtTrigger: Subject<any> = new Subject<any>();

    chart = [];
    private grafica: HTMLElement;

    user: any = null;
    geocercas: any[] = [];
    idGeocercasGrafico: any[] = [];
    subtotalesVehiculos: any[] = [];
    subtotal: any[] = [];
    public listResultBusqueda: any[] = [];

    title = 'XlsRead';
    file: File;
    arrayBuffer: any;
    arraylist: any;

    encabezados = [
        'Truck ID',
        'VIN',
        'Model',
        'Origin',
        'Dealer',
        'Weight',
        'Model ID',
        'Truck Driver',
        'Carrier',
        'Buque y viaje',
        'Puerto de Descarga',
        'destino final',
        'ETA',
        'Demand Area',
        'RAMPA',
        'MODE'
    ];

    canvas: any = null;
    donutChartCanvas: any = null;

    dtOptions: any = {};
    listTipoServicio: any[] = [];
    public geocercasList: any[] = [];
    subscription: Subscription;

    constructor(    
        private modalService: NgbModal,
        private fb: FormBuilder,
        private _geocercasService: GeocercasService,
        private _userService: UsuarioServiceService,
        public _vinService: VinService,
        private spinner: NgxSpinnerService,
        private selectService: SelectLocalidadService,

        private _tipoServicio: TipoServicioService,
        private _listasService: ListasService,
        private renderer: Renderer2,
        private elementRef: ElementRef
    ) {
        this.form = this.fb.group({
            archivo: ['', Validators.required]
        });
        this.formBusqueda = this.fb.group({
            TipoServicio: ['', Validators.required],
            Geocerca: ['', Validators.required],
            FechaInicial: ['', [Validators.required]],
            FechaFinal: ['', [Validators.required]],
            Historico: []
        });

        this.formListaVins = this.fb.group({
            listaVinsBusqueda: ['']
        });
    }

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
                    filename: 'AutoTracePDF'
                },
                'colvis'
            ],
            language: {
                url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
            }
        };

        this.modalOptions = {
            backdrop: 'static',
            backdropClass: 'customBackdrop'
        };

        this.listarGeocercasLocalidad(localStorage.getItem('idlocalidad'));
        this.user = this._userService.getCurrentUser();
        bsCustomFileInput.init();
        this.canvas = document.getElementById(
            'donutChart'
        ) as HTMLCanvasElement;
        this.donutChartCanvas = this.canvas.getContext('2d');
        this.donutChartCanvas.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
        this.subtotales(localStorage.getItem('idlocalidad'));
        this.geocercasLocalidad();
        this.obtenerTipoServicio();

        this.selectService.cambioLocalidad.subscribe((cambio) => {
            this.listarGeocercasLocalidad(localStorage.getItem('idlocalidad'));
            this.donutChartCanvas.clearRect(
                0,
                0,
                this.canvas.width,
                this.canvas.height
            );
            this.subtotales(localStorage.getItem('idlocalidad'));
            this.geocercasLocalidad();
        });



        // busquedaIncioAutomatico
        const obs = interval(5000);
        this.subscription = obs.subscribe((d) => {
            this.busquedaIncioAutomatico();
        });
    }

    public geocercasLocalidad() {
        let id = localStorage.getItem('idlocalidad');
        this._geocercasService.getSubtotales(id).subscribe(
            (data) => {
                this.subtotal = [];
                data[0].forEach((x: any) => {
                    this.subtotal.push(x);
                });
            },
            (error) => {
                console.log(error);
            }
        );
    }

    public listarGeocercasLocalidad(id: string) {
        this._geocercasService.getListGeocercasLocalidad(id).subscribe(
            (data) => {
                this.geocercasList = data;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    private onChangeCallback: (_: any) => void = noop;
    isChange(isChecked) {
        this.value = isChecked;
        this.getChange.emit(this.isChecked);
        this.onChangeCallback(this.value);
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
        //this.selectService.cambioLocalidad.unsubscribe();
        this.subscription.unsubscribe();
    }

    abrirModalHistorialVin(vin: String) {
        const modalRef = this.modalService.open(ModalHistorialVinComponent, {
            size: 'xl'
        });
        modalRef.componentInstance.titulo = 'Historial Vin';
        modalRef.componentInstance.vin = vin;
    }

    async obtenerTipoServicio() {
        this._tipoServicio.getListTipoServicio().subscribe((data) => {
            this.listTipoServicio = data[0];
        });
    }

    abrirModal() {
        const modalRef = this.modalService.open(ModalValidacionComponent, {
            scrollable: true,
            size: 'lg',
            windowClass: 'myCustomModalClass'
        });

        let data = {
            tablaNoAlmacenados: this.tablaNoAlmacenados,
            tablaAlmacenados: this.tablaAlmacenados,
            procesados: this.procesados,
            almacenados: this.almacenados
        };

        modalRef.componentInstance.fromParent = data;

    }

    isNumeric(val) {
        return /^-?\d+$/.test(val);
    }

    numeroAFecha(numeroDeDias, esExcel = false) {
        if (this.isNumeric(numeroDeDias)) {
            let diasDesde1900 = esExcel ? 25567 + 1 : 25567;
            return new Date((numeroDeDias - diasDesde1900) * 86400 * 1000);
        } else {
            return numeroDeDias;
        }
    }

    onFileChange(evt: any) {
        this.cantidadProcesados = 0;
        this.Subir = false;

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
                let columna10 = 10;
                let columna11 = 11;
                let columna12 = 12;
                let columna13 = 13;
                let columna14 = 14;
                let columna15 = 15;

                let fecha: any = this.data[fila][columna12];

                if (this.isNumeric(this.data[fila][columna12])) {
                    let diasDesde1900 = true ? 25567 + 1 : 25567;
                    fecha = new Date(
                        (this.data[fila][columna12] - diasDesde1900) *
                        86400 *
                        1000
                    );

                    let tipoFecha = fecha;
                    let anio: string;
                    let mes: string;
                    let dia: string;

                    anio = tipoFecha.getFullYear() + '';
                    mes = tipoFecha.getMonth() + 1 + '';
                    dia = tipoFecha.getDate() + '';

                    if (Number(dia) < 10) {
                        dia = '0' + dia;
                    }

                    if (Number(mes) < 10) {
                        mes = '0' + mes;
                    }

                    fecha = dia + '/' + mes + '/' + anio;
                    // console.log(fecha);
                } else {
                    fecha = this.data[fila][columna12];
                    // console.log(fecha);
                }

                let truckId: string = this.data[fila][columna0];
                let vin: string = this.data[fila][columna1];
                let model: string = this.data[fila][columna2];
                let origin: string = this.data[fila][columna3];
                let dealer: string = this.data[fila][columna4];
                let weight: string = this.data[fila][columna5];
                let ModelID: string = this.data[fila][columna6];
                let truckDriver: string = this.data[fila][columna7];
                let carrier: string = this.data[fila][columna8];
                let buqueyviaje: string = this.data[fila][columna9];
                let puertodeDescarga: string = this.data[fila][columna10];
                let destinofinal: string = this.data[fila][columna11];
                let demandArea: string = this.data[fila][columna13];
                let rampa: string = this.data[fila][columna14];
                let mode: string = this.data[fila][columna15];

                // this.datos.push({
                //     idlocalidadUsuario: localStorage.getItem('idlocalidad'),
                //     truckId: truckId.toString().trim(),
                //     vin: vin.toString().trim(),
                //     model: model.toString().trim(),
                //     origin: origin.toString().trim(),
                //     dealer: dealer.toString().trim(),
                //     weight: weight.toString().trim(),
                //     ModelID: ModelID.toString().trim(),
                //     truckDriver: truckDriver.toString().trim(),
                //     carrier: carrier.toString().trim(),
                //     buqueyviaje: buqueyviaje.toString().trim(),
                //     puertodeDescarga: puertodeDescarga.toString().trim(),
                //     destinofinal: destinofinal.toString().trim(),
                //     eta: fecha,
                //     demandArea: demandArea.toString().trim(),
                //     rampa: rampa.toString().trim(),
                //     mode: mode.toString().trim(),
                //     estado: null,
                //     fechaLiberacion: null
                // });
                this.datos.push({
                    idlocalidadUsuario: localStorage.getItem('idlocalidad'),
                    truckId: truckId.toString().trim(),
                    vin: vin.toString().trim(),
                    model: model.toString().trim(),
                    origin: origin.toString().trim(),
                    dealer: dealer.toString().trim(),
                    weight: weight.toString().trim(),
                    ModelID: ModelID.toString().trim(),
                    truckDriver: truckDriver.toString().trim(),
                    carrier: carrier.toString().trim(),
                    buqueyviaje: buqueyviaje.toString().trim(),
                    puertodeDescarga: puertodeDescarga.toString().trim(),
                    destinofinal: destinofinal.toString().trim(),
                    eta: fecha,
                    demandArea: demandArea.toString().trim(),
                    rampa: rampa.toString().trim(),
                    mode: mode.toString().trim(),
                    estado: null,
                    fechaLiberacion: null
                });

                if (fila == this.data.length - 1) {
                    // console.log(fila);
                    // console.log(this.data.length - 1);

                    this.Subir = true;
                }
            }

            //Contar encabezado

            for (let index = 0; index < this.data[0].length; index++) {
                if (this.data[0][index] == this.encabezados[index]) {
                    this.contadorEncabezados = this.contadorEncabezados + 1;
                } else {
                    // console.log(this.data[0][index]);
                }
            }
        };

        reader.readAsBinaryString(target.files[0]);
        this.mensajeSpinner = 'Procesando elementos';

        //   this.spinner.hide();
    }

    async validarVins() {
        this.tablaAlmacenados = [];
        this.tablaNoAlmacenados = [];
        this.procesados = 0;
        this.almacenados = 0;

        if (this.contadorEncabezados < 16) {
            Swal.fire({
                title: 'Validacion de encabezados',
                text: 'Verifique que los encabezados sean los siguientes: Truck ID,   VIN, Model, Origin, Dealer,Weight, Model ID, Truck Driver, Carrier, Buque y viaje, Puerto de Descarga, destino final, ETA, Demand Area, RAMPA, MODE.',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
            this.form.reset();
        } else {
            let index = 0;
            this.CargaDatosBd(index);
        }
    }

    CargaDatosBd(index) {
        this.spinner.show();
        if (
            this.validarTamanioVin(this.datos[index]) &&
            this.validarAlfanumerico(this.datos[index]) &&
            this.validarMode(this.datos[index])
        ) {
            this._vinService.ingreso(this.datos[index]).subscribe(
                (data) => {
                    this.tablaAlmacenados.push(this.datos[index]);
                    this.cantidadProcesados = this.tablaAlmacenados.length;
                    if (index + 1 < this.datos.length) {
                        this.CargaDatosBd(index + 1);
                    } else {
                        this.procesados = this.datos.length;
                        this.almacenados = this.tablaAlmacenados.length;

                        const body: any = {
                            idusuario: this.user.idusuario,
                            tipoEvento: 'Ingreso',
                            resultado: this.almacenados + ' VINs'
                        };
                        this.Subir = false;
                        this._vinService.bitacora(body).subscribe((data) => { });

                        this.spinner.hide();
                        this.abrirModal();
                    }
                },
                (error) => {
                    this.tablaNoAlmacenados.push({
                        vin: this.datos[index].vin,
                        validacion: error.error
                    });

                    if (index + 1 < this.datos.length) {
                        this.CargaDatosBd(index + 1);
                    } else {
                        this.Subir = false;
                        this.procesados = this.datos.length;
                        this.almacenados = this.tablaAlmacenados.length;

                        const body: any = {
                            idusuario: this.user.idusuario,
                            tipoEvento: 'Ingreso',
                            resultado: this.almacenados + ' VINs'
                        };
                        this._vinService.bitacora(body).subscribe((data) => { });

                        this.spinner.hide();
                        console.log(error.error);
                        this.abrirModal();
                    }
                }
            );
        } else {
            this.tablaNoAlmacenados.push({
                vin: this.datos[index].vin,
                validacion:
                    (!this.validarTamanioVin(this.datos[index])
                        ? 'El tamaño del vin no es correcto'
                        : '') +
                    ' , ' +
                    (!this.validarAlfanumerico(this.datos[index])
                        ? 'Se utilizan caracteres especiales'
                        : '') +
                    ' , ' +
                    (!this.validarMode(this.datos[index])
                        ? 'El Mode no es correcto'
                        : '')
            });
            if (index + 1 < this.datos.length) {
                this.CargaDatosBd(index + 1);
            } else {

                if (index + 1 < this.datos.length) {
                    this.CargaDatosBd(index + 1);
                } else {
                    this.Subir = false;
                    this.procesados = this.datos.length;
                    this.almacenados = this.tablaAlmacenados.length;

                    const body: any = {
                        idusuario: this.user.idusuario,
                        tipoEvento: 'Ingreso',
                        resultado: this.almacenados + ' VINs'
                    };
                    this._vinService.bitacora(body).subscribe((data) => { });

                    this.spinner.hide();
                    console.log('Error al validar vin');
                    this.abrirModal();
                }
            }
        }

    }

    validarTamanioVin(fila: any) {
        let vin: string = fila.vin;
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

    validarMode(fila: any) {
        let mode: string = fila.mode;
        if (mode) {
            if (mode.toString().trim() == 'MADRINA' || mode.toString().trim() == 'FFCC') {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    cancelarArchivo() {
        this.datos = [];
        this.data = [];
        this.contadorEncabezados = 0;
        this.form.reset();
    }

    public subtotales(id: string) {
        this.geocercas = [];
        this.idGeocercasGrafico = [];
        this.subtotalesVehiculos = [];
        this._geocercasService.getSubtotales(id).subscribe((data) => {
            for (let value of data[0]) {
                if (value === null) {
                    let canvas = document.getElementById(
                        'donutChart'
                    ) as HTMLCanvasElement;
                    let ctx = canvas.getContext('2d');
                    ctx.fillStyle = 'red';
                    ctx.font = 'bold 20px arial';
                    ctx.fillText(
                        'No se puede contabilizar el subtotal por Geocerca. No existen unidades asignadas a Geocerca',
                        50,
                        50
                    );
                    break;
                } else {
                    this.geocercas.push(
                        value.idgeocerca + '_' + value.geocerca
                    );
                    this.idGeocercasGrafico.push(value.idgeocerca);

                    this.subtotalesVehiculos.push(value.total_vehiculos);
                }
            }
            this.graficar();
        });
    }

    graficar() {
        var donutData = {
            labels: this.geocercas,

            datasets: [
                {
                    data: this.subtotalesVehiculos,
                    backgroundColor: [
                        '#f56954',
                        '#00a65a',
                        '#f39c12',
                        '#00c0ef',
                        '#3c8dbc',
                        '#d2d6de'
                    ]
                }
            ]
        };
        var donutOptions = {
            maintainAspectRatio: true,
            responsive: true
        };

        let donut = new Chart(this.donutChartCanvas, {
            type: 'doughnut',
            data: donutData,
            options: donutOptions
        });

        this.grafica =
            this.elementRef.nativeElement.querySelector('#donutChart');
        this.renderer.listen(this.grafica, 'click', (event) => {
            var activePoints = donut.getElementsAtEvent(event);

            if (activePoints.length > 0) {
                var clickedElementIndex = activePoints[0];
                let idgeocerca = clickedElementIndex['_view']['label'];
                idgeocerca = idgeocerca.split('_');

                this._vinService
                    .filtroGraficoInicio(
                        idgeocerca[0],
                        localStorage.getItem('idlocalidad')
                    )
                    .subscribe(
                        (data) => {
                            this.mostrarTabla = false;

                            this.listResultBusqueda = data[0];
                            this.mostrarTabla = true;
                        },
                        (error) => {
                            console.log(error);
                        }
                    );
            }
        });
    }

    async filtroListaVin() {
        const vins = this.formListaVins.get('listaVinsBusqueda')?.value;
        let texto_sin_enter = "'";
        for (let i = 0; i < vins.length; i++) {
            if (vins[i] === '\n' || vins[i] === '\r') {
                texto_sin_enter = texto_sin_enter + "','";
            } else {
                texto_sin_enter = texto_sin_enter + vins[i];
            }
        }
        texto_sin_enter = texto_sin_enter + "'";

        this._listasService
            .listaVinsIngresos(texto_sin_enter)
            .subscribe((data) => {
                this.listResultBusqueda = [];
                for (let value of data[0]) {
                    this.listResultBusqueda.push(value);
                }
                this.mostrarTabla = true;
                this.dtTrigger.next();
            });
    }

    buscar() {
        this.spinner.show('spinDashboardTabla');
        this.mostrarTabla = false;
        const fechaIn =
            this.formBusqueda.get('FechaInicial')?.value + ' 00:00:00';
        const fechaFin =
            this.formBusqueda.get('FechaFinal')?.value + ' 23:59:59';
        const geocerca =
            this.formBusqueda.get('Geocerca')?.value === ''
                ? 0
                : this.formBusqueda.get('Geocerca')?.value;
        const tipoServicio =
            this.formBusqueda.get('TipoServicio')?.value === ''
                ? 0
                : this.formBusqueda.get('TipoServicio')?.value;
        const historico = this.value ? 1 : 0;
        const vins = this.formListaVins.get('listaVinsBusqueda')?.value;
        var texto_sin_enter = "'";

        if (vins) {

            texto_sin_enter = texto_sin_enter + "'";
            const vinsArray = vins.split('\n');

            const body: any = {
                pa_vins: vinsArray,
                pa_conHistorico: historico,
                pa_idLocalidad: localStorage.getItem('idlocalidad')
            };

            this._vinService.busqXVinsInicioV2(body).subscribe(
                (data) => {
                    this.mostrarTabla = true;
                    this.listResultBusqueda = [];
                    data.forEach((element) => {
                        element.forEach((element2) => {
                            this.listResultBusqueda.push(element2);
                        });
                    });

                    this.spinner.hide('spinDashboardTabla');
                },
                (error) => {
                    this.spinner.hide('spinDashboardTabla');
                    console.log(error);
                }
            );
        } else {
            if (fechaFin && fechaIn) {
                if (fechaFin > fechaIn) {
                    this._vinService
                        .busqFiltradaInicio(
                            geocerca,
                            tipoServicio,
                            fechaIn,
                            fechaFin,
                            historico,
                            localStorage.getItem('idlocalidad')
                        )
                        .subscribe(
                            (data) => {
                                this.mostrarTabla = true;
                                this.listResultBusqueda = data[0];
                                this.spinner.hide('spinDashboardTabla');
                            },
                            (error) => {
                                this.spinner.hide('spinDashboardTabla');
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


    busquedaIncioAutomatico() {
        const fechaIn =
            this.formBusqueda.get('FechaInicial')?.value;
        const fechaFin =
            this.formBusqueda.get('FechaFinal')?.value;

        const geocerca =
            this.formBusqueda.get('Geocerca')?.value === ''
                ? 0
                : this.formBusqueda.get('Geocerca')?.value;

        const tipoServicio =
            this.formBusqueda.get('TipoServicio')?.value === ''
                ? 0
                : this.formBusqueda.get('TipoServicio')?.value;

        const historico = this.value ? 1 : 0;

        const vins = this.formListaVins.get('listaVinsBusqueda')?.value;

        if (fechaIn || fechaFin || geocerca != 0 || tipoServicio != 0
            || historico != 0 || vins) {

        } else {
            if (!this.mostrarTabla) {
                this.mostrarTabla = true;
            }

            this._vinService.busqFiltradaInicioAutomatico(localStorage.getItem('idlocalidad')).subscribe(
                (data) => {

                    this.listResultBusqueda = data[0];
                }, (error) => {
                    console.log(error);
                }

            )
        }



    }


}
