import express, { Router } from 'express';
import ProcesoController   from '../controllers/ProcesoController';

class ProcesoRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', ProcesoController.list);
        this.router.post('/actualizar', ProcesoController.update);
    }
}
    
export default new ProcesoRoutes().router;