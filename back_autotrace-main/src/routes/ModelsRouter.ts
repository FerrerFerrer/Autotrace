import express, { Router } from 'express';
import ModelController   from '../controllers/ModelsController';

class ModelRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', ModelController.list);
        this.router.post('/crear', ModelController.create);
        this.router.post('/actualizar', ModelController.update);
        this.router.delete('/eliminar/:model/:idcliente', ModelController.delete);       
        this.router.get('/buscarModelEspecifico/:model/:idcliente ', ModelController.buscarModel);
        this.router.get('/buscarModel/:cadena', ModelController.buscarPatronModel);
    }
}

export default new ModelRoutes().router;