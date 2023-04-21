import { Request, Response } from 'express';
import pool from '../database';

class RolController{

    public async list(req: Request, res: Response): Promise<any>{
        try {
            const resultados = await pool.query('call listarRol()');
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }


}

const rol = new RolController();
export default rol;