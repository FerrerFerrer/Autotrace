import express, { Router } from 'express';
import Decode13Controller  from '../controllers/Decoder13Controller';

class Decoder13Routes{
    router:Router=Router();
    constructor(){
        this.config();
    }


    config(){
        this.router.get('/', Decode13Controller.list);
        this.router.post('/insertar', Decode13Controller.insertarDigito1_3);
        this.router.post('/actualizar', Decode13Controller.actualizarDigito1_3);
        this.router.delete('/:cve_digito', Decode13Controller.delete);
        this.router.get('/buscarPatronDigito1_3/:cadena', Decode13Controller.buscarPatronDigito1_3);
        this.router.get('/buscarDigito1_3/:claveDigito', Decode13Controller.buscarDigito1_3);
        

    }
}
export default new Decoder13Routes().router;