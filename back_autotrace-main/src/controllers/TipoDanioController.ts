import { Request, Response } from 'express';
import pool from '../database';

class TipoDanioController{

    public async list(req: Request, res: Response): Promise<any>{
        try {
            const resultados = await pool.query('call listarTipoDanio()');
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async insertarActualizarTipoDanio(req: Request, res: Response): Promise<any>{
        const {cve_tipoDanio, descripcion }  = req.body;
        try {
            await pool.query('call insertarActualizarTipoDanio(?, ?)', [cve_tipoDanio, descripcion]);
            res.status(200).json();
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async actualizarTipoDanio(req: Request, res: Response): Promise<any>{
        const { cveTipoDanio, cveTipoDanioNuevo, descripcion } = req.body;
        try {
            await pool.query('call actualizarTipoDanio(?, ?, ?)', [cveTipoDanio, cveTipoDanioNuevo, descripcion]);
            res.status(200).json();
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async datosTipoDanio(req: Request, res: Response): Promise<any>{
        const fechaInicio = req.params.fechaInicio;
        const fechaFinal = req.params.fechaFinal;

        try {
            const results = await pool.query('call datosGraficaTipoDanio(?, ?)',[fechaInicio, fechaFinal]);
            res.status(200).json(results);
        } catch (error : any) {
            res.status(500).json({ message: error.message});
        }
    }

    public async delete(req: Request, res: Response): Promise<any>{
        const { cve_tipoDanio } = req.params;
        try {
            await pool.query('call eliminarTipoDanio(?)', [cve_tipoDanio]);
            res.json({ message: "El tipo de daño ha sido eliminado" });
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async buscarPatronTipoDanio(req:Request, res:Response):Promise<any>{
        const  cadena = req.params.cadena;
        try {
            const resultados = await pool.query('call buscarPatronTipoDanio(?)', cadena);
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }


}

const tipoDanio = new TipoDanioController();
export default tipoDanio;