import { Request, Response } from 'express';
import pool from '../database';

class ManifiestoController{

    public async busquedaSegunManifiesto(req: Request, res: Response): Promise<any>{
        const incluirCerrado = req.params.incluirCerrado;
        const idCliente = req.params.idCliente;
        const fechaInicial = req.params.fechaInicial;
        const fechaFinal = req.params.fechaFinal;
        const lista = await pool.query('call busqFiltradaSegManif(?, ?, ?, ?)', [incluirCerrado, idCliente, fechaInicial, fechaFinal]);
        return res.json(lista);
    }

    public async manifiestosExistentes(req: Request, res: Response): Promise<any>{
        const row = await pool.query('SELECT  idmanifiesto, CONCAT(fechaBuque, " Buque: ", buque) AS manifiesto FROM manifiesto');
        res.json(row);
    }

    public async create(req: Request, res: Response): Promise<any>{
        const { buque, viaje, fechaBuque, localidad, vins_csv, vins_pendientes_procesar} = req.body;
        try {
            const response : any = await pool.query(
                'call altaManifiesto(?, ?, ?, ?, ?, ?)',
                [buque, viaje, fechaBuque, localidad, vins_csv, vins_pendientes_procesar]);
            const id = response[0];
            res.status(200).json({
                message: "Manifiesto creado correctamente",
                id
            });
        } catch (error : any) {
            res.status(401).json({mensaje: error.message});
        }
    }

public async vinsManifiesto(req:Request, res:Response):Promise<any>{

    const idmanifiesto = req.params.idmanifiesto;
    const lista = await pool.query('call vinsManifiesto(?)',idmanifiesto);
    return res.json(lista);

}


public async geocercasVinsManifiesto(req:Request,res:Response):Promise<any>{
    const idmanifiesto = req.params.idmanifiesto;
    const lista = await pool.query('call geocercasVinsManifiesto(?)',idmanifiesto);
    return res.json(lista);
}

public async cambiarEstadoManifiesto(req: Request, res: Response): Promise<any>{
    const { idmanifiesto, estado} = req.body;
    try {
        const response : any = await pool.query(
            'call cambiarEstadoManifiesto(?, ?)',
            [idmanifiesto, estado]);
        
        res.status(200).json({
            message: "Manifiesto actualizado correctamente",
        
        });
    } catch (error : any) {
        res.status(401).json({mensaje: error.message});
    }
}



}

const manifiesto = new ManifiestoController();
export default manifiesto;