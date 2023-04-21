import express, { Router } from 'express';
import EmpleadoController   from '../controllers/EmpleadosController';

class EmpleadoRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', EmpleadoController.list);
        this.router.post('/crear', EmpleadoController.create);
        this.router.post('/actualizar', EmpleadoController.update);
        this.router.delete('/:cveEmpleado', EmpleadoController.delete);
        this.router.get('/buscarEmpleado/:cadena', EmpleadoController.buscarPatronEmpleado);
        this.router.get('/buscarEmpleadoEspecifico/:cadena', EmpleadoController.buscarEmpleado);
    }
}

export default new EmpleadoRoutes().router;