import { Request, Response } from 'express';
import pool from '../database';
import path from 'path';

class DanioController {

    public async crearDanio(req: Request, res: Response) {
        const { vin, cveTipoDanio, cveUbicacionDanio, cveSeveridadFactorDanio,
            cveAreaDanio, cveAreaDanioAdicional, cveTipoReparacion, fechaInicioReparacion, fechaReparacion,
            observaciones, responsable, idDanioEstado, clasificacion, tipo } = req.body;
        const nombre = req.file?.originalname;
        const ruta = '/vin_' + vin + '/' + vin + '_url' + tipo + path.extname(String(nombre));
        try {
            const response = await pool.query('call insertarDanio(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [vin, cveTipoDanio, cveUbicacionDanio, cveSeveridadFactorDanio,
                    cveAreaDanio, cveAreaDanioAdicional, cveTipoReparacion, fechaInicioReparacion, fechaReparacion,
                    observaciones, responsable, idDanioEstado, ruta, clasificacion]);
            const id = response[0];
            res.status(200).json({
                message: "Daño registrado correctamente",
                id
            });
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }

    public async crearDanioApp(req: Request, res: Response) {
        let { vin,
            cveTipoDanio,
            cveUbicacionDanio,
            cveSeveridadFactorDanio,
            cveAreaDanio,
            cveAreaDanioAdicional,
            observaciones,
            responsable,
            idDanioEstado,
            clasificacion,
            tipo } = req.body;

        // console.log(req.body);
        // const test:String=vin;
        // console.log(test);

        // const test:String=req.body.vin;
        // let vin=test.slice(1,-1);
        // console.log(vin);
        try {
            vin = vin.slice(1, -1);
            console.log(vin);
            cveTipoDanio = cveTipoDanio.slice(1, -1);
            cveUbicacionDanio = cveUbicacionDanio.slice(1, -1);
            cveSeveridadFactorDanio = cveSeveridadFactorDanio.slice(1, -1);
            cveAreaDanio = cveAreaDanio.slice(1, -1);
            cveAreaDanioAdicional = cveAreaDanioAdicional.slice(1, -1);
            //observaciones=observaciones.slice(1,-1); responsable=responsable.slice(1,-1);
            clasificacion = clasificacion.slice(1, -1); tipo = tipo.slice(1, -1);

            const nombre = req.file?.originalname;

            const ruta = '/vin_' + vin + '/' + vin + '_url' + tipo + path.extname(String(nombre));

            console.log(ruta);

            const response = await pool.query('call insertarDanioApp(?,?,?,?,?,?,?,?,?,?,?)',
                [vin,
                    cveTipoDanio,
                    cveUbicacionDanio,
                    cveSeveridadFactorDanio,
                    cveAreaDanio,
                    cveAreaDanioAdicional,
                    observaciones,
                    responsable,
                    idDanioEstado,
                    ruta,
                    clasificacion]);

            const id = response[0];

            res.status(200).json({ message: "Daño registrado correctamente", id });

        } catch (error: any) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }

    public async insertarFotografiaDanio(req: Request, res: Response): Promise<any> {
        const nombre = req.file?.originalname;

        let { iddanio,
            vin,
            numeroFoto,
            tipo,
            tipoEvidencia } = req.body;
        try {
            vin = vin.slice(1, -1);
            tipo = tipo.slice(1, -1);

            const ruta = '/vin_' + vin + '/' + iddanio + '_url' + tipo + "_" + numeroFoto + path.extname(String(nombre));

            const response = await pool.query('call insertarFotografiaDanio(?, ?, ?)', [iddanio, ruta, tipoEvidencia]);
            const id = response[0];

            res.status(200).json({
                message: "La fotografia del daño se guardo correctamente", id
            });

        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }

    public async actualizarDanio(req: Request, res: Response): Promise<any> {
        const idDanio = req.params.idDanio;
        const { vin, cveTipoDanio, cveUbicacionDanio, cveSeveridadFactorDanio,
            cveAreaDanio, cveAreaDanioAdicional, cveTipoReparacion, fechaInicioReparacion, fechaReparacion,
            observaciones, responsable, idDanioEstado, clasificacion } = req.body;
        console.log('idDanio: ' + idDanio);
        console.log(req.body);
        try {
            await pool.query('call actualizarDanio(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,  ?)',
                [idDanio, cveTipoDanio, cveUbicacionDanio, cveSeveridadFactorDanio,
                    cveAreaDanio, cveAreaDanioAdicional, cveTipoReparacion, fechaInicioReparacion, fechaReparacion,
                    observaciones, responsable, idDanioEstado, clasificacion]);
            res.status(200).json({
                message: "Daño actualizado correctamente "
            });
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }


    public async actualizarDanioApp(req: Request, res: Response): Promise<any> {
        // const idDanio = req.params.idDanio;
        const { idDanio, cveTipoReparacion, fechaInicioReparacion, idDanioEstado } = req.body;
        console.log('idDanio: ' + idDanio);
        console.log(req.body);
        try {
            await pool.query('call actualizarDanioApp(?, ?, ?, ?)',
                [idDanio, cveTipoReparacion, fechaInicioReparacion, idDanioEstado]);
            res.status(200).json({
                message: "Daño actualizado correctamente "
            });
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }




    public async getAllFotografiasDanio(req: Request, res: Response): Promise<any> {
        const iddanio = req.params.iddanio;
        try {
            const results = await pool.query('call urlFotografiasDanio(?)', [iddanio]);
            res.status(200).json(results);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    public async busqFiltradaListaDanios(req: Request, res: Response): Promise<any> {

        const fechaIn = req.params.fechaIni;
        const fechaFin = req.params.fechaFin;
        const cliente = req.params.cliente;
        const cveAreaDanio = req.params.areaDanio;
        const cveTipoDanio = req.params.tipoDanio;
        const danioEstado = req.params.danioEstado;
        const geocerca = req.params.geocercas;
        const idLocalidad = req.params.idLocalidad;

        try {
            const result = await pool.query('call busqFiltradaListaDanios(?,?,?,?,?,?,?,?)', [fechaIn,
                fechaFin,
                cliente,
                cveAreaDanio,
                cveTipoDanio,
                danioEstado,
                geocerca,
                idLocalidad]);
            return res.json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }

    public async busqFiltradaXVinsDanios(req: Request, res: Response): Promise<any> {
        const lista = req.params.lista;
        const idLocalidad = req.params.idLocalidad;
        try {
            const result = await pool.query('call busqFiltradaXVinsDanios(?,?)', [lista, idLocalidad]);
            return res.json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }

    public async busqFiltradaXVinsDaniosV2(req: Request, res: Response): Promise<any> {
        const { pa_vins, idlocalidad } = req.body;
        console.log(pa_vins);
        try {
            var result: any[] = [];

            const consulta = async (vin: any, idlocalidad: any) => {
                const data = await pool.query("call busqFiltradaXVinsDaniosV2(?,?)", [vin, idlocalidad]);
                return data[0];
            };

            const fetching = async () => {
                const vins = pa_vins;
                await vins.reduce(async (previousPromise: any, vin: any) => {
                    await previousPromise;
                    result.push(await consulta(vin, idlocalidad));
                    return Promise.resolve();
                }, Promise.resolve());
                res.status(200).json(result);
            };

            fetching();
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }


    public async consultaDetallesDanio(req: Request, res: Response): Promise<any> {
        const vin = req.params.vin;
        try {
            const result = await pool.query('call consultaDetallesDanio(?)', [vin]);
            return res.json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }



    public async ubicacionActualVin(req: Request, res: Response): Promise<any> {
        const vin = req.params.vin;
        try {
            const result = await pool.query('call ubicacionActualVin(?)', [vin]);
            return res.json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }

    public async dañosclasificacion(req: Request, res: Response): Promise<any> {
        const fechaInicio = req.params.fechaInicio;
        const fechaFinal = req.params.fechaFinal;
        const clasificacion = req.params.clasificacion;

        try {
            const results = await pool.query('call datosGraficaClasificacion(?, ?, ?)', [fechaInicio, fechaFinal, clasificacion]);
            res.status(200).json(results[0]);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async dañosEstatus(req: Request, res: Response): Promise<any> {
        const fechaInicio = req.params.fechaInicio;
        const fechaFinal = req.params.fechaFinal;

        try {
            const results = await pool.query('call datosGraficaEstatus(?, ?)', [fechaInicio, fechaFinal]);
            res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async datosResponsable(req: Request, res: Response): Promise<any> {
        const fechaInicio = req.params.fechaInicio;
        const fechaFinal = req.params.fechaFinal;

        try {
            const results = await pool.query('call datosGraficaResponsable(?, ?)', [fechaInicio, fechaFinal]);
            res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async exportarDaniosExcel(req: Request, res: Response): Promise<any> {
        const { vins } = req.body;
        console.log('vins: ' + vins);
        console.log(req.body);
        try {
            const results = await pool.query('call exportarDaniosExcel(?)', [vins]);
            res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }


}

const danio = new DanioController();
export default danio;