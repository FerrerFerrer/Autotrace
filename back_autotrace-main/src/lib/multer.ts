import multer from 'multer';
import path from 'path';
import fs from 'fs-extra';

const storage = multer.diskStorage({

    destination: '/var/www/html/assets/uploads/danios/',

    filename: (req, file, cb) => {

        console.log(req.body);
        const test: String = req.body.vin;
        try {
            let vin = test.slice(1, -1);
            console.log(vin);
           
            let tipo = req.body.tipo;
            tipo = tipo.slice(1, -1);
            console.log(tipo);
            console.log(file.originalname);
            if (!fs.existsSync('/var/www/html/assets/uploads/danios/vin_' + vin)) {
                fs.mkdirSync('/var/www/html/assets/uploads/danios/vin_' + vin);
            }
            switch (tipo) {
                case 'firma':
                    cb(null, '/vin_' + vin + '/' + vin + '_url' + tipo + path.extname(file.originalname));
                    break;
                case 'fotografia':
                    cb(null, '/vin_' + vin + '/' + req.body.iddanio + '_url' + tipo + "_" + req.body.numeroFoto + path.extname(file.originalname));
                    break;
                default:
                    console.log("No se encontró el tipo de archivo " + tipo);
                    break;
            }
        } catch (error) {
            console.log(error);
            //throw error;
        }

    }
})


export default multer({ storage });