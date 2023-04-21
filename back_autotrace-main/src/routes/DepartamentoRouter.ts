import express, { Router } from 'express';
import DepartamentoController  from '../controllers/DepartamentoController';

class DepartamentoRoutes{
    router:Router=Router();
    constructor(){
        this.config();
    }


    config(){
        this.router.get('/', DepartamentoController.list);
        this.router.post('/insertar', DepartamentoController.insertarDepartamento);
        this.router.post('/actualizar', DepartamentoController.actualizarDepartamento);
        this.router.delete('/:pa_cveDepartamento', DepartamentoController.delete);
        this.router.get('/buscarPatronDepartamento/:cadena', DepartamentoController.buscarPatronDepartamento);

    }
}
export default new DepartamentoRoutes().router;