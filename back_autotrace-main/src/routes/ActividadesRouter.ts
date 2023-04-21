import express, { Router } from 'express';
import ActividadesController   from '../controllers/ActividadesController';

class ActividadesRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', ActividadesController.list);
        this.router.get('/buscar/:cadena', ActividadesController.buscarActividad);
        this.router.post('/crear', ActividadesController.crearActividad);
        this.router.put('/actualizar/:cveActividad', ActividadesController.actualizarActividad);
        this.router.delete('/:cveActividad', ActividadesController.eliminarActividad);
        
        this.router.post('/crear/actividadEmpleado', ActividadesController.crearActividadEmpleado);
        this.router.delete('/eliminar/actividadEmpleado/:cveActividad/:cveEmpleado', ActividadesController.eliminarActividadEmpleado);
        this.router.get('/obtener/actividadEmpleados/:cveActividad', ActividadesController.obtenerEmpleadosActividad);
        this.router.get('/obtener/actividadSinEmpleados/:cveActividad', ActividadesController.obtenerEmpleadosSinActividad);

        this.router.get('/tipoServicio/:idtipoServicio', ActividadesController.actividadesTipoServicio);
        this.router.get('/usuario/:idusuario/:vin/:tipoServicio', ActividadesController.obtenerActividadesUsuario);
        this.router.post('/realizadaVin', ActividadesController.registrarActividadRealizadaVin);
        this.router.get('/realizadaVin/:vin', ActividadesController.obtenerActividadesRealizadasVin);
        this.router.delete('/realizadaVin/:vin/:cveActividad', ActividadesController.eliminarActividadRealizadaVin);
    }

}

export default new ActividadesRoutes().router;