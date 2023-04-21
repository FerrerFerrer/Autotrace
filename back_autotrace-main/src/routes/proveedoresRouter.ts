import express, { Router } from 'express';
import ProveedoresController from '../controllers/ProveedoresController';

class ProveedoresRouter{
    router: Router = Router();

    constructor(){
        this.config();
    }
    config(){
        this.router.get('/', ProveedoresController.list);
        this.router.get('/:id', ProveedoresController.getOne);
        this.router.get('/buscar/:cadena', ProveedoresController.buscarPatronProveedor);

        this.router.post('/', ProveedoresController.create);
        this.router.put('/:id', ProveedoresController.update);
        this.router.delete('/:id', ProveedoresController.delete);
    }
}

export default new ProveedoresRouter().router;