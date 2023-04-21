import express, { Router } from 'express';
import InventarioEtiquetasController   from '../controllers/InventarioEtiquetasController';

class InventarioEtiquetasRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', InventarioEtiquetasController.list);
        this.router.get('/buscar/:cadena', InventarioEtiquetasController.buscarInventario);
        this.router.post('/crear', InventarioEtiquetasController.crearInventarioEtiqueta);
        this.router.put('/actualizar/:cveInventario', InventarioEtiquetasController.actualizarInventarioEtiqueta);
        this.router.delete('/:cveInventario', InventarioEtiquetasController.borrarInventario);
    }

}

export default new InventarioEtiquetasRoutes().router;