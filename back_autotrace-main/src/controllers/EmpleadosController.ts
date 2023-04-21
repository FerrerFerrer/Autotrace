import { Request, Response } from 'express';
import pool from '../database';

class EmpleadosController{

    public async list(req: Request, res: Response): Promise<any>{
        try {
            const resultados = await pool.query('call listarEmpleados()');
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async create(req: Request, res: Response): Promise<any>{
        const { cveEmpleado, idusuario, nombre, apellido_paterno, apellido_materno, activo, descripcion } = req.body;
        try {
            await pool.query('call insertarEmpleado(?, ?, ?, ?, ?, ?, ?)', [cveEmpleado, idusuario, nombre, apellido_paterno, apellido_materno, activo, descripcion]);
            res.status(200).json({message: "Empleado registrado correctamente"});
        } catch (error : any) {
            res.status(500).json({message: error.message});
        }
    }

    public async update(req: Request, res: Response): Promise<any>{
        const { cveEmpleado, cveEmpleadoNuevo, idusuario, nombre, apellido_paterno, apellido_materno, activo, descripcion } = req.body;
        try {
            await pool.query('call actualizarEmpleado(?, ?, ?, ?, ?, ?, ?, ?)', [cveEmpleado, cveEmpleadoNuevo, idusuario, nombre, apellido_paterno, apellido_materno, activo, descripcion]);
            res.status(200).json({message: "Empleado modificado correctamente"});
        } catch (error : any) {
            res.status(500).json({message: error.message});
        }
    }

    public async delete(req : Request, res: Response): Promise<any>{
        const cveEmpleado = req.params.cveEmpleado;
        try {
            await pool.query('call eliminarEmpleado(?)', [cveEmpleado]);
            res.status(200).json({message: "Empleado eliminado correctamente"});
        } catch (error : any) {
            res.status(500).json({message: error.message});
        }
    }

    public async buscarEmpleado(req: Request, res: Response): Promise<any>{
        const cveEmpleado  = req.params.cadena;
        try {
            const resultados = await pool.query('call buscarEmpleado(?)', [cveEmpleado]);
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(500).json({message: error.message});
        }
    }

    public async buscarPatronEmpleado(req: Request, res: Response): Promise<any>{
        const cveEmpleado  = req.params.cadena;
        try {
            const resultados = await pool.query('call buscarPatronEmpleado(?)', [cveEmpleado]);
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(500).json({message: error.message});
        }
    }
}

const empleados = new EmpleadosController();
export default empleados;