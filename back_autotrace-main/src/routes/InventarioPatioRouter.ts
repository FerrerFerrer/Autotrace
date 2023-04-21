import express, { Router } from 'express';

import InventarioPatioController from '../controllers/InventarioPatioController';

class InventarioPatioRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/obtenerInventarioPatio/:hold/:marca/:geocercas/:localidad', InventarioPatioController.obtenerInventarioPatio);
        this.router.get('/obtenerInventarioTransito/:marca/:tipoServicio/:idLocalidad', InventarioPatioController.obtenerInventarioTransito);
        this.router.get('/listaVins/:lista/:idLocalidad', InventarioPatioController.obtInventarioTransitoListaVins);
        this.router.post('/listaVinsV2', InventarioPatioController.obtInventarioTransitoListaVinsV2);
        this.router.get('/datosPlacard/lista/:lista', InventarioPatioController.datosPlacardsXListaVins);
        this.router.post('/cajon/ocupar', InventarioPatioController.ocuparCajon);
        this.router.post('/cajon/desocupar', InventarioPatioController.desocuparCajon);
        this.router.get('/cajon/mostrar/:vin', InventarioPatioController.MostrarCajon);                    
    }
}

export default new InventarioPatioRoutes().router;