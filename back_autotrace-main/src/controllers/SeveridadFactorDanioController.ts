import { Request, Response } from 'express';
import pool from '../database';

class SeveridadFactorDanioController{

    public async list(req: Request, res: Response): Promise<any>{
        try {
            const resultados = await pool.query('call listarSeveridadFactorDanio()');
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async insertarActualizarSeveridadFactorDanio(req: Request, res: Response): Promise<any>{
        const {cve_severidadFactorDanio, descripcion }  = req.body;
        try {
            await pool.query('call insertarActualizarSeveridadFactorDanio(?, ?)', [cve_severidadFactorDanio, descripcion]);
            res.status(200).json();
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async actualizarSeveridadFactorDanio(req: Request, res: Response): Promise<any>{
        const {cve_severidadFactorDanio,cve_severidadFactorDanioNuevo ,descripcion }  = req.body;
        try {
            await pool.query('call actualizarSeveridadFactorDanio(?, ?,?)', [cve_severidadFactorDanio,cve_severidadFactorDanioNuevo ,descripcion]);
            res.status(200).json();
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async delete(req: Request, res: Response): Promise<any>{
        const { cve_severidadFDanio  } = req.params;
        try {
            await pool.query('call eliminarSeveridadFactorDanio(?)', [cve_severidadFDanio]);
            res.json({ message: "Severidad Factor de daño ha sido eliminado" });
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async buscarPatronSeveridadFDanio(req: Request, res: Response): Promise<any> {
        const cadena = req.params.cadena;
        try {
            const resultados = await pool.query('call buscarPatronSeveridadFactorDanio(?)', cadena);
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async datosSeveridad(req: Request, res: Response): Promise<any>{
        const fechaInicio = req.params.fechaInicio;
        const fechaFinal = req.params.fechaFinal;

        try {
            const results = await pool.query('call datosGraficaSeveridad(?, ?)',[fechaInicio, fechaFinal]);
            res.status(200).json(results);
        } catch (error : any) {
            res.status(500).json({ message: error.message});
        }
    }
}

const severidadFactorDanio = new SeveridadFactorDanioController();
export default severidadFactorDanio;