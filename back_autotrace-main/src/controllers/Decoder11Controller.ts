import { Request, Response } from 'express';
import pool from '../database';

class Decoder11Controller{

    public async list(req: Request, res: Response): Promise<any>{
        try {
            const resultados = await pool.query('call listarDigito11()');
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async insertarDigito11(req: Request, res: Response): Promise<any>{
        const {cve_digito, plantName }  = req.body;
        try {
            await pool.query('call insertarDigito11(?, ?)', [cve_digito, plantName]);
            res.status(200).json();
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async actualizarDigito11(req: Request, res: Response): Promise<any>{
        const {cve_digito, cve_digitoNuevo, plantName }  = req.body;
        try {
            await pool.query('call actualizarDigito11(?, ?, ?)', [cve_digito, cve_digitoNuevo, plantName]);
            res.status(200).json();
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async delete(req: Request, res: Response): Promise<any>{
        const { cve_digito } = req.params;
        try {
            await pool.query('call eliminarDigito11(?)', [cve_digito]);
            res.json({ message: "El digito  ha sido eliminado" });
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async buscarDigito11(req:Request, res:Response):Promise<any>{
        const  claveDigito = req.params.claveDigito;
        try {
            const resultados = await pool.query('call buscarDigito11(?)', claveDigito);
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async buscarPatronDigito11(req:Request, res:Response):Promise<any>{
        const  cadena = req.params.cadena;
        try {
            const resultados = await pool.query('call buscarPatronDigito11(?)', cadena);
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }
}

const decoder11 = new Decoder11Controller();
export default decoder11;