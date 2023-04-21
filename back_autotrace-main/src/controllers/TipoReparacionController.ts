import { Request, Response } from 'express';
import pool from '../database';

class TipoReparacionController{

    public async list(req: Request, res: Response): Promise<any>{
        try {
            const resultados = await pool.query('call listarTipoReparacion()');
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async insertarActualizarTipoReparacion(req: Request, res: Response): Promise<any>{
        const {cve_tipoReparacion, descripcion }  = req.body;
        try {
            await pool.query('call insertarActualizarTipoReparacion(?, ?)', [cve_tipoReparacion, descripcion]);
            res.status(200).json();
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }
    
    public async actualizarTipoReparacion(req: Request, res: Response): Promise<any>{
        const {cve_tipoReparacion,cve_tipoReparacionNuevo, descripcion }  = req.body;
        try {
            await pool.query('call actualizarTipoReparacion(?, ?,?)', [cve_tipoReparacion,cve_tipoReparacionNuevo, descripcion]);
            res.status(200).json();
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }
    public async delete(req: Request, res: Response): Promise<any>{
        const { cve_tiporeparacion } = req.params;
        try {
            await pool.query('call eliminarTipoReparacion(?)', [cve_tiporeparacion]);
            res.json({ message: "El tipo de reparacion ha sido eliminado" });
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async buscarPatronTipoReparacion(req:Request, res:Response):Promise<any>{
        const  cadena = req.params.cadena;
        try {
            const resultados = await pool.query('call buscarPatronTipoReparacion(?)', cadena);
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async datosTipoReparacion(req: Request, res: Response): Promise<any>{
        const fechaInicio = req.params.fechaInicio;
        const fechaFinal = req.params.fechaFinal;

        try {
            const results = await pool.query('call datosGraficaTipoReparacion(?, ?)',[fechaInicio, fechaFinal]);
            res.status(200).json(results);
        } catch (error : any) {
            res.status(500).json({ message: error.message});
        }
    }
}

const tipoReparacion = new TipoReparacionController();
export default tipoReparacion;