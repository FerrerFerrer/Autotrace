import express, { Router } from 'express';
import RolController   from '../controllers/RolController';

class RolRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', RolController.list);
    }

}

export default new RolRoutes().router;