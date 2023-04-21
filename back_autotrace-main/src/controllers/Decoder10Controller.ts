import { Request, Response } from 'express';
import pool from '../database';

class Decoder10Controller{

    public async list(req: Request, res: Response): Promise<any>{
        try {
            const resultados = await pool.query('call listarDigito10()');
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async insertarDigito10(req: Request, res: Response): Promise<any>{
        const {cve_digito, year }  = req.body;
        try {
            await pool.query('call insertarDigito10(?, ?)', [cve_digito, year]);
            res.status(200).json();
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async actualizarDigito10(req: Request, res: Response): Promise<any>{
        const {cve_digito, cve_digitoNuevo, year }  = req.body;
        try {
            await pool.query('call actualizarDigito10(?, ?, ?)', [cve_digito, cve_digitoNuevo, year]);
            res.status(200).json();
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async delete(req: Request, res: Response): Promise<any>{
        const { cve_digito } = req.params;
        try {
            await pool.query('call eliminarDigito10(?)', [cve_digito]);
            res.json({ message: "El digito  ha sido eliminado" });
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async buscarDigito10(req:Request, res:Response):Promise<any>{
        const  claveDigito = req.params.claveDigito;
        try {
            const resultados = await pool.query('call buscarDigito10(?)', claveDigito);
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async buscarPatronDigito10(req:Request, res:Response):Promise<any>{
        const  cadena = req.params.cadena;
        try {
            const resultados = await pool.query('call buscarPatronDigito10(?)', cadena);
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }
}

const decoder10 = new Decoder10Controller();
export default decoder10;