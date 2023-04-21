import { Request, Response } from 'express';
import pool from '../database';

class Decoder57Controller{
    public async list(req: Request, res: Response): Promise<any>{
        try {
            const resultados = await pool.query('call listarDigito5_7()');
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async insertarDigito5_7(req: Request, res: Response): Promise<any>{
        const {cve_digito, driverType,brand ,series,driverPosition,bodyTypeCab }  = req.body;
        try {
            await pool.query('call insertarDigito5_7(?, ?, ? , ? , ? , ? )', [cve_digito, driverType,brand ,series,driverPosition,bodyTypeCab]);
            res.status(200).json();
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async actualizarDigito5_7(req: Request, res: Response): Promise<any>{
        const {cve_digito, cve_digitoNuevo,driverType,brand ,series,driverPosition,bodyTypeCab}  = req.body;
        try {
            await pool.query('call actualizarDigito5_7(?, ?, ?,?,?,?,?)', [cve_digito, cve_digitoNuevo,driverType,brand ,series,driverPosition,bodyTypeCab]);
            res.status(200).json();
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async delete(req: Request, res: Response): Promise<any>{
        const { cve_digito } = req.params;
        try {
            await pool.query('call eliminarDigito5_7(?)', [cve_digito]);
            res.json({ message: "El digito  ha sido eliminado" });
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async buscarDigito5_7(req:Request, res:Response):Promise<any>{
        const  claveDigito = req.params.claveDigito;
        try {
            const resultados = await pool.query('call buscarDigito5_7(?)', claveDigito);
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async buscarPatronDigito5_7(req:Request, res:Response):Promise<any>{
        const  cadena = req.params.cadena;
        try {
            const resultados = await pool.query('call buscarPatronDigito5_7(?)', cadena);
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }
}
const decoder57 = new Decoder57Controller();
export default decoder57;