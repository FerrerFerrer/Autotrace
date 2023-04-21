import express, { Router } from 'express';
import TipoReparacionController   from '../controllers/TipoReparacionController';

class TipoReparacionRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', TipoReparacionController.list);
        this.router.post('/', TipoReparacionController.insertarActualizarTipoReparacion);
        this.router.post('/actualizar/', TipoReparacionController.actualizarTipoReparacion);
        this.router.delete('/:cve_tiporeparacion', TipoReparacionController.delete);
        this.router.get('/buscarPatronTipoReparacion/:cadena', TipoReparacionController.buscarPatronTipoReparacion);
        this.router.get('/datos/:fechaInicio/:fechaFinal', TipoReparacionController.datosTipoReparacion);
    }

}

export default new TipoReparacionRoutes().router;