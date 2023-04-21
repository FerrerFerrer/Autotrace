import express, { Router } from 'express';

import LocalidadesProveedoresController from '../controllers/LocalidadesProveedoresController';

class LocalidadesProveedoresRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:idproveedor', LocalidadesProveedoresController.obtenerLocalidadesProveedor);
        this.router.get('/sinlocalidad/:idproveedor', LocalidadesProveedoresController.obtenerLocalidadesNoProveedor);
        this.router.post('/', LocalidadesProveedoresController.create);
        this.router.delete('/:idproveedor/:idlocalidad', LocalidadesProveedoresController.delete);
    }
}

export default new LocalidadesProveedoresRoutes().router;