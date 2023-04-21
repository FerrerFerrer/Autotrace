import express, { Router } from 'express';
import Decoder11Controller  from '../controllers/Decoder11Controller';

class Decoder11Routes{
    router:Router=Router();
    constructor(){
        this.config();
    }


    config(){
        this.router.get('/', Decoder11Controller.list);
        this.router.post('/insertar', Decoder11Controller.insertarDigito11);
        this.router.post('/actualizar', Decoder11Controller.actualizarDigito11);
        this.router.delete('/:cve_digito', Decoder11Controller.delete);
        this.router.get('/buscarPatronDigito11/:cadena', Decoder11Controller.buscarPatronDigito11);
        this.router.get('/buscarDigito11/:claveDigito', Decoder11Controller.buscarDigito11);
        

    }
}
export default new Decoder11Routes().router;