import { Request, Response } from 'express';
import pool from '../database';

class Decoder8Controller{

    public async list(req: Request, res: Response): Promise<any>{
        try {
            const resultados = await pool.query('call listarDigito8()');
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async insertarDigito4(req: Request, res: Response): Promise<any>{
        const { cve_digito, motor, cylinders, fuel, turbo, salesCode }  = req.body;
        try {
            await pool.query('call insertarDigito8(?, ?, ?, ?, ?, ?)', [cve_digito, motor, cylinders, fuel, turbo, salesCode]);
            res.status(200).json();
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async actualizarDigito4(req: Request, res: Response): Promise<any>{
        const {cve_digito,cve_digitoNuevo, motor, cylinders, fuel, turbo, salesCode }  = req.body;
        try {
            await pool.query('call actualizarDigito8(?, ?, ?, ?, ?, ?, ?)', [cve_digito, cve_digitoNuevo, motor, cylinders, fuel, turbo, salesCode]);
            res.status(200).json();
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async delete(req: Request, res: Response): Promise<any>{
        const { cve_digito } = req.params;
        try {
            await pool.query('call eliminarDigito8(?)', [cve_digito]);
            res.json({ message: "El digito  ha sido eliminado" });
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async buscarDigito8(req:Request, res:Response):Promise<any>{
        const  claveDigito = req.params.claveDigito;
        try {
            const resultados = await pool.query('call buscarDigito8(?)', claveDigito);
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async buscarPatronDigito8(req:Request, res:Response):Promise<any>{
        const  cadena = req.params.cadena;
        try {
            const resultados = await pool.query('call buscarPatronDigito8(?)', cadena);
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }
}

const decoder8 = new Decoder8Controller();
export default decoder8;