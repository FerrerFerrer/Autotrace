import { Request, Response } from 'express';

import pool from '../database';

class ProveedoresController{

    public async list(req: Request, res: Response): Promise<any>{
        try {
            const resultados = await pool.query('call listarProveedores()');
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        try {
            const resultados = await pool.query('call consultarProveedor(?)', [id]);
            if (resultados.length > 0) {
                return res.json(resultados[0]);
            }
        } catch (error : any) {
            res.status(404).json({ text: error.message });
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        const { idcliente, nombre, codigoSPLC }  = req.body;
        try {
            const resultado = await pool.query('call insertarProveedor(?, ?, ?)', [idcliente, nombre, codigoSPLC]);
            res.status(200).json(resultado);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { idcliente, nombre, codigoSPLC }  = req.body;
        try {
            const resultado = await pool.query('call insertarActualizarProveedor(?, ?, ?, ?)', [ id, idcliente, nombre, codigoSPLC]);
            res.status(200).json(resultado);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const resultado = await pool.query('call eliminarProveedor(?)', [ id ]);
            res.status(200).json("Proveedor eliminado correctamente");
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async buscarPatronProveedor(req: Request, res: Response): Promise<any> {
        const cadena = req.params.cadena;
        try {
            const resultados = await pool.query('call consultarPatronProveedor(?)', cadena);
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }
}

const proveedores = new ProveedoresController();
export default proveedores;