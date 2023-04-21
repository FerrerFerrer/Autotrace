import express, { Router } from 'express';
import Decoder57Controller  from '../controllers/Decoder57Controller';

class Decoder57Routes{
    router:Router=Router();
    constructor(){
        this.config();
    }


    config(){
        this.router.get('/', Decoder57Controller.list);
        this.router.post('/insertar', Decoder57Controller.insertarDigito5_7);
        this.router.post('/actualizar', Decoder57Controller.actualizarDigito5_7);
        this.router.delete('/:cve_digito', Decoder57Controller.delete);
        this.router.get('/buscarPatronDigito5_7/:cadena', Decoder57Controller.buscarPatronDigito5_7);
        this.router.get('/buscarDigito5_7/:claveDigito', Decoder57Controller.buscarDigito5_7);
        

    }
}
export default new Decoder57Routes().router;