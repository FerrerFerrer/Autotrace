import express, { Router } from 'express';
import PatiosController from '../controllers/PatiosController';

class PatiosRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', PatiosController.getAll);
        this.router.get('/:cadena', PatiosController.buscar);
        this.router.get('/patiosUsuario/:idUsuario', PatiosController.patiosUsuario);
    }
   
}

export default new PatiosRoutes().router;