import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

import ActividadesRouter from './routes/ActividadesRouter';
import AreaDanioRouter from './routes/AreaDanioRouter';
import ClientesRoutes from './routes/clienteRouter';
import DaniosRouter from './routes/DaniosRouter';
import DecoderRouter from './routes/DecoderRouter';
import Decoder13Router from './routes/Decoder13Router';
import Decoder4Router from './routes/Decoder4Router';
import Decoder57Router from './routes/Decoder57Router';
import Decoder8Router from './routes/Decoder8Router';
import Decoder10Router from './routes/Decoder10Router';
import Decoder11Router from './routes/Decoder11Router';
import DepartamentoRouter from './routes/DepartamentoRouter';
import EmpleadosRouter from './routes/EmpleadosRouter';
import EstadoProcesoRouter from './routes/estadoProcesoRouter';
import geocercasRoute from './routes/geocercasRoutes';
import HerramientasRouter from './routes/HerramientasRouter';
import HistorialTarifasRouter from './routes/HistorialTarifasRouter';
import indexRoutes from './routes/indexRoutes';
import InventarioEtiquetaRouter from './routes/InventarioEtiquetasRouter';
import InventarioPatioController from './routes/InventarioPatioRouter';
import LocalidadesProveedoresRoutes from './routes/LocalidadesProveedoresRouter';
import localidadRoute from './routes/localidadRoute';
import listasRouter from './routes/listasRouter';
import ManifiestoRouter from './routes/manifiestoRouter';
import PatiosRouter from './routes/PatiosRouter';
import ProcesoRouter from './routes/ProcesoRouter'; 
import ProveedoresRouter from './routes/proveedoresRouter';
import ReporteServiciosRouter from './routes/ReporteServiciosRouter';
import RolRouter from './routes/RolRouter';
import SeveridadFactorDanioRouter from './routes/SeveridadFactorDanioRouter';
import SubirArchivoRouter from './routes/SubirArchivoRouter';
import TipoDanioRouter from './routes/tipoDanioRouter';
import TipoInventarioRouter from './routes/TipoInventarioRouter';
import TipoReparacionRouter from './routes/TipoReparacionRouter';
import TipoServicioRouter from './routes/tipoServicioRouter';
import UbicacionDanioRouter from './routes/UbicacionDanioRouter';
import usuariosRoutes from './routes/usuariosRoutes';
import VinRoutes from './routes/vinRoutes';
import DanioEstadoRouter from './routes/DanioEstadoRouter';
import SendMailRouter from './routes/SendMailRouter';
import ModelsRouter from './routes/ModelsRouter';
class Server{

    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.route();
    }

    config() : void {
        this.app.set('port', process.env.PORT || 3000);

        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use('/uploads', express.static(path.resolve('uploads')));
    }

    route() : void {
        this.app.use('/', indexRoutes);
        this.app.use('/api/autotech/actividades', ActividadesRouter);
        this.app.use('/api/autotech/areadanio', AreaDanioRouter);
        this.app.use('/api/autotech/clientes', ClientesRoutes);
        this.app.use('/api/autotech/danioEstado',DanioEstadoRouter);
        this.app.use('/api/autotech/danios', DaniosRouter);
        this.app.use('/api/autotech/decoder', DecoderRouter);
        this.app.use('/api/autotech/decoder13', Decoder13Router);
        this.app.use('/api/autotech/decoder4', Decoder4Router);
        this.app.use('/api/autotech/decoder57', Decoder57Router);
        this.app.use('/api/autotech/decoder8', Decoder8Router);
        this.app.use('/api/autotech/decoder10', Decoder10Router);
        this.app.use('/api/autotech/decoder11', Decoder11Router);
        this.app.use('/api/autotech/departamento',DepartamentoRouter);
        this.app.use('/api/autotech/empleados', EmpleadosRouter);
        this.app.use('/api/autotech/estadoProceso', EstadoProcesoRouter);
        this.app.use('/api/autotech/geocercas', geocercasRoute);
        this.app.use('/api/autotech/herramientas', HerramientasRouter);
        this.app.use('/api/autotech/historialTarifas', HistorialTarifasRouter);
        this.app.use('/api/autotech/inventarioEtiqueta', InventarioEtiquetaRouter);
        this.app.use('/api/autotech/inventarioPatio', InventarioPatioController);
        this.app.use('/api/autotech/listas', listasRouter);
        this.app.use('/api/autotech/localidades', localidadRoute);
        this.app.use('/api/autotech/localidadesProveedores', LocalidadesProveedoresRoutes);
        this.app.use('/api/autotech/manifiesto', ManifiestoRouter);
        this.app.use('/api/autotech/model', ModelsRouter);
        this.app.use('/api/autotech/patios', PatiosRouter); 
        this.app.use('/api/autotech/proceso', ProcesoRouter);
        this.app.use('/api/autotech/proveedores', ProveedoresRouter);
        this.app.use('/api/autotech/reporteServicios', ReporteServiciosRouter);
        this.app.use('/api/autotech/rol',RolRouter);
        this.app.use('/api/autotech/Email', SendMailRouter);
        this.app.use('/api/autotech/severidadFDanio', SeveridadFactorDanioRouter);
        this.app.use('/api/autotech/ArchivosTipoServicio', SubirArchivoRouter);
        this.app.use('/api/autotech/tipodanio', TipoDanioRouter);
        this.app.use('/api/autotech/tipoInventario', TipoInventarioRouter);
        this.app.use('/api/autotech/tiporeparacion', TipoReparacionRouter);
        this.app.use('/api/autotech/tiposervicio', TipoServicioRouter);
        this.app.use('/api/autotech/ubicaciondanio', UbicacionDanioRouter);
        this.app.use('/api/autotech/usuarios', usuariosRoutes);
        this.app.use('/api/autotech/vin', VinRoutes);
    }

    start() : void {
        this.app.listen(this.app.get('port'), () =>{
            console.log('Servidor en el puerto', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();