import express, { Router } from 'express';

import ManifiestoController from '../controllers/ManifiestoController';

class ManifiestoRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/manifiestos_existentes', ManifiestoController.manifiestosExistentes);
        this.router.get('/busqueda/:incluirCerrado/:idCliente/:fechaInicial/:fechaFinal', ManifiestoController.busquedaSegunManifiesto);
        this.router.post('/create', ManifiestoController.create);
        this.router.get('/vinsManifiesto/:idmanifiesto', ManifiestoController.vinsManifiesto);
        this.router.get('/geocercasVinsManifiesto/:idmanifiesto', ManifiestoController.geocercasVinsManifiesto);
        this.router.post('/cambiarEstado', ManifiestoController.cambiarEstadoManifiesto);
        // vinsManifiesto
        
    }
}

export default new ManifiestoRoutes().router;