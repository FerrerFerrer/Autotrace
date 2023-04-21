import { Request, Response } from 'express';
import pool from '../database';

class EstadoProcesoController{

    public async list(req: Request, res: Response): Promise<void> {
        const estadoProceso = await pool.query('SELECT * FROM estadoproceso');
        res.json(estadoProceso);
    }

    public async actualizarEstadoProcesoVins(req: Request, res: Response): Promise<any>{
        const { vin, estadoProceso,idUsuario,idServicio } = req.body;
        try {
            await pool.query('call actualizarEstadoProcesoVins(?,?, ?, ?)', [ vin, estadoProceso,idUsuario,idServicio ]);
            res.status(200).json({message: "Estado Proceso modificado correctamente"});
        } catch (error : any) {
            res.status(500).json({message: error.message});
        }
    }

}

const estadoProceso = new EstadoProcesoController();
export default estadoProceso;