import { Request, Response } from 'express';
import pool from '../database';

class HerramientasController{

    public async actualizarHerramienta(req: Request, res: Response): Promise<any>{
        const { cveHerramienta, cveHerramientaNuevo, nombre, comentario, activo } = req.body;
        try {
            await pool.query('call actualizarHerramienta(?, ?, ?, ?, ?)', [cveHerramienta, cveHerramientaNuevo, nombre, comentario, activo])
            res.status(200).json({message: "Herramienta actualizada correctamente"});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    public async buscarHerramienta(req: Request, res: Response): Promise<any>{
        const cveHerramienta = req.params.cveHerramienta;
        try {
            const result = await pool.query('call buscarPatronHerramienta(?)', [cveHerramienta]);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    public async crearHerramienta(req: Request, res: Response): Promise<any>{
        const { cveHerramienta, nombre, comentario, activo } = req.body;
        try {
            await pool.query('call insertarHerramienta(?, ?, ?, ?)', [cveHerramienta, nombre, comentario, activo])
            res.status(200).json({message: "Herramienta registrada correctamente"});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    public async eliminarHerramienta(req: Request, res: Response): Promise<any>{
        const cveHerramienta = req.params.cveHerramienta;
        try {
            await pool.query('call eliminarHerramienta(?)', [cveHerramienta]);
            res.status(200).json({message: "Herramienta eliminada correctamente"});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    public async list(req: Request, res: Response): Promise<any>{
        try {
            const results = await pool.query('call listarHerramientas()');
            res.status(200).json(results);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }
}

const herramientas = new HerramientasController();
export default herramientas;