import express, { Router } from 'express';
import AreaDanioController   from '../controllers/AreaDanioController';

class AreaDanioRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', AreaDanioController.list);
        this.router.post('/', AreaDanioController.insertarActualizarAreaDanio);
        this.router.post('/actualizar', AreaDanioController.actualizarAreaDanio);
        this.router.delete('/:cve_areadanio', AreaDanioController.delete);
        this.router.get('/buscarPatronAreaDanio/:cadena', AreaDanioController.buscarPatronAreaDanio);
        
        this.router.get('/datos/area/:fechaInicio/:fechaFinal', AreaDanioController.datosArea);
        this.router.get('/datos/area/adicional/:fechaInicio/:fechaFinal', AreaDanioController.datosAreaAdicional);
    }

}

export default new AreaDanioRoutes().router;