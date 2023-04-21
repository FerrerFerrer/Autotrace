import { Request, Response } from 'express';
import pool from '../database';

class LocalidadesProveedoresController{

    public async obtenerLocalidadesProveedor(req: Request, res: Response): Promise<any>{
        const idproveedor = req.params.idproveedor;
        try {
            const results = await pool.query('call obtenerLocalidadesProveedor(?);',[idproveedor]);
            res.status(200).json(results);
        } catch (error : any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async obtenerLocalidadesNoProveedor(req: Request, res: Response): Promise<any>{
        const idproveedor = req.params.idproveedor;
        try {
            const results = await pool.query('call obtenerLocalidadesNoProveedor(?);',[idproveedor]);
            res.status(200).json(results);
        } catch (error : any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async create(req: Request, res: Response): Promise<any>{
        const { idproveedor, idlocalidad } = req.body;
        try {
            await pool.query('call insertarLocalidadProveedor(?, ?)', [idproveedor, idlocalidad]);
            res.status(200).json({message: "Registro guardado correctamente"});
        } catch (error : any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async delete(req: Request, res: Response): Promise<any>{
        const idproveedor = req.params.idproveedor;
        const idlocalidad = req.params.idlocalidad;
        try {
            await pool.query('call eliminarLocalidadProveedor(?, ?)', [idproveedor, idlocalidad]);
            res.status(200).json({message: "Registro eliminado correctamente"});
        } catch (error : any) {
            res.status(500).json({ error: error.message });
        }
    }
}

const localidadesProveedores = new LocalidadesProveedoresController();
export default localidadesProveedores;