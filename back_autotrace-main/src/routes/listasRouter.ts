import express, { Router } from 'express';

import listaController from '../controllers/ListaController';

class ListaRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:estado', listaController.tableDefaultList);
        this.router.get('/busqueda/:nombreLista/:fechaInicial/:fechaFinal/:estado', listaController.busquedaLista);
        this.router.get('/vinsLista/:id', listaController.vinsDeLista);
        this.router.get('/listaVinsIngresos/:lista', listaController.listaVinsIngresos);

        this.router.post('/', listaController.create);
        this.router.post('/insertarVinLista/', listaController.insertarVinLista);
        this.router.post('/actualizarVinEncontrado', listaController.actualizarVinEncontrado);

        this.router.put('/cambiarestado/:id', listaController.cambiarEstadoLista);
        this.router.put('/hold/:idlista', listaController.holdMasivo);
    } 
}

export default new ListaRoutes().router;