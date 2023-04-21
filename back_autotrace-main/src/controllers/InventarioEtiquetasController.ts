import { Request, Response } from 'express';
import pool from '../database';

class InventarioEtiquetasController{

    public async actualizarInventarioEtiqueta(req: Request, res: Response): Promise<any>{
        const cveInventario = req.params.cveInventario;
        const { manualEtiqueta, cveTipoInventario, idlocalidad, bodyModel, numeroParte, inicial, descontar, recibida, enviada, consumido, actual, total, anio } = req.body;
        try {
            await pool.query('call actualizarInventarioEtiqueta(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [cveInventario, manualEtiqueta, cveTipoInventario, idlocalidad, bodyModel, numeroParte, inicial, descontar, recibida, enviada, consumido, actual, total, anio]);
            res.status(200).json({message: "Inventario etiqueta actualizado correctamente"});
        } catch (error: any) {
            res.status(501).json({message: error.message})
        }
    }

    public async buscarInventario(req: Request, res: Response): Promise<any>{
        const cadena = req.params.cadena;
        try {
            const results = await pool.query('call buscarPatronInventarioEtiqueta(?)', [cadena]);
            res.status(200).json(results);
        } catch (error: any) {
            res.status(501).json({message: error.message})
        }
    }

    public async crearInventarioEtiqueta(req: Request, res: Response): Promise<any>{
        const { manualEtiqueta, cveTipoInventario, idlocalidad, bodyModel, numeroParte, inicial, descontar, recibida, enviada, consumido, actual, total, anio } = req.body;
        try {
            await pool.query('call insertarInventarioEtiqueta(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [manualEtiqueta, cveTipoInventario, idlocalidad, bodyModel, numeroParte, inicial, descontar, recibida, enviada, consumido, actual, total, anio]);
            res.status(200).json({message: "Inventario etiqueta creado correctamente"});
        } catch (error: any) {
            res.status(501).json({message: error.message})
        }
    }

    public async borrarInventario(req: Request, res: Response): Promise<any>{
        const cveInventario = req.params.cveInventario;
        try {
            await pool.query('call eliminarInventarioEtiqueta(?)', [cveInventario]);
            res.status(200).json({message: "Inventario Etiqueta ha sido eliminado correctamente"});
        } catch (error: any) {
            res.status(501).json({message: error.message})
        }
    }

    public async list(req: Request, res: Response): Promise<any>{
        try {
            const results = await pool.query('call listarInventarioEtiqueta()');
            res.status(200).json(results);
        } catch (error: any) {
            res.status(501).json({message: error.message});
        }
    }
}

const inventarioEtiqueta = new InventarioEtiquetasController();
export default inventarioEtiqueta;