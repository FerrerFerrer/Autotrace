import express, { Router } from 'express';
import ReporteServiciosController from '../controllers/ReporteServiciosController';

class ReporteServiciosRouter{
    router: Router = Router();

    constructor(){
        this.config();
    }
    config(){
        this.router.get('/resumen/:fechaInicial/:fechaFinal/:localidad', ReporteServiciosController.getAll);
        this.router.get('/vins/:fecha/:idlocalidad', ReporteServiciosController.vinsReporteServicios);
    }
}

export default new ReporteServiciosRouter().router;