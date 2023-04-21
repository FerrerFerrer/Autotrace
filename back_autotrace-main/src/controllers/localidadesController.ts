import { Request, Response } from 'express';

import pool from '../database';

class LocalidadesController{

    public async list(req: Request, res: Response): Promise<any>{
        try {
            const resultados = await pool.query('call listarLocalidades()');
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        try {
            const localidad = await pool.query('call consultarLocalidad(?)', [id]);
            if (localidad.length > 0) {
                return res.json(localidad[0]);
            }
        } catch (error : any) {
            res.status(404).json({ text: error.message });
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        const { idlocalidad, localidad }  = req.body;
        try {
            const resultado = await pool.query('call insertarLocalidad(?, ?)', [idlocalidad, localidad]);
            res.status(200).json(resultado);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { idlocalidad, idlocalidadNuevo, localidad }  = req.body;
        try {
            const resultado = await pool.query('call actualizarLocalidad(?, ?, ?)', [idlocalidad, idlocalidadNuevo, localidad]);
            res.status(200).json(resultado);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const resultado = await pool.query('call eliminarLocalidad(?)', [ id ]);
            res.status(200).json("Localidad ha sido eliminada correctamente");
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

    public async buscarPatronLocalidad(req: Request, res: Response): Promise<any> {
        const cadena = req.params.cadena;
        try {
            const resultados = await pool.query('call buscarPatronLocalidad(?)', cadena);
            res.status(200).json(resultados);
        } catch (error : any) {
            res.status(404).json({mensaje: error.message});
        }
    }

}

const localidades = new LocalidadesController();
export default localidades;