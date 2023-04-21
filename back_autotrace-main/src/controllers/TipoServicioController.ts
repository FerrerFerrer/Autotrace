import { Request, Response } from 'express';
import pool from '../database';

class TipoServicioController {

    public async list(req: Request, res: Response): Promise<any> {
        try {
            const tipoServicio = await pool.query('call listarTipoServicio()');
            res.status(200).json(tipoServicio);
        } catch (error: any) {
            res.status(404).json({ mensaje: error.message });
        }
    }

    public async insertarTipoServicio(req: Request, res: Response): Promise<any> {
        const { tipoServicio,
            estado,
            esServicioSistema,
            observaciones,
            tarifa,
            moneda,
            fechaExpiracion,
            idUsuarioCreo
        } = req.body;


        try {
            await pool.query('call insertarTipoServicio(?, ?, ?, ?, ?, ?, ?, ?)', [tipoServicio,
                estado,
                esServicioSistema,
                observaciones,
                tarifa,
                moneda,
                fechaExpiracion,
                idUsuarioCreo]);
            res.status(200).json();
        } catch (error: any) {
            res.status(404).json({ mensaje: error.message });
        }
    }



    public async actualizarTipoServicio(req: Request, res: Response): Promise<any> {
        const {
            idtipoServicio,
            tipoServicio,
            estado,
            esServicioSistema,
            observaciones,
            tarifa
            , moneda
            , fechaExpiracion
            , idUsuarioCreo
        } = req.body;


        try {
            await pool.query('call actualizarTipoServicio(?, ?, ?, ?, ?, ?, ?, ?,?)', [idtipoServicio,
                tipoServicio,
                estado,
                esServicioSistema,
                observaciones,
                tarifa
                , moneda
                , fechaExpiracion
                , idUsuarioCreo
            ]);
            res.status(200).json();
        } catch (error: any) {
            res.status(404).json({ mensaje: error.message });
        }
    }


    public async buscarTipoServicio(req: Request, res: Response): Promise<any> {
        const idtipoServicio = req.params.idtipoServicio;
        try {
            const resultados = await pool.query('call buscarTipoServicio(?)', idtipoServicio);
            res.status(200).json(resultados);
        } catch (error: any) {
            res.status(404).json({ mensaje: error.message });
        }
    }

    public async buscarPatronTipoServicio(req: Request, res: Response): Promise<any> {
        const cadena = req.params.cadena;
        try {
            const resultados = await pool.query('call buscarPatronTipoServicio(?)', cadena);
            res.status(200).json(resultados);
        } catch (error: any) {
            res.status(404).json({ mensaje: error.message });
        }
    }


    public async eliminarTipoServicio(req: Request, res: Response): Promise<any> {
        const { idtipoServicio, idUsuario } = req.body;


        try {
            await pool.query('call eliminarTipoServicio(?, ?)', [idtipoServicio, idUsuario]);
            res.status(200).json();
        } catch (error: any) {
            res.status(404).json({ mensaje: error.message });
        }
    }

    public async actualizarEstadoTipoServicio(req: Request, res: Response): Promise<any> {
        const { idtipoServicio, estado } = req.body;


        try {
            await pool.query('call actualizarEstadoTipoServicio(?, ?)', [idtipoServicio, estado]);
            res.status(200).json();
        } catch (error: any) {
            res.status(404).json({ mensaje: error.message });
        }
    }


    public async obtenerEstadoSiguiente(req: Request, res: Response): Promise<any> {

        const idtipoServicio = req.params.idtipoServicio;
        const idUsuario = req.params.idUsuario;

        try {
            const resultados = await pool.query('call obtenerEstadoSiguiente(?, ?)', [idtipoServicio, idUsuario]);
            res.status(200).json(resultados);
        } catch (error: any) {
            res.status(404).json({ mensaje: error.message });
        }
    }

    public async listActividadesXCliente(req: Request, res: Response): Promise<any> {
        const pa_idcliente = req.params.pa_idcliente;
        const pa_idtipoServicio = req.params.pa_idtipoServicio;
        try {
            const tipoServicio = await pool.query('call actividadesXCliente(?,?)', [pa_idcliente,pa_idtipoServicio]);
            res.status(200).json(tipoServicio);
        } catch (error: any) {
            res.status(404).json({ mensaje: error.message });
        }
    }

    public async listActividadesXClienteNo(req: Request, res: Response): Promise<any> {
        const pa_idcliente = req.params.pa_idcliente;
        const pa_idtipoServicio = req.params.pa_idtipoServicio;
        try {
            const tipoServicio = await pool.query('call actividadesXClienteNo(?,?)', [pa_idcliente,pa_idtipoServicio]);
            res.status(200).json(tipoServicio);
        } catch (error: any) {
            res.status(404).json({ mensaje: error.message });
        }
    }

    public async actualizarCotizacionServicio(req: Request, res: Response): Promise<any> {
        const {pa_idtipoServicio , pa_cveDepartamento ,pa_moneda,pa_tarifa,pa_idusuario}= req.body;
        try {
            await pool.query('call actualizarCotizacionServicio(?, ?,?,?,?)', [pa_idtipoServicio , pa_cveDepartamento ,pa_moneda,pa_tarifa,pa_idusuario]);
            res.status(200).json();
        } catch (error: any) {
            res.status(404).json({ mensaje: error.message });
        }
    }

    public async insertarActividadTipoServicio(req: Request, res: Response): Promise<any> {
        const {pa_idtipoServicio , pa_cveActividad}= req.body;
        try {
            await pool.query('call insertarActividadTipoServicio(?, ?)', [pa_idtipoServicio , pa_cveActividad]);
            res.status(200).json();
        } catch (error: any) {
            res.status(404).json({ mensaje: error.message });
        }
    }

    public async eliminarActividadTipoServicio(req: Request, res: Response): Promise<any> {
        const {pa_idtipoServicio , pa_cveActividad}= req.body;
        try {
            await pool.query('call eliminarActividadTipoServicio(?, ?)', [pa_idtipoServicio , pa_cveActividad]);
            res.status(200).json();
        } catch (error: any) {
            res.status(404).json({ mensaje: error.message });
        }
    }
    

    public async obtenerTodosServiciosPorUsuario(req: Request, res: Response): Promise<any> {
        const idusuario = req.params.idusuario;
        try {
            const results = await pool.query('call tipoServiciosAsignadoUsuario(?)', [idusuario]);
            res.status(200).json(results);
        } catch (error : any) {
            res.status(500).json({ mensaje: error.message });
        }
    }
}

const tiposervicio = new TipoServicioController();
export default tiposervicio;