import express, { Router } from 'express';
import HistorialTarifasController from '../controllers/HistorialTarifasController';

class HistorialTarifasRouter{
    router: Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/buscar/:fechaInicio/:fechaFin/:idusuario/:tipoServicio', HistorialTarifasController.buscar);
    }
}

export default new HistorialTarifasRouter().router;