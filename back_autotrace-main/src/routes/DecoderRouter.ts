import express, { Router } from 'express';
import DecoderController  from '../controllers/DecoderController';

class DecoderRoutes{
    router:Router=Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', DecoderController.actualizarDecoder);
    }
}
export default new DecoderRoutes().router;