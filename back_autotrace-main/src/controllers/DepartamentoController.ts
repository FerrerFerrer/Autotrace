import { Request, Response } from 'express';
import pool from '../database';

class DepartamentoController{

    public async list(req: Request, res: Response): Promise<any>{
        try {
            const resultados = await pool.query('call listarDepartamentos()');
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async insertarDepartamento(req: Request, res: Response): Promise<any>{
        const {pa_cveDepartamento, pa_departamento }  = req.body;
        try {
            await pool.query('call insertarDepartamento(?, ?)', [pa_cveDepartamento, pa_departamento]);
            res.status(200).json();
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async actualizarDepartamento(req: Request, res: Response): Promise<any>{

        const {pa_cveDepartamento,pa_NuevoCveDepartamento, pa_departamento }  = req.body;
        try {
            await pool.query('call actualizarDepartamento(?, ?, ?)', [pa_cveDepartamento,pa_NuevoCveDepartamento, pa_departamento]);
            res.status(200).json();
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async delete(req: Request, res: Response): Promise<any>{
        const { pa_cveDepartamento } = req.params;
        try {
            await pool.query('call eliminarDepartamento(?)', [pa_cveDepartamento]);
            res.json({ message: "El departamento  ha sido eliminado" });
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async buscarPatronDepartamento(req:Request, res:Response):Promise<any>{
        const  cadena = req.params.cadena;
        try {
            const resultados = await pool.query('call buscarPatronDepartamento(?)', cadena);
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

}

const departamento = new DepartamentoController();
export default departamento;