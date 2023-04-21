import express, { Router } from 'express';
import VinController from '../controllers/VinController';

class VinRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.post('/ingreso/ingreso', VinController.ingreso);
        this.router.post('/ingreso/ingresoGm', VinController.ingreso_gm_total);
        this.router.post('/manifiesto', VinController.manifiesto);
        this.router.post('/bitacora', VinController.bitacora);
        this.router.put('/actualizarVinManifiesto/:vin', VinController.actualizarVinManifiesto);
        this.router.get('/historicoServiciosVin/:vin', VinController.historicoServiciosVin);
        this.router.get('/historicoVin/:vin', VinController.historicoVin);
        this.router.get('/historialUbicacionesVin/:vin', VinController.historialUbicacionesVin);
        this.router.get('/obtenerDecoderVin/:vin', VinController.obtenerDecoderVin);
        this.router.get('/obtenerPlacard/:vin', VinController.obtenerPlacardVin);
        this.router.get('/busqFiltradaInicio/:pa_idGeocerca/:pa_tipoServicio/:pa_fechaInicio/:pa_fechaFin/:pa_conHistorico/:pa_idLocalidad', VinController.busqFiltradaInicio);
        this.router.get('/busqXVinsInicio/:pa_ListaVins/:pa_conHistorico', VinController.busqXVinsInicio);
        this.router.post('/busqXVinsInicioV2', VinController.busqXVinsInicioV2); 
        this.router.get('/vinsFacturar/:pa_fechaInicio/:pa_fechaFin/:pa_idLocalidad/:pa_usuarios', VinController.vinsFacturar);
        this.router.post('/fechaIngreso', VinController.actualizarFechaIngresoVins);
        this.router.post('/updateStatusDFY', VinController.actualizarStatusDFYVins);
        this.router.post('/updateStatusVtims', VinController.actualizarStatusVtimsVins);
        this.router.get('/filtroGraficoInicio/:idGeocerca/:idLocalidad', VinController.busqFiltradaGraficoInicio);
        this.router.get('/filtroGraficoInicioAutomatico/:idLocalidad', VinController.busqFiltradaInicioAutomatico);
        this.router.post('/model/ingresar', VinController.ingresoModel);
        this.router.get('/model/ver', VinController.getModels);
        this.router.post('/ingreso/dat', VinController.ingreso_dat);
        // endpoints para aplicacion Movil
        this.router.get('/:vin', VinController.getOne);
        this.router.get('/consulta/manifiesto/:vin', VinController.getManifiestoVin);
        this.router.get('/manifiesto/:idmanifiesto', VinController.getManifiesto);
        this.router.post('/crear/vin', VinController.createVin);
        this.router.put('/update/vin', VinController.updateVin);
        this.router.post('/vinHistorico/vinHistorico', VinController.createVinHistorico);
        this.router.put('/estatus/GM/:idservicio', VinController.updateEstatusGM);
        this.router.put('/:vin', VinController.updateVin);
        this.router.put('/manifiesto/:idmanifiesto', VinController.updateManifiesto);
        this.router.put('/vinHistorico/:idservicio', VinController.updateVinHistorico);
        this.router.get('/servicioActual/:vin', VinController.idServicioActualVin);
        this.router.get('/tipoServicioActual/:vin', VinController.tipoServicioActualVin);
        this.router.get('/todosServicios/:vin', VinController.todosServicios);
        this.router.get('/sabana/datos', VinController.sabana);

        this.router.post('/cajon/desocupar',  VinController.desocuparCajon);
        this.router.get('/cajon/mostrar/:vin',  VinController.MostrarCajon);                    
        this.router.post('/cajon/ocupar', VinController.ocuparCajon);
    }
}

export default new VinRoutes().router;