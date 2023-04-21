import express, { Router } from 'express';
import GeocercasController from '../controllers/GeocercasController';

class GeocercasRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:id', GeocercasController.geocercasLocalidad);
        this.router.get('/subtotales/:id', GeocercasController.subtotalesGeocercas);
        this.router.get('/busqueda_vin/:idlocalidad/:vin', GeocercasController.busqueda_vin);
        this.router.get('/busqueda_tipoServicio/:idlocalidad/:tipoServicio', GeocercasController.busqueda_tipoServicio);
        this.router.get('/puntos/:id', GeocercasController.getPuntosPoligono);
        this.router.get('/ubicaciones/:idLocalidad', GeocercasController.ubicacionVin);
        this.router.get('/geocercaList/:idlista', GeocercasController.obtenerGeocercasLista);
        this.router.get('/vinGeocerca/:idgeocerca', GeocercasController.vinporGeocerca);
        this.router.get('/busqFiltradaMapDist/:fechaInicio/:fechaFin/:geocerca/:tipoServicio/:estadoProceso/:localidad', GeocercasController.busqFiltradaMapDist);
        this.router.get('/listaVinsMapDistribucion/:lista/:localidad', GeocercasController.listaVinsMapDistribucion);
        this.router.post('/listaVinsMapDistribucionV2', GeocercasController.listaVinsMapDistribucionV2);

        this.router.get('/busqFiltradaHistorial/:fechaInicio/:fechaFin/:geocerca/:tipoServicio/:estadoProceso/:localidad', GeocercasController.busqFiltradaHistorial);
        this.router.get('/listaVinsHistorial/:lista/:localidad', GeocercasController.listaVinsHistorial);
        this.router.post('/listaVinsHistorialV2', GeocercasController.listaVinsHistorialV2);

        this.router.get('/geocercasMapaDistribucion/:fechaInicio/:fechaFin/:geocerca/:tipoServicio/:estadoProceso', GeocercasController.geocercasMapaDistribucion);
        this.router.get('/geocercasListaVins/:lista', GeocercasController.geocercasListaVins);
        this.router.post('/geocercasListaVinsV2', GeocercasController.geocercasListaVinsV2);

        this.router.get('/buscar/:cadena', GeocercasController.buscar);
        this.router.get('/', GeocercasController.getAll);

        this.router.post('/', GeocercasController.createGeocerca);
        this.router.post('/puntos', GeocercasController.createPuntoPoligono);

        this.router.delete('/puntos/:idgeocerca', GeocercasController.deletePuntosPoligono);

        this.router.put('/cambiar/estatus/:idgeocerca/:activo', GeocercasController.cambiarActivoInactivoGeocerca);
        this.router.put('/:idgeocerca', GeocercasController.updateGecerca);
        
        this.router.delete('/geocerca/:idgeocerca', GeocercasController.deleteGeocerca);
        this.router.get('/listarGeocercasLocalidad/:idlocalidad', GeocercasController.listarGeocercasLocalidad);

    }

}

export default new GeocercasRoutes().router;