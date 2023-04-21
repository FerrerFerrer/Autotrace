import { Request, Response } from 'express';
import pool from '../database';

class ReporteServiciosController{

    public async getAll(req: Request, res: Response): Promise<any>{
        const fechaInicial = req.params.fechaInicial;
        const fechaFinal = req.params.fechaFinal;
        const localidad = req.params.localidad;
        try {
            const results = await pool.query('call consultaReporteServicios(?, ?, ?)', [fechaInicial, fechaFinal,localidad]);
            res.status(200).json(results);
        } catch (error : any) {
            console.log(error);
            res.status(500).send({message: error.message});
        }
    }

    public async vinsReporteServicios(req: Request, res: Response): Promise<any>{
        const fecha = req.params.fecha;
        const idlocalidad = req.params.idlocalidad;
console.log("fecha"+ fecha);
console.log("idlocalidad"+idlocalidad);


        try {
            const results = await pool.query('call vinsReporteServicios(?, ?)', [fecha, idlocalidad]);
            console.log(results);
            res.status(200).json(results);
        } catch (error : any) {
            console.log(error);
            res.status(500).send({message: error.message});
        }
    }
}

const reporteServicios = new ReporteServiciosController();
export default reporteServicios;