import { Request, Response } from 'express';

import pool from '../database';
import usuario from './UsuariosController';

class ListasController{

    public async tableDefaultList(req: Request, res: Response): Promise<any>{
        const estado = req.params.estado;
        const listaTbl = await pool.query('call tablaDefaultListas(?)', [estado]);
        res.json(listaTbl);
    }

    public async busquedaLista(req: Request, res: Response): Promise<any>{
        const nombreLista = req.params.nombreLista;
        const fechaInicial = req.params.fechaInicial;
        const fechaFinal = req.params.fechaFinal;
        const estado = req.params.estado;
        const lista = await pool.query('call busquedaFiltradaListas(?, ?, ?, ?)', [nombreLista, fechaInicial, fechaFinal, estado]);
        return res.json(lista);
    }

    public async create(req: Request, res: Response): Promise<any> {
        const { nombreLista, objetivo, vinsEncontrados, estado, idusuario } = req.body;
        try {
            const response = await pool.query('call altaLista(?, ?, ?, ?, ?)', [nombreLista, objetivo, vinsEncontrados, estado, idusuario]);
            const id = response[0];
            res.status(200).json({
                message: "Lista creada correctamente",
                id
            });
        } catch (error : any) {
            res.status(401).json({mensaje: error.message});
        }
    }

    public async insertarVinLista(req: Request, res: Response): Promise<any>{
        const {idlista, vin } = req.body;
        try {
            const response = await pool.query('call insertarListaVins(?, ?)', [idlista, vin]);
            res.status(200).json();
        } catch (error : any) {
            res.status(401).json({mensaje: error.message});
        }
    }

    public async cambiarEstadoLista(req:Request, res:Response): Promise<any>{
    const id = req.params.id;
    //const estado=req.params.estado;
    const result=await pool.query('UPDATE lista SET ? WHERE lista.idlista = ?',[req.body, id]);
    res.status(200).json({message:'Lista Actualizada'});
    }

    public async vinsDeLista(req:Request, res:Response){
        const id=req.params.id;
        const result=await pool.query('call busquedaVinsLista(?)', [id]);
        return res.json(result);
    }

    public async listaVinsIngresos(req:Request,res:Response){
        const lista=req.params.lista;
        const result=await pool.query('call listaVinsIngresos(?)', [lista]);
        return res.json(result);
    }

    public async actualizarVinEncontrado(req:Request, res:Response): Promise<any>{
        const { idlista, vin, usuario, longitud, latitud } = req.body;
        try {
            await pool.query('call actualizarVinEncontrado(?, ?, ?, ?, ?)', [idlista, vin, usuario, longitud, latitud]);
            res.status(200).json();
        } catch (error: any) {
            res.status(401).json({mensaje: error.message});
        }
    }

    public async holdMasivo(req: Request, res: Response): Promise<any>{
        const idlista = req.params.idlista;
        try {
            await pool.query('call holdMasivo(?)', [idlista]);
            res.status(200).json();
        } catch (error : any) {
            res.status(500).json({mensaje: error.message});
        }
    }
}

const listas = new ListasController();
export default listas;