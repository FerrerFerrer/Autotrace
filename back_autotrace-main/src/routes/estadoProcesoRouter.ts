import express, { Router } from 'express';
import EstadoProcesoController from '../controllers/EstadoProcesoController';

class EstadoProcesoRouter{
    router: Router = Router();

    constructor(){
        this.config();
    }
    config(){
        this.router.get('/', EstadoProcesoController.list);
        this.router.post('/updateEstadoProceso', EstadoProcesoController.actualizarEstadoProcesoVins);

    }
}

export default new EstadoProcesoRouter().router;