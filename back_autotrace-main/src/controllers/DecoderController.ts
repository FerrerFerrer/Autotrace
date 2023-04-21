import { Request, Response } from 'express';
import pool from '../database';

class DecoderController{

    public async actualizarDecoder(req: Request, res: Response): Promise<any>{
        try {
            const results = await pool.query('call actualizarDecoder()');
            res.status(200).json(results);
        } catch (error : any) {
            res.status(500).json({ error: error.message});
        }
    }
}

const decoder = new DecoderController();
export default decoder;