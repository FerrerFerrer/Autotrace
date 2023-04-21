import { Request, Response } from 'express';
import pool from '../database';

class TipoInventarioController{

    public async list(req: Request, res: Response): Promise<any>{
        try {
            const resultados = await pool.query('call listarTipoInventario()');
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async crearTipoInventario(req: Request, res: Response): Promise<any>{
        const { cveTipoInventario, descripcion, activo }  = req.body;
        try {
            await pool.query('call insertarTipoInventario(?, ?, ?)', [cveTipoInventario, descripcion, activo]);
            res.status(200).json();
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async actualizarTipoInventario(req: Request, res: Response): Promise<any>{
        const { cveTipoInventario, cveTipoInventarioNuevo, descripcion, activo }  = req.body;
        try {
            await pool.query('call actualizarTipoInventario(?, ?, ?, ?)', [cveTipoInventario, cveTipoInventarioNuevo, descripcion, activo]);
            res.status(200).json();
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }
    public async delete(req: Request, res: Response): Promise<any>{
        const cveTipoInventario = req.params.cveTipoInventario;
        try {
            await pool.query('call eliminarTipoInventario(?)', [cveTipoInventario]);
            res.json({ message: "El tipo de inventario ha sido eliminado" });
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async buscarPatronTipoInventario(req:Request, res:Response):Promise<any>{
        const  cadena = req.params.cadena;
        try {
            const resultados = await pool.query('call buscarPatronTipoInventario(?)', cadena);
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

}

const tipoInventario = new TipoInventarioController();
export default tipoInventario;