import { Request, Response } from 'express';
import pool from '../database';

class ActividadesController{

    public async crearActividadEmpleado(req: Request, res: Response): Promise<any>{
        const { cveActividad, cveEmpleado } = req.body;
        try {
            await pool.query('call insertarActividadEmpleado(?, ?)', [cveActividad, cveEmpleado]);
            res.status(200).json({message: "Se ha registrado la actividad al empleado"});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    public async actualizarActividad(req: Request, res: Response): Promise<any>{
        const cveActividad = req.params.cveActividad;
        const { cveActividadNuevo, cveHerramienta, idcliente, nombre, descripcion, tarifa, advertencia, input, activo } = req.body;
        try {
            await pool.query('call actualizarActividad(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                [cveActividad, cveActividadNuevo, cveHerramienta, idcliente, nombre, descripcion, tarifa, advertencia, input, activo]);
            res.status(200).json({message: "Actividad modificada correctamente"});
        } catch (error : any) {
            res.status(400).json({message: error.message});
        }
    }

    public async buscarActividad(req: Request, res: Response): Promise<any>{
        const  cadena = req.params.cadena;
        try {
            const resultados = await pool.query('call buscarPatronActividad(?)', cadena);
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async crearActividad(req: Request, res: Response): Promise<any>{
        const { cveActividad, cveHerramienta, idcliente, nombre, descripcion, tarifa, advertencia, input, activo } = req.body;
        try {
            await pool.query('call insertarActividad(?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [cveActividad, cveHerramienta, idcliente, nombre, descripcion, tarifa, advertencia, input, activo]);
            res.status(200).json({message: "Actividad creada correctamente"});
        } catch (error : any) {
            res.status(400).json({message: error.message});
        }
    }

    public async eliminarActividad(req: Request, res: Response): Promise<any>{
        const cve_actividad = req.params.cveActividad;
        try {
            await pool.query('call eliminarActividad(?)', [cve_actividad]);
            res.json({ message: "La actividad ha sido eliminado" });
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async eliminarActividadEmpleado(req: Request, res: Response): Promise<any>{
        const cveActividad  = req.params. cveActividad;
        const cveEmpleado = req.params.cveEmpleado;
        try {
            await pool.query('call eliminarActividadEmpleado(?, ?)', [cveActividad, cveEmpleado]);
            res.status(200).json({message: "Se ha eliminado la actividad al empleado"});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    public async list(req: Request, res: Response): Promise<any>{
        try {
            const results = await pool.query('call listarActividades()');
            res.status(200).json(results);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    public async obtenerEmpleadosActividad(req: Request, res: Response): Promise<any>{
        const cveActividad = req.params.cveActividad;
        try {
            const results = await pool.query('call obtenerEmpleadosActividad(?)', [cveActividad]);
            res.status(200).json(results);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    public async obtenerEmpleadosSinActividad(req: Request, res: Response): Promise<any>{
        const cveActividad = req.params.cveActividad;
        try {
            const results = await pool.query('call obtenerEmpleadosNoActividad(?)', [cveActividad]);
            res.status(200).json(results);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    public async obtenerActividadesUsuario(req: Request, res: Response): Promise<any>{
        const idusuario = req.params.idusuario;
        const vin = req.params.vin;
        const tipoServicio = req.params.tipoServicio;
        try {
            const results = await pool.query('call actividadesUsuario(?, ?, ?)',[idusuario, vin, tipoServicio]);
            console.log(results);
            res.status(200).json(results);
        } catch (error : any) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    }

    public async actividadesTipoServicio(req: Request, res: Response): Promise<any>{
        const idtipoServicio = req.params.idtipoServicio;
        try {
            const results = await pool.query('call actividadesTipoServicio(?)',[idtipoServicio]);
            res.status(200).json(results);
        } catch (error : any) {
            res.status(500).json({message: error.message});
        }
    }

    public async registrarActividadRealizadaVin(req: Request, res: Response): Promise<any>{
        const { idServicio, cveActividad, input, informacion_adicional } = req.body;
        try {
            await pool.query('call registrarActividadRealizadaVin(?, ?, ?, ?)',[idServicio, cveActividad, input, informacion_adicional]);
            res.status(200).json({message: "Actividad realizada al Vin creada correctamente"});
        } catch (error : any) {
            res.status(500).json({message: error.message});
        }
    }

    public async eliminarActividadRealizadaVin(req: Request, res: Response): Promise<any>{
        const vin = req.params.vin;
        const cveActividad = req.params.cveActividad;
        try {
            await pool.query('call eliminarActividadRealizada(?, ?)',[vin, cveActividad]);
            res.status(200).json({message: "Actividad realizada al Vin eliminada correctamente"});
        } catch (error : any) {
            res.status(500).json({message: error.message});
        }
    }

    public async obtenerActividadesRealizadasVin(req: Request, res: Response): Promise<any>{
        const vin = req.params.vin;
        try {
            const results = await pool.query('call obtenerActividadesRealizadasVin(?)',[vin]);
            res.status(200).json(results);
        } catch (error : any) {
            res.status(500).json({message: error.message});
        }
    }
}

const actividades = new ActividadesController();
export default actividades;