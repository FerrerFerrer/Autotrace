import { Request, Response } from 'express';
import pool from '../database';

class ModelsController{

    public async list(req: Request, res: Response): Promise<any>{
        try {
            const resultados = await pool.query('call listarModel()');
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async create(req: Request, res: Response): Promise<any>{
        const { model, idcliente } = req.body;
        try {
            await pool.query('call insertarModel(?, ?)', [model,idcliente]);
            res.status(200).json({message: "Model registrado correctamente"});
        } catch (error : any) {
            res.status(500).json({message: error.message});
        }
    }

    public async update(req: Request, res: Response): Promise<any>{
        const { model, idCliente, modelAnterior, idClienteanterior } = req.body;
        try {
            await pool.query('call actualizarModel(?, ?, ?, ?)', [model, idCliente, modelAnterior, idClienteanterior]);
            res.status(200).json({message: "Model modificado correctamente"});
        } catch (error : any) {
            res.status(500).json({message: error.message});
        }
    }

    public async delete(req : Request, res: Response): Promise<any>{
        const  model = req.params.model;
        const idcliente=req.params.idcliente;
        try {
            await pool.query('call eliminarModel(?, ?)', [model,idcliente ]);
           
            res.status(200).json({message: "Model eliminado correctamente"});
        } catch (error : any) {
            res.status(500).json({message: error.message});
        }
    }

    public async buscarModel(req: Request, res: Response): Promise<any>{
        const  model = req.params.model;
        const idcliente=req.params.idcliente;
        try {
            const resultados = await pool.query('call buscarModel(?,?)', [ model,idcliente]);
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(500).json({message: error.message});
        }
    }

    public async buscarPatronModel(req: Request, res: Response): Promise<any>{
        const pa_Cadena  = req.params.cadena;
        try {
            const resultados = await pool.query('call buscarPatronModel(?)', [pa_Cadena]);
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(500).json({message: error.message});
        }
    }
}

const models = new ModelsController();
export default models;