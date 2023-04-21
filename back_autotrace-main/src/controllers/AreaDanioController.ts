import { Request, Response } from 'express';
import pool from '../database';

class AreaDanioController{

    public async list(req: Request, res: Response): Promise<any>{
        try {
            const resultados = await pool.query('call listarAreaDanio()');
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async insertarActualizarAreaDanio(req: Request, res: Response): Promise<any>{
        const {cve_areaDanio, descripcion }  = req.body;
        try {
            await pool.query('call insertarActualizarAreaDanio(?, ?)', [cve_areaDanio, descripcion]);
            res.status(200).json();
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async actualizarAreaDanio(req: Request, res: Response): Promise<any>{
        const { cveAreaDanio, cveAreaDanioNuevo, descripcion } = req.body;
        try {
            await pool.query('call actualizarAreaDanio(?, ?, ?)', [cveAreaDanio, cveAreaDanioNuevo, descripcion]);
            res.status(200).json();
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async delete(req: Request, res: Response): Promise<any>{
        const { cve_areadanio } = req.params;
        try {
            await pool.query('call eliminarAreaDanio(?)', [cve_areadanio]);
            res.json({ message: "El area de daño ha sido eliminado" });
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async buscarPatronAreaDanio(req:Request, res:Response):Promise<any>{
        const  cadena = req.params.cadena;
        try {
            const resultados = await pool.query('call buscarPatronAreaDanio(?)', cadena);
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async datosArea(req: Request, res: Response): Promise<any>{
        const fechaInicio = req.params.fechaInicio;
        const fechaFinal = req.params.fechaFinal;

        try {
            const results = await pool.query('call datosGraficaArea(?, ?)',[fechaInicio, fechaFinal]);
            res.status(200).json(results);
        } catch (error : any) {
            res.status(500).json({ message: error.message});
        }
    }

    public async datosAreaAdicional(req: Request, res: Response): Promise<any>{
        const fechaInicio = req.params.fechaInicio;
        const fechaFinal = req.params.fechaFinal;

        try {
            const results = await pool.query('call datosGraficaAreaDanioAdicional(?, ?)',[fechaInicio, fechaFinal]);
            res.status(200).json(results);
        } catch (error : any) {
            res.status(500).json({ message: error.message});
        }
    }
}

const areaDanio = new AreaDanioController();
export default areaDanio;