import express, { Router } from 'express';
import TipoServicioController from '../controllers/TipoServicioController';

class TipoServicioRouter{
    router : Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', TipoServicioController.list);
        this.router.post('/insertarTipoServicio/', TipoServicioController.insertarTipoServicio);
        this.router.post('/actualizarTipoServicio/', TipoServicioController.actualizarTipoServicio);
        this.router.get('/buscarTipoServicio/:idtipoServicio', TipoServicioController.buscarTipoServicio);
        this.router.get('/buscarPatronTipoServicio/:cadena', TipoServicioController.buscarPatronTipoServicio);
        this.router.post('/eliminarTipoServicio/', TipoServicioController.eliminarTipoServicio);
        this.router.post('/actualizarEstadoTipoServicio/', TipoServicioController.actualizarEstadoTipoServicio);
        this.router.get('/obtenerEstadoSiguiente/:idtipoServicio/:idUsuario', TipoServicioController.obtenerEstadoSiguiente);
        this.router.get('/activiadesXcliente/:pa_idcliente/:pa_idtipoServicio', TipoServicioController.listActividadesXCliente);
        this.router.get('/activiadesXclienteNo/:pa_idcliente/:pa_idtipoServicio', TipoServicioController.listActividadesXClienteNo);
        this.router.post('/actualizarCotizacionServicio/', TipoServicioController.actualizarCotizacionServicio);
        this.router.post('/insertarActividadTipoServicio/', TipoServicioController.insertarActividadTipoServicio);
        this.router.post('/eliminarActividadTipoServicio/', TipoServicioController.eliminarActividadTipoServicio);
        this.router.get('/asignado/:idusuario', TipoServicioController.obtenerTodosServiciosPorUsuario);
    }
} 

export default new TipoServicioRouter().router;