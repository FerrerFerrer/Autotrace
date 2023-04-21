import express, { Router } from 'express';
import TipoDanioController   from '../controllers/TipoDanioController';

class TipoDanioRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', TipoDanioController.list);
        this.router.post('/', TipoDanioController.insertarActualizarTipoDanio);
        this.router.post('/actualizar', TipoDanioController.actualizarTipoDanio);
        this.router.delete('/:cve_tipoDanio', TipoDanioController.delete);
        this.router.get('/buscarPatronTipoDanio/:cadena', TipoDanioController.buscarPatronTipoDanio);

        this.router.get('/datos/:fechaInicio/:fechaFinal', TipoDanioController.datosTipoDanio);
    }

}

export default new TipoDanioRoutes().router;