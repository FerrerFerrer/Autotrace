import express, { Router } from 'express';
import TipoInventarioController  from '../controllers/TIpoInventarioController';

class TipoInventarioRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', TipoInventarioController.list);
        this.router.post('/insertar', TipoInventarioController.crearTipoInventario);
        this.router.post('/actualizar', TipoInventarioController.actualizarTipoInventario);
        this.router.delete('/:cveTipoInventario', TipoInventarioController.delete);
        this.router.get('/buscar/:cadena', TipoInventarioController.buscarPatronTipoInventario);
    }
}

export default new TipoInventarioRoutes().router;