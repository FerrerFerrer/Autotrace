import express, { Router } from 'express';

import usuariosController from '../controllers/UsuariosController';

class UsuarioRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', usuariosController.list);
        this.router.get('/:id', usuariosController.getOne);
        this.router.get('/logout/:idusuario', usuariosController.logout);
        this.router.get('/verificarLibre/:id', usuariosController.verificarUsuarioLibre);
        this.router.post('/signin', usuariosController.login);
        //this.router.post('/', usuariosController.create);
        this.router.post('/modules', usuariosController.listModules);
        this.router.post('/insertar',usuariosController.insertarUsuario );
        this.router.post('/insertarLocalidadUsuario',usuariosController.insertarLocalidadUsuario );
        this.router.post('/eliminarLocalidadUsuario',usuariosController.eliminarLocalidadUsuario);
        this.router.post('/actualizar',usuariosController.actualizarUsuario);
        this.router.post('/eliminarUsuario',usuariosController.eliminarUsuario );
        this.router.get('/obtenerLocalidadesUsuario/:idusuario', usuariosController.obtenerLocalidadesUsuario);
        this.router.get('/obtenerLocalidadesNoUsuario/:idusuario', usuariosController.obtenerLocalidadesNoUsuario);
        this.router.get('/buscarPatronUsuario/:cadena', usuariosController.buscarPatronUsuario);
    }

}

export default new UsuarioRoutes().router;