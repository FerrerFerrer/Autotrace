import { Request, Response } from 'express';
import pool from '../database';

class Decoder13Controller{
    public async list(req: Request, res: Response): Promise<any>{
        try {
            const resultados = await pool.query('call listarDigito1_3()');
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async insertarDigito1_3(req: Request, res: Response): Promise<any>{
        const {cve_digito, manufacturerName,vehicleType }  = req.body;
        try {
            await pool.query('call insertarDigito1_3(?, ?, ?)', [cve_digito, manufacturerName,vehicleType]);
            res.status(200).json();
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async actualizarDigito1_3(req: Request, res: Response): Promise<any>{
        const {cve_digito,cve_digitoNuevo, manufacturerName,vehicleType }  = req.body;
        try {
            await pool.query('call actualizarDigito1_3(?, ?, ?,?)', [cve_digito,cve_digitoNuevo, manufacturerName,vehicleType]);
            res.status(200).json();
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async delete(req: Request, res: Response): Promise<any>{
        const { cve_digito } = req.params;
        try {
            await pool.query('call eliminarDigito1_3(?)', [cve_digito]);
            res.json({ message: "El digito  ha sido eliminado" });
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async buscarDigito1_3(req:Request, res:Response):Promise<any>{
        const  claveDigito = req.params.claveDigito;
        try {
            const resultados = await pool.query('call buscarDigito1_3(?)', claveDigito);
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async buscarPatronDigito1_3(req:Request, res:Response):Promise<any>{
        const  cadena = req.params.cadena;
        try {
            const resultados = await pool.query('call buscarPatronDigito1_3(?)', cadena);
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }
}
const decoder13 = new Decoder13Controller();
export default decoder13;