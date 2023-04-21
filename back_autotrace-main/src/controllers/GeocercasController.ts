import { Request, Response } from 'express';
import pool from '../database';

class GeocercasController {

    public async geocercasLocalidad(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const geocercas = await pool.query('select idgeocerca, geocerca, vehiculosXGeocerca(idgeocerca) AS subtotal from geocercas_localidades where idlocalidad = ?;', [id]);
        if (geocercas.length > 0) {
            return res.json(geocercas);
        }
        res.status(404).json({ text: "No existen Geocercas asignadas a la Localidad" });
    }

    public async subtotalesGeocercas(req: Request, res: Response): Promise<any> {
        const idlocalidad = req.params.id;
        const subtotales = await pool.query('call subtotales_vins_geocerca(?)', [idlocalidad]);
        if (subtotales.length > 0)
            return res.json(subtotales);
        else res.status(404).json({ text: "No se puede contabilizar el subtotal por Geocerca. No existen unidades asignadas a Geocerca" });
    }

    public async busqueda_vin(req: Request, res: Response): Promise<any> {
        const idlocalidad = req.params.idlocalidad;
        const vin = req.params.vin;
        if (vin === "" || vin === undefined || vin === null) {
            res.status(404).json({ text: "Error" });
        }
        const resultados = await pool.query('call busqueda_vin(?, ?)', [idlocalidad, vin]);
        return res.json(resultados);
    }

    public async busqueda_tipoServicio(req: Request, res: Response): Promise<any> {
        const idlocalidad = req.params.idlocalidad;
        const tipoServicio = req.params.tipoServicio;
        if (tipoServicio === "" || tipoServicio === undefined || tipoServicio === null) {
            res.status(404).json({ text: "Error" });
        }
        const resultados = await pool.query('call busqueda_tipoServicio(?, ?)', [idlocalidad, tipoServicio]);
        return res.json(resultados);
    }

    public async getPuntosPoligono(req: Request, res: Response): Promise<any> {
        const idgeocerca = req.params.id;
        const puntos = await pool.query('select longitud, latitud FROM puntospoligono WHERE idgeocerca = ?;', [idgeocerca]);
        return res.status(200).json(puntos);
    }

    public async ubicacionVin(req: Request, res: Response): Promise<any> {
        const idlocalidad = req.params.idlocalidad;
        const ubicaciones = await pool.query('call ubicacionVinPorGeocerca(?)', [idlocalidad]);
        res.json(ubicaciones);
    }

    public async obtenerGeocercasLista(req: Request, res: Response): Promise<any> {
        const idlista = req.params.idlista;
        const geocercaslista = await pool.query('call obtenerGeocercasLista(?)', idlista);
        res.json(geocercaslista);
    }

    public async vinporGeocerca(req: Request, res: Response): Promise<any> {
        const idgeocerca = req.params.idgeocerca;
        const resultado = await pool.query('call vinsPorGeocerca(?)', idgeocerca);
        return res.json(resultado);
    }

    public async busqFiltradaMapDist(req: Request, res: Response): Promise<any> {
        const fechaInicio = req.params.fechaInicio;
        const fechaFin = req.params.fechaFin;
        const geocerca = req.params.geocerca;
        const tipoServicio = req.params.tipoServicio;
        const estadoProceso = req.params.estadoProceso;
        const localidad=req.params.localidad;

        const result = await pool.query('call busqFiltradaMapDist(?,?,?,?,?,?)', [fechaInicio, fechaFin, geocerca, tipoServicio, estadoProceso, localidad]);
        return res.json(result);
    }

    public async listaVinsMapDistribucion(req: Request, res: Response): Promise<any> {
        const lista = req.params.lista;
        const localidad=req.params.localidad;
        const result = await pool.query('call listaVinsMapDistribucion(?,?)', [lista, localidad]);
        return res.json(result);
    }

    public async listaVinsMapDistribucionV2(req: Request, res: Response): Promise<any> {
        const { pa_vins, idlocalidad } = req.body;
        console.log(pa_vins);
        try {
          var result: any[] = [];
    
          const consulta = async (vin:any, idlocalidad:any) => {
            const data = await pool.query("call listaVinsMapDistribucionV2(?,?)", [vin, idlocalidad]);
            return data[0];
          };
    
          const fetching = async () => {
            const vins = pa_vins;
            await vins.reduce(async (previousPromise:any, vin:any) => {
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

    public async busqFiltradaHistorial(req: Request, res: Response) {
        const fechaInicio = req.params.fechaInicio;
        const fechaFin = req.params.fechaFin;
        const geocerca = req.params.geocerca;
        const tipoServicio = req.params.tipoServicio;
        const estadoProceso = req.params.estadoProceso;
        const localidad=req.params.localidad;

        const result = await pool.query('call busqFiltradaHistorial(?,?,?,?,?,?)', [fechaInicio, fechaFin, geocerca, tipoServicio, estadoProceso,localidad]);
        return res.json(result);
    }

    public async listaVinsHistorial(req: Request, res: Response) {
        const lista = req.params.lista;
        const localidad=req.params.localidad;
        const result = await pool.query('call listaVinsHistorial(?,?)', [lista,localidad]);
        return res.json(result);
    }

    public async listaVinsHistorialV2(req: Request, res: Response) {
        const { pa_vins, idlocalidad } = req.body;
        try {
          var result: any[] = [];
    
          const consulta = async (vin:any, idlocalidad:any) => {
            const data = await pool.query("call listaVinsHistorialV2(?,?)", [vin, idlocalidad]);
            return data[0];
          };
    
          const fetching = async () => {
            const vins = pa_vins;
            await vins.reduce(async (previousPromise:any, vin:any) => {
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


    public async geocercasMapaDistribucion(req: Request, res: Response) {
        const fechaInicio = req.params.fechaInicio;
        const fechaFin = req.params.fechaFin;
        const geocerca = req.params.geocerca;
        const tipoServicio = req.params.tipoServicio;
        const estadoProceso = req.params.estadoProceso;

        const result = await pool.query('call geocercasMapaDistribucion(?,?,?,?,?)', [fechaInicio, fechaFin, geocerca, tipoServicio, estadoProceso]);
        return res.json(result);
    }

    public async geocercasListaVins(req: Request, res: Response) {
        const lista = req.params.lista;
        const result = await pool.query('call geocercasListaVins(?)', [lista]);
        return res.json(result);
    }

    public async geocercasListaVinsV2(req: Request, res: Response) {
        const { pa_vins, idlocalidad } = req.body;
        try {
          var result: any[] = [];
    
          const consulta = async (vin:any, idlocalidad:any) => {
            const data = await pool.query("call geocercasListaVinsV2(?,?)", [vin, idlocalidad]);
            return data[0];
          };
    
          const fetching = async () => {
            const vins = pa_vins;
            await vins.reduce(async (previousPromise:any, vin:any) => {
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

    public async buscar(req: Request, res: Response): Promise<any> {
        const cadena = req.params.cadena;
        try {
            const results = await pool.query('call buscarPatronGeocerca(?)',[cadena]);
            res.status(200).json(results);
        } catch (error : any) {
            res.status(500).json({message: error.message});
        }
    }

    public async cambiarActivoInactivoGeocerca(req: Request, res: Response): Promise<any>{
        const idgeocerca = req.params.idgeocerca;
        const activo = req.params.activo;

        try {
            await pool.query('call cambiarActivoInactivoGeocerca(?,?)',[idgeocerca, activo]);
            res.status(200).json({message: "Se actualizo el status de la geocerca correctamente"});
        } catch (error :any) {
            res.status(500).json({mensaje: error.message});
        }
    }

    public async createGeocerca(req: Request, res: Response): Promise<any>{
        const { idgeocerca, idlocalidad, geocerca } = req.body;

        try {
            await pool.query('call insertarGeocerca(?, ?, ?)',[idgeocerca, idlocalidad, geocerca]);
            res.status(200).json({message: "Geocerca creada correctamente"});
        } catch (error : any) {
            res.status(500).json({message: error.message})
        }
    }

    public async createPuntoPoligono(req: Request, res: Response): Promise<any>{
        const { idgeocerca, longitud, latitud } = req.body;
        
        try {
            await pool.query('call insertarPuntoPoligonoGeocerca(?, ?, ?)',[idgeocerca, longitud, latitud]);
            res.status(200).json({message: "Se creo los puntos del poligono correctamente"});
        } catch (error : any) {
            res.status(500).json({message: error.message})
        }
    }

    public async deletePuntosPoligono(req: Request, res: Response): Promise<any>{
        const idgeocerca = req.params.idgeocerca;

        try {
            await pool.query('call eliminarPoligonoGeocerca(?)',[idgeocerca]);
            res.status(200).json({message: "Se elimino los puntos del poligono de la geocerca correctamente"});
        } catch (error : any) {
            res.status(500).json({message: error.message})
        }
    }

    public async deleteGeocerca(req: Request, res: Response): Promise<any>{
        const idgeocerca = req.params.idgeocerca;
        try {
            await pool.query('call eliminarGeocerca(?)',[idgeocerca]);
            res.status(200).json({message: "Se elimino la geocerca correctamente"});
        } catch (error : any) {
            res.status(500).json({message: error.message})
        }
    }

    public async getAll(req: Request, res: Response): Promise<any>{
        try {
            const results = await pool.query('call listarGeocercas()');
            res.status(200).json(results);
        } catch (error : any) {
            res.status(500).json({message: error.message});
        }
    }

    public async updateGecerca(req: Request, res: Response): Promise<any> {
        const idgeocerca = req.params.idgeocerca;
        const { idgeocercaNuevo, idlocalidad, geocerca } = req.body;

        try {
            await pool.query('call actualizarGeocerca(?, ?, ?, ?)',[idgeocerca, idgeocercaNuevo, idlocalidad, geocerca]);
            res.status(200).json({message: "Geocerca actualizada correctamente"});
        } catch (error : any) {
            res.status(500).json({message: error.message})
        }
    }

    public async listarGeocercasLocalidad(req: Request, res: Response): Promise<any> {
        const idlocalidad = req.params.idlocalidad;
        try {
            const results = await pool.query('call listarGeocercasLocalidad(?)',[idlocalidad]);
            res.status(200).json(results[0]);
        } catch (error : any) {
            res.status(500).json({message: error.message})
        }

    }

}

const geocercas = new GeocercasController();
export default geocercas;