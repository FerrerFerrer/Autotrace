import express, { Router } from 'express';
import ClientesController   from '../controllers/ClientesController';

class ClientesRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', ClientesController.list);
        this.router.post('/insertar', ClientesController.insertarCliente);
        this.router.post('/actualizar', ClientesController.insertarActualizarCliente);
        this.router.delete('/:idcliente', ClientesController.delete);
        this.router.get('/buscarPatronCliente/:cadena', ClientesController.buscarPatronCliente);

        this.router.get('/datos/:fechaInicio/:fechaFinal', ClientesController.datosClientes);
    }
 
}

export default new ClientesRoutes().router;