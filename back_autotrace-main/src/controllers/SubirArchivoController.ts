import { Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import multer from 'multer';
import pool from '../database';
import path from 'path';
class SubirArchivoController{

    public async upload(req: Request, res: Response){
        const { id , tipo} = req.body
        const nombre=req.file?.originalname;
        const ruta='/' + id + '/' + id +'_doc'+tipo+ path.extname(String(nombre));  
        try {
            await pool.query('call actualizarTipoServicioRuta(?,?,?)', [id , ruta, tipo]);
            res.status(200).json();
        } catch (error : any) { 
            res.status(404).json({mensaje: error.message});
        }
    }

    public async descargarApro(req:Request,res:Response){
        const  id = req.params.id;
        const  tipo = req.params.tipo;
        try {
            var file =  './uploads/tiposervicio/'+id +'/'+id+'_doc'+tipo;
            res.status(200).download(file); // Set disposition and send it.            
        } catch (error:any) {
            res.status(404).json({mensaje: error.message});
        }
    }



}
const subirArchivoController = new SubirArchivoController();
export default subirArchivoController;