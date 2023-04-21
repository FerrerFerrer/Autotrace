import express, { Router } from 'express';
import DanioEstadoController from '../controllers/DanioEstadoController';

class DanioEstadoRouter{
    router: Router = Router();

    constructor(){
        this.config();
    }
    config(){
        this.router.get('/', DanioEstadoController.list);
    }
}

export default new DanioEstadoRouter().router;