import express, { Router } from 'express';
import HerramientasController from '../controllers/HerramientasController';

class HerramientasRouter{
    router: Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', HerramientasController.list);
        this.router.get('/buscar/:cveHerramienta', HerramientasController.buscarHerramienta)

        this.router.post('/crear', HerramientasController.crearHerramienta);
        this.router.post('/actualizar', HerramientasController.actualizarHerramienta);

        this.router.delete('/:cveHerramienta', HerramientasController.eliminarHerramienta);
    }
}

export default new HerramientasRouter().router;