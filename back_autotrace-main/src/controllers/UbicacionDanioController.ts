import { Request, Response } from 'express';
import pool from '../database';

class UbicacionDanioController{

    public async list(req: Request, res: Response): Promise<any>{
        try {
            const resultados = await pool.query('call listarUbicacionDanio()');
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async insertarActualizarUbicacionDanio(req: Request, res: Response): Promise<any>{
        const {cve_ubicacionDanio, descripcion }  = req.body;
        try {
            await pool.query('call insertarActualizarUbicacionDanio(?, ?)', [cve_ubicacionDanio, descripcion]);
            res.status(200).json();
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async actualizarUbicacionDanio(req: Request, res: Response): Promise<any>{
        const { cveUbicacionDanio, cveUbicacionDanioNuevo, descripcion } = req.body;
        try {
            await pool.query('call actualizarUbicacionDanio(?, ?, ?)', [cveUbicacionDanio, cveUbicacionDanioNuevo, descripcion]);
            res.status(200).json();
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async delete(req: Request, res: Response): Promise<any>{
        const { cve_ubicacionDanio } = req.params;
        try {
            await pool.query('call eliminarUbicacionDanio(?)', [cve_ubicacionDanio]);
            res.json({ message: "La ubicacion de daño ha sido eliminado" });
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async buscarPatronUbicacionDanio(req: Request, res: Response): Promise<any> {
        const cadena = req.params.cadena;
        try {
            const resultados = await pool.query('call buscarPatronUbicacionDanio(?)', cadena);
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async datosUbicacionDanio(req: Request, res: Response): Promise<any>{
        const fechaInicio = req.params.fechaInicio;
        const fechaFinal = req.params.fechaFinal;

        try {
            const results = await pool.query('call datosGraficaUbicacionDanio(?, ?)',[fechaInicio, fechaFinal]);
            res.status(200).json(results);
        } catch (error : any) {
            res.status(500).json({ message: error.message});
        }
    }
}

const ubicacionDanio = new UbicacionDanioController();
export default ubicacionDanio;