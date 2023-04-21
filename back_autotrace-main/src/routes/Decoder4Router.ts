import express, { Router } from 'express';
import Decoder4Controller  from '../controllers/Decoder4Controller';

class Decoder4Routes{
    router:Router=Router();
    constructor(){
        this.config();
    }


    config(){
        this.router.get('/', Decoder4Controller.list);
        this.router.post('/insertar', Decoder4Controller.insertarDigito4);
        this.router.post('/actualizar', Decoder4Controller.actualizarDigito4);
        this.router.delete('/:cve_digito', Decoder4Controller.delete);
        this.router.get('/buscarPatronDigito4/:cadena', Decoder4Controller.buscarPatronDigito4);
        this.router.get('/buscarDigito4/:claveDigito', Decoder4Controller.buscarDigito4);
        

    }
}
export default new Decoder4Routes().router;