import express, { Router } from 'express';
import UbicacionDanioController   from '../controllers/UbicacionDanioController';

class UbicacionDanioRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', UbicacionDanioController.list);
        this.router.post('/', UbicacionDanioController.insertarActualizarUbicacionDanio);
        this.router.post('/actualizar', UbicacionDanioController.actualizarUbicacionDanio);
        this.router.delete('/:cve_ubicacionDanio', UbicacionDanioController.delete);
        this.router.get('/buscar/:cadena', UbicacionDanioController.buscarPatronUbicacionDanio);
        this.router.get('/datos/:fechaInicio/:fechaFinal', UbicacionDanioController.datosUbicacionDanio);
    }

}

export default new UbicacionDanioRoutes().router;