import express, { Router } from 'express';
import fileUpload from 'express-fileupload';
import multer from 'multer';
import subirArchivoController from '../controllers/SubirArchivoController';
import path from 'path';
import fs from 'fs-extra';

class SubirArchivoRoutes {
    router: Router = Router();

    constructor() {
        this.config();
    }
 

    config() {

        var storage = multer.diskStorage({
            destination: 'uploads/tiposervicio/',
            filename: (req, file, cb) => {
                const { id , tipo} = req.body
                if (!fs.existsSync('uploads/tiposervicio/' + id)) {
                    fs.mkdirSync('uploads/tiposervicio/' + id);
                }
                cb(null, '/' + id + '/' + req.body.id +'_doc'+tipo+ path.extname(file.originalname))
            }
        });

        var upload = multer({
            storage: storage
        });




        this.router.post('/upload/tiposervicio/apro', upload.single('file'), subirArchivoController.upload);
        this.router.post('/upload/tiposervicio/cot', upload.single('file'), subirArchivoController.upload);
        this.router.post('/upload/tiposervicio/req', upload.single('file'), subirArchivoController.upload);
        

        this.router.get('/download/tiposervicio/:id/:tipo',subirArchivoController.descargarApro);
        
    }
}
export default new SubirArchivoRoutes().router;