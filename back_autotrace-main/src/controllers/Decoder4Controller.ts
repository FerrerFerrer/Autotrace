import { Request, Response } from 'express';
import pool from '../database';

class Decoder4Controller{

    public async list(req: Request, res: Response): Promise<any>{
        try {
            const resultados = await pool.query('call listarDigito4()');
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async insertarDigito4(req: Request, res: Response): Promise<any>{
        const {cve_digito, attributeType, restraintSystem, brakes, GVWR }  = req.body;
        try {
            await pool.query('call insertarDigito4(?, ?, ?, ?, ?)', [cve_digito, attributeType, restraintSystem, brakes, GVWR]);
            res.status(200).json();
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async actualizarDigito4(req: Request, res: Response): Promise<any>{
        const {cve_digito,cve_digitoNuevo, attributeType, restraintSystem, brakes, GVWR }  = req.body;
        try {
            await pool.query('call actualizarDigito4(?, ?, ?, ?, ?, ?)', [cve_digito, cve_digitoNuevo, attributeType, restraintSystem, brakes, GVWR]);
            res.status(200).json();
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async delete(req: Request, res: Response): Promise<any>{
        const { cve_digito } = req.params;
        try {
            await pool.query('call eliminarDigito4(?)', [cve_digito]);
            res.json({ message: "El digito  ha sido eliminado" });
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async buscarDigito4(req:Request, res:Response):Promise<any>{
        const  claveDigito = req.params.claveDigito;
        try {
            const resultados = await pool.query('call buscarDigito4(?)', claveDigito);
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async buscarPatronDigito4(req:Request, res:Response):Promise<any>{
        const  cadena = req.params.cadena;
        try {
            const resultados = await pool.query('call buscarPatronDigito4(?)', cadena);
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }
}

const decoder4 = new Decoder4Controller();
export default decoder4;