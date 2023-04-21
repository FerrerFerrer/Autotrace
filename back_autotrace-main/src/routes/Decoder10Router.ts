import express, { Router } from 'express';
import Decoder10Controller  from '../controllers/Decoder10Controller';

class Decoder10Routes{
    router:Router=Router();
    constructor(){
        this.config();
    }


    config(){
        this.router.get('/', Decoder10Controller.list);
        this.router.post('/insertar', Decoder10Controller.insertarDigito10);
        this.router.post('/actualizar', Decoder10Controller.actualizarDigito10);
        this.router.delete('/:cve_digito', Decoder10Controller.delete);
        this.router.get('/buscarPatronDigito10/:cadena', Decoder10Controller.buscarPatronDigito10);
        this.router.get('/buscarDigito10/:claveDigito', Decoder10Controller.buscarDigito10);
        

    }
}
export default new Decoder10Routes().router;