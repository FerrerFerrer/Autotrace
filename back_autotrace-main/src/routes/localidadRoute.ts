import express, { Router } from 'express';

import localidadesController from '../controllers/localidadesController';

class LocalidadesRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', localidadesController.list);
        this.router.get('/:id', localidadesController.getOne);
        this.router.get('/buscar/:cadena', localidadesController.buscarPatronLocalidad);
        this.router.post('/', localidadesController.create);
        this.router.post('/actualizar', localidadesController.update);
        this.router.delete('/:id', localidadesController.delete);
    }
 
}

export default new LocalidadesRoutes().router;