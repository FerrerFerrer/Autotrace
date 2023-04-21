import { Request, Response } from 'express';
import pool from '../database';

class HistorialTarifasController{

    public async buscar(req: Request, res: Response): Promise<any>{
        const fechaInicio = req.params.fechaInicio;
        const fechaFin = req.params.fechaFin;
        let idusuario = req.params.idusuario;
        let tipoServicio = req.params.tipoServicio;
        try {
            if(idusuario === "null"){
                idusuario = "";
            }
            if(tipoServicio === "null"){
                tipoServicio = "";
            }

            const resultados = await pool.query('call busqFiltradaHistoricoTipoServicio(?, ?, ?, ?)', [fechaInicio, 
                                                                                                        fechaFin, 
                                                                                                        idusuario, 
                                                                                                        tipoServicio]);
            res.status(200).json(resultados);
        } catch (error: any) {
            res.status(500).json({message: error.message});
        }
    }
}

const historial = new HistorialTarifasController();
export default historial;