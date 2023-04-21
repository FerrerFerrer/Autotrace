import express, { Router } from 'express';
import Decoder8Controller  from '../controllers/Decoder8Controller';

class Decoder8Routes{
    router:Router=Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', Decoder8Controller.list);
        this.router.post('/insertar', Decoder8Controller.insertarDigito4);
        this.router.post('/actualizar', Decoder8Controller.actualizarDigito4);
        this.router.delete('/:cve_digito', Decoder8Controller.delete);
        this.router.get('/buscarPatronDigito8/:cadena', Decoder8Controller.buscarPatronDigito8);
        this.router.get('/buscarDigito8/:claveDigito', Decoder8Controller.buscarDigito8);
    }
}
export default new Decoder8Routes().router;