import { Request, Response } from 'express';

import pool from '../database';

class PatiosController{

    public async buscar(req: Request, res: Response): Promise<any> {
        const cadena = req.params.cadena;
        try {
            const results = await pool.query('call buscarPatronPatio(?)', [cadena]);
            res.status(200).json(results);
        } catch (error : any) {
            res.status(500).json({message: error.message});
        }
    }

    public async getAll(req: Request, res: Response): Promise<any>{
        try {
            const results = await pool.query('call listarPatios()');
            res.status(200).json(results);
        } catch (error : any) {
            res.status(500).json({message: error.message});
        }
    }

    
    public async patiosUsuario(req: Request, res: Response): Promise<any>{
        const usuario = req.params.idUsuario;
        try {
            const results = await pool.query('call patiosUsuario(?)', [usuario]);
            res.status(200).json(results);
        } catch (error : any) {
            res.status(500).json({message: error.message});
        }
    }

}

const patios = new PatiosController();
export default patios;