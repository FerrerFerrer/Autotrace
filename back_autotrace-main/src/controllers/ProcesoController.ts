import { Request, Response } from 'express';
import pool from '../database';

class ProcesoController{

    public async list(req: Request, res: Response): Promise<any>{
        try {
            const resultados = await pool.query('call listarEstadoProceso()');
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async update(req: Request, res: Response): Promise<any>{
        const {vin, idEstadoProceso,idUsuario,idServicio } = req.body;
        try {
            await pool.query('call actualizarEstadoProcesoVin(?, ?, ?, ?)', [vin, idEstadoProceso,idUsuario,idServicio ]);
            res.status(200).json({message: "Proceso modificado correctamente"});
        } catch (error : any) {
            res.status(500).json({message: error.message});
        }
    }

   
}
  
const proceso = new ProcesoController();
export default proceso;