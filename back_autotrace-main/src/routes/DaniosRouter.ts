import express, { Router } from 'express';
import DanioController   from '../controllers/DanioController';
import multer from '../lib/multer';

class DanioRouter{
    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.post('/crear', multer.single('image'), DanioController.crearDanio);
        this.router.post('/crearDanioApp', multer.single('image'), DanioController.crearDanioApp);
        this.router.post('/crear/fotografia', multer.single('image'), DanioController.insertarFotografiaDanio);
        this.router.put('/actualizar/:idDanio', DanioController.actualizarDanio);
        this.router.put('/actualizarDanioApp', DanioController.actualizarDanioApp);

        this.router.get('/:iddanio', DanioController.getAllFotografiasDanio);
        this.router.get('/busqFiltradaListaDanios/:fechaIni/:fechaFin/:cliente/:areaDanio/:tipoDanio/:danioEstado/:geocercas/:idLocalidad', DanioController.busqFiltradaListaDanios);
        this.router.get('/busqFiltradaXVinsDanios/:lista/:idLocalidad', DanioController.busqFiltradaXVinsDanios);
        this.router.post('/busqFiltradaXVinsDaniosV2', DanioController.busqFiltradaXVinsDaniosV2);

        this.router.get('/consultaDetallesDanio/:vin',DanioController.consultaDetallesDanio);
        this.router.get('/ubicacionActualVin/:vin',DanioController.ubicacionActualVin);

        this.router.get('/datos/clasificacion/:fechaInicio/:fechaFinal/:clasificacion', DanioController.dañosclasificacion);
        this.router.get('/datos/estatus/:fechaInicio/:fechaFinal', DanioController.dañosEstatus);
        this.router.get('/datos/responsable/:fechaInicio/:fechaFinal', DanioController.datosResponsable);

        this.router.post('/exportExcel', DanioController.exportarDaniosExcel);

    }

}

export default new DanioRouter().router;