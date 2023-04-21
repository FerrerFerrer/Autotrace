import { Request, Response } from 'express';
import pool from '../database';

class InventarioPatioController {

  public async obtenerInventarioPatio(req: Request, res: Response): Promise<any> {
    const hold = req.params.hold;
    const marca = req.params.marca;
    const geocercas = req.params.geocercas;
    const localidad = req.params.localidad;
    try {
      const result = await pool.query('call obtenerInventarioPatio(?,?,?,?)', [hold, marca, geocercas, localidad]);
      return res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async obtenerInventarioTransito(req: Request, res: Response): Promise<any> {
    const marca = req.params.marca;
    const tipoServicio = req.params.tipoServicio;
    const idLocalidad = req.params.idLocalidad;
    try {
      const result = await pool.query('call obtenerInventarioTransito(?, ?, ?)', [marca, tipoServicio, idLocalidad]);
      return res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async datosPlacardsXListaVins(req: Request, res: Response): Promise<any> {
    const lista = req.params.lista;
    try {
      const result = await pool.query('call datosPlacardsXListaVins(?)', [lista]);
      return res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async obtInventarioTransitoListaVins(req: Request, res: Response): Promise<any> {
    const lista = req.params.lista;
    const idLocalidad = req.params.idLocalidad;
    try {
      const result = await pool.query('call obtInventarioTransitoListaVins(?, ?)', [lista, idLocalidad]);
      return res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async obtInventarioTransitoListaVinsV2(req: Request, res: Response): Promise<any> {
    const { pa_vins, idLocalidad } = req.body;
    console.log(pa_vins);
    try {
      var result: any[] = [];

      const consulta = async (vin: any, idLocalidad: any) => {
        const data = await pool.query("call obtInventarioTransitoListaVinsV2(?,?)", [vin, idLocalidad]);
        return data[0];
      };

      const fetching = async () => {
        const vins = pa_vins;
        await vins.reduce(async (previousPromise: any, vin: any) => {
          await previousPromise;
          result.push(await consulta(vin, idLocalidad));
          return Promise.resolve();
        }, Promise.resolve());
        res.status(200).json(result);
      };

      fetching();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async ocuparCajon(req: Request, res: Response): Promise<any> {
    // const obj = JSON.parse(JSON.stringify(req.body));
    // req.body = [Object: null prototype] { title: 'product' }
    let vin:string = "";
    let tamanio:string = ""
    const postBody = () =>{
      const obj = JSON.stringify(req.body);

      let dospuntos = obj.search('":"');
      let cuerpo = obj.substring(2, dospuntos);

      let dospuntos2 = cuerpo.search(':');
      vin = cuerpo.substring(0, dospuntos2);
      tamanio = cuerpo.substring(dospuntos2 + 1 , cuerpo.length);
      console.log("vin "+vin,"t " + tamanio);
    }
     
    postBody();
    try {
      console.log("entro");
      const resultado = await pool.query("call ocuparCajones(?, ?)", [vin, tamanio,]);
      return res.status(200).json(resultado);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }

  public async desocuparCajon(
    req: Request,
    res: Response
  ): Promise<any> {
    const vin = req.body.vin;
    try {
      const resultado = await pool.query(
        "call desocuparCajones(?)", [vin]);
      return res.status(200).json(resultado);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }

  public async MostrarCajon(req: Request, res: Response): Promise<any> {
    const vin = req.body.vin;
    try {
      const result = await pool.query('call mostrarCajon(?)', [vin]);
      return res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

}

const inventarioPatio = new InventarioPatioController();
export default inventarioPatio;