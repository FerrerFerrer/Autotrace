import express, { Router } from 'express';
import SeveridadFactorDanioController   from '../controllers/SeveridadFactorDanioController';

class TipoDanioRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', SeveridadFactorDanioController.list);
        this.router.get('/buscar/:cadena', SeveridadFactorDanioController.buscarPatronSeveridadFDanio);
        this.router.post('/', SeveridadFactorDanioController.insertarActualizarSeveridadFactorDanio);
        this.router.post('/actualizar/', SeveridadFactorDanioController.actualizarSeveridadFactorDanio);
        this.router.delete('/:cve_severidadFDanio', SeveridadFactorDanioController.delete);

        this.router.get('/datos/:fechaInicio/:fechaFinal', SeveridadFactorDanioController.datosSeveridad);
    }

}

export default new TipoDanioRoutes().router;