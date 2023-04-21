import { Request, Response } from 'express';
import pool from '../database';

class DanioEstadoController {

    public async list(req: Request, res: Response): Promise<void> {
        try {
            const danioEstado = await pool.query('call listarDanioEstado()');
            res.status(200).json(danioEstado);
        } catch (error: any) {
            res.status(500).json({ mensaje: error.message });
        }
    }


}

const danioEstado = new DanioEstadoController();
export default danioEstado;