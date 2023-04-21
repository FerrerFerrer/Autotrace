import { Request, Response } from "express";

import pool from "../database";

class VinController {
  public async getOne(req: Request, res: Response): Promise<any> {
    const vin: string = req.params.vin;
    try {
      const results = await pool.query("call consultarVin(?)", [vin]);
      res.status(200).json(results);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
    // }
  }

  public async sabana(req: Request, res: Response): Promise<any> {
    try {
      const results = await pool.query("call datosInternosSabana()");
      res.status(200).json(results);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
    // const result = await pool.query("call datosInternosSabana(?)");
    // res.json(result);
  }
  public async ingresoModel(req: Request, res: Response): Promise<any> {
    let model: string = req.body.model;
    let idCliente: string = req.body.idCliente;

    console.log(req.body);
    try {
      const resultado = await pool.query("call insertarModel(?,?)", [
        model,
        idCliente
      ]
      );
      return res.status(200).json(resultado);
    } catch (error: any) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }

  public async ingreso(req: Request, res: Response): Promise<any> {
    let idlocalidadUsuario: string = req.body.idlocalidadUsuario;
    let truckId: string = req.body.truckId;
    let vin: string = req.body.vin;
    let model: string = req.body.model;
    let origin: string = req.body.origin;
    let dealer: string = req.body.dealer;
    let weight: number = req.body.weight;
    let modelId: string = req.body.ModelID;
    let truckDriver: string = req.body.truckDriver;
    let carrier: string = req.body.carrier;
    let buqueViaje: string = req.body.buqueyviaje;
    let puertoDescarga: string = req.body.puertodeDescarga;
    let destinoFinal: string = req.body.destinofinal;
    let eta: string = req.body.eta;
    let demandArea: string = req.body.demandArea;
    let rampa: string = req.body.rampa;
    let mode: string = req.body.mode;
    // console.log(req.body);
    try {
      const resultado = await pool.query(
        "call ingreso_vin(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          idlocalidadUsuario,
          vin,
          truckId,
          model,
          origin,
          dealer,
          weight,
          modelId,
          truckDriver,
          carrier,
          buqueViaje,
          puertoDescarga,
          destinoFinal,
          eta,
          demandArea,
          rampa,
          mode,
        ]
      );
      return res.status(200).json(resultado);
    } catch (error: any) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }

  public async ingreso_dat(req: Request, res: Response): Promise<any> {
    let orden_venta: string = req.body.orden_venta;
    let fecha_venta: string = req.body.fecha_venta;
    let vin: string = req.body.vin;
    let cdo: string = req.body.cdo;
    let dealer: string = req.body.dealer;
    let model_id: string = req.body.model_id;
    let anio_model: string = req.body.anio_model;
    let conces: string = req.body.conces;
    let ventaDirecta: string = req.body.ventaDirecta;
    let anio_mod: number = req.body.anio_mod;
    let pedimento: string = req.body.pedimento;
    let fecha_ped: string = req.body.fecha_ped;
    let color: string = req.body.color;

    // console.log(req.body);
    try {
      const resultado = await pool.query(
        "call ingreso_dat(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          orden_venta,
          fecha_venta,
          cdo,
          dealer,
          model_id,
          anio_model,
          vin,
          conces,
          ventaDirecta,
          anio_mod,
          pedimento,
          fecha_ped,
          color
        ]
      );
      return res.status(200).json(resultado);
    }
    catch (error: any) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }

  public async ingreso_gm_total(req: Request, res: Response): Promise<any> {
    let model_year: string = req.body.model_year;
    let o_v: string = req.body.o_v;
    let vin: string = req.body.vin;
    let cd_model: string = req.body.cd_model;
    let pack: string = req.body.pack;
    let color_ext: string = req.body.color_ext;
    let color_int: string = req.body.color_int;
    let nomenclatura: string = req.body.nomenclatura;
    let order_type: string = req.body.order_type;
    let d_code: number = req.body.d_code;
    let owner: string = req.body.owner;
    let entity: string = req.body.entity;
    let location: string = req.body.location;
    let status: string = req.body.status;
    let subst: string = req.body.subst;
    let voms_sts: string = req.body.voms_sts;
    let voms_sts_desc: string = req.body.voms_sts_desc;
    let qty: string = req.body.qty;
    let comments: string = req.body.comments;
    let age_produced: string = req.body.age_produced;
    let age_st: string = req.body.age_st;
    let age_orig_invoice: string = req.body.age_orig_invoice;
    let age_at_vdc: string = req.body.age_at_vdc;
    let age_avail: string = req.body.age_avail;
    let rcvd_date: string = req.body.rcvd_date;
    let sts_date: string = req.body.sts_date;

    // console.log(req.body);
    try {
      const resultado = await pool.query(
        "call ingreso_gm_total(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          model_year,
          o_v,
          vin,
          cd_model,
          pack,
          color_ext,
          color_int,
          nomenclatura,
          order_type,
          d_code,
          owner,
          entity,
          location,
          status,
          subst,
          voms_sts,
          voms_sts_desc,
          qty,
          comments,
          age_produced,
          age_st,
          age_orig_invoice,
          age_at_vdc,
          age_avail,
          rcvd_date,
          sts_date,
        ]
      );
      return res.status(200).json(resultado);
    } catch (error: any) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }

  public async bitacora(req: Request, res: Response): Promise<any> {
    const result = await pool.query("INSERT INTO bitacora set ?", [req.body]);
    res.status(200).json({ message: "" });
  }

  public async manifiesto(req: Request, res: Response): Promise<any> {
    let vin: string = req.body.vin;
    let model: string = req.body.model;
    let dealer: string = req.body.dealer;
    let nomeclature: string = req.body.Nomenclature;
    let weightKGS: string = req.body.WeightKGS;
    let plantOfOrigin: string = req.body.PlantofOrigin;
    let fobPriceUsd: string = req.body.FOBPriceUSD;
    let oceanFreight: string = req.body.OceanFreight;
    let totalCFR: string = req.body.TOTALCRF;
    let loc: string = req.body.LOC;
    try {
      const resultado = await pool.query(
        "call manifiesto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          vin,
          model,
          dealer,
          nomeclature,
          weightKGS,
          plantOfOrigin,
          fobPriceUsd,
          oceanFreight,
          totalCFR,
          loc,
        ]
      );
      return res.status(200).json(resultado);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }

  public async actualizarVinManifiesto(
    req: Request,
    res: Response
  ): Promise<any> {
    const vin = req.params.vin;
    try {
      await pool.query("UPDATE vin set ? WHERE vin = ?", [req.body, vin]);
      res.status(200).json({ message: "El VIN ha sido modificada" });
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }

  public async historicoServiciosVin(
    req: Request,
    res: Response
  ): Promise<any> {
    const vin = req.params.vin;
    const result = await pool.query("call historicoServiciosVin(?)", vin);
    res.json(result);
  }

  public async historicoVin(req: Request, res: Response): Promise<any> {
    const vin = req.params.vin;
    const result = await pool.query("call historicoVin(?)", vin);
    res.json(result);
  }

  public async historialUbicacionesVin(
    req: Request,
    res: Response
  ): Promise<any> {
    const vin = req.params.vin;
    const result = await pool.query("call historialUbicacionesVin(?)", vin);
    res.json(result);
  }

  public async obtenerDecoderVin(req: Request, res: Response): Promise<any> {
    const vin = req.params.vin;
    const result = await pool.query("call obtenerDecoderVin(?)", vin);
    res.json(result);
  }

  public async obtenerPlacardVin(req: Request, res: Response): Promise<any> {
    const vin = req.params.vin;
    try {
      const result = await pool.query("call datosPlacard(?)", vin);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async busqFiltradaInicio(req: Request, res: Response): Promise<any> {
    const pa_idGeocerca = req.params.pa_idGeocerca;
    const pa_tipoServicio = req.params.pa_tipoServicio;
    const pa_fechaInicio = req.params.pa_fechaInicio;
    const pa_fechaFin = req.params.pa_fechaFin;
    const pa_conHistorico = req.params.pa_conHistorico;
    const pa_idLocalidad = req.params.pa_idLocalidad;

    try {
      const result = await pool.query("call busqFiltradaInicio(?,?,?,?,?,?)", [
        pa_idGeocerca,
        pa_tipoServicio,
        pa_fechaInicio,
        pa_fechaFin,
        pa_conHistorico,
        pa_idLocalidad,
      ]);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async busqXVinsInicio(req: Request, res: Response): Promise<any> {
    const pa_ListaVins = req.params.pa_ListaVins;
    const pa_conHistorico = req.params.pa_conHistorico;
    try {
      const result = await pool.query("call busqXVinsInicio(?,?)", [
        pa_ListaVins,
        pa_conHistorico,
      ]);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async busqXVinsInicioV2(req: Request, res: Response): Promise<any> {
    const { pa_vins, pa_conHistorico, pa_idLocalidad } = req.body;
    console.log(req.body)
    try {
      var result: any[] = [];

      const consulta = async (vin: any, hi: any) => {
        const data = await pool.query("call busqXVinsInicioV2(?,?,?)", [
          vin,
          hi,
          pa_idLocalidad,
        ]);
        return data[0];
      };

      const fetching = async () => {
        const vins = pa_vins;
        await vins.reduce(async (previousPromise: any, vin: any) => {
          await previousPromise;
          result.push(await consulta(vin, pa_conHistorico));
          return Promise.resolve();
        }, Promise.resolve());
        res.status(200).json(result);
      };

      fetching();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async createVin(req: Request, res: Response): Promise<any> {
    const {
      vin,
      idestadoProceso,
      idlocalidadUsuario,
      truckId,
      model,
      origin,
      dealer,
      weight,
      modelId,
      truckDriver,
      carrier,
      buqueViaje,
      puertoDescarga,
      destinoFinal,
      eta,
      demandArea,
      rampa,
      mode,
      fechaLiberacion,
      nomenclature,
      plantOfOrigin,
      FOBPrice,
      oceanFreight,
      totalCFR,
      loc,
    } = req.body;
    try {
      await pool.query(
        "call insertarVin(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          vin,
          idestadoProceso,
          idlocalidadUsuario,
          truckId,
          model,
          origin,
          dealer,
          weight,
          modelId,
          truckDriver,
          carrier,
          buqueViaje,
          puertoDescarga,
          destinoFinal,
          eta,
          demandArea,
          rampa,
          mode,
          fechaLiberacion,
          nomenclature,
          plantOfOrigin,
          FOBPrice,
          oceanFreight,
          totalCFR,
          loc,
        ]
      );
      res.status(200).json({ message: "EL Vin se registro correctamente" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async createVinHistorico(req: Request, res: Response): Promise<any> {
    const {
      idpatio,
      cajon,
      fila,
      bloque,
      idtipoServicio,
      longitud,
      latitud,
      fechaInicio,
      fechaSalido,
      idusuario,
      dispositivo,
      vin,
      estatusDFY,
      estatusVtims,
      estadoUnidad,
      folio,
    } = req.body;

    console.log(req.body);

    try {
      await pool.query(
        "call registrarVinHistorico(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
        [
          idpatio,
          cajon,
          fila,
          bloque,
          idtipoServicio,
          longitud,
          latitud,
          fechaInicio,
          fechaSalido,
          idusuario,
          dispositivo,
          vin,
          estatusDFY,
          estatusVtims,
          estadoUnidad,
          folio,
        ]
      );
      res
        .status(200)
        .json({ message: "Se registro el historico del Vin correctamente" });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }

  public async getManifiestoVin(req: Request, res: Response): Promise<any> {
    const vin = req.params.vin;
    try {
      const results = await pool.query("call consultarManifiestoDeVin(?)", [
        vin,
      ]);
      res.status(200).json(results);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async getModels(req: Request, res: Response): Promise<any> {
    const vin = req.params.vin;
    try {
      const results = await pool.query("call getModels()");
      res.status(200).json(results);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  public async getManifiesto(req: Request, res: Response): Promise<any> {
    const idmanifiesto = req.params.idmanifiesto;
    try {
      const results = await pool.query("call consultarManifiesto(?)", [
        idmanifiesto,
      ]);
      res.status(200).json(results);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async updateVin(req: Request, res: Response): Promise<any> {
    const vin = req.params.vin;
    const {
      idmanifiesto,
      idestadoProceso,
      idlocalidadUsuario,
      truckId,
      model,
      origin,
      dealer,
      weight,
      modelId,
      truckDriver,
      carrier,
      buqueViaje,
      puertoDescarga,
      destinoFinal,
      eta,
      demandArea,
      rampa,
      mode,
      fechaLiberacion,
      nomenclature,
      plantOfOrigin,
      FOBPrice,
      oceanFreight,
      totalCFR,
      loc,
    } = req.body;
    try {
      await pool.query(
        "call actualizarVin(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          vin,
          idmanifiesto,
          idestadoProceso,
          idlocalidadUsuario,
          truckId,
          model,
          origin,
          dealer,
          weight,
          modelId,
          truckDriver,
          carrier,
          buqueViaje,
          puertoDescarga,
          destinoFinal,
          eta,
          demandArea,
          rampa,
          mode,
          fechaLiberacion,
          nomenclature,
          plantOfOrigin,
          FOBPrice,
          oceanFreight,
          totalCFR,
          loc,
        ]
      );
      res.status(200).json({ message: "El Vin se actualizo correctamente" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async updateEstatusGM(req: Request, res: Response): Promise<any> {
    const idservicio = req.params.idservicio;
    const { estatus_DFY, estatusVtims } = req.body;
    try {
      await pool.query("call actualizarEstatusGM(?, ?, ?)", [
        idservicio,
        estatus_DFY,
        estatusVtims,
      ]);
      res
        .status(200)
        .json({ message: "Se actualizo el estatus GM del vin correctamente" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async updateVinHistorico(req: Request, res: Response): Promise<any> {
    const idservicio = req.params.idservicio;
    const {
      idpatio,
      cajon,
      fila,
      bloque,
      idtipoServicio,
      longitud,
      latitud,
      fechaInicio,
      fechaSalido,
      idusuario,
      dispositivo,
      vin,
      estatusDFY,
      estatusVtims,
      estadoUnidad,
    } = req.body;
    try {
      await pool.query(
        "call actualizarVinHistorico(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          idservicio,
          idpatio,
          cajon,
          fila,
          bloque,
          idtipoServicio,
          longitud,
          latitud,
          fechaInicio,
          fechaSalido,
          idusuario,
          dispositivo,
          vin,
          estatusDFY,
          estatusVtims,
          estadoUnidad,
        ]
      );
      res
        .status(200)
        .json({ message: "Se actualizo el historico del Vin correctamente" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async updateManifiesto(req: Request, res: Response): Promise<any> {
    const idmanifiesto = req.params.idmanifiesto;
    const {
      buque,
      viaje,
      estado,
      fechaBuque,
      puertoDescarga,
      idlocalidad,
      vinsCsv,
      vinsPendientesProcesar,
      vinsSegregados,
      vinsSalidas,
      vinInspeccionMuelle,
      fechaCargaArchivo,
    } = req.body;
    try {
      await pool.query(
        "call actualizarManifiesto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          idmanifiesto,
          buque,
          viaje,
          estado,
          fechaBuque,
          puertoDescarga,
          idlocalidad,
          vinsCsv,
          vinsPendientesProcesar,
          vinsSegregados,
          vinsSalidas,
          vinInspeccionMuelle,
          fechaCargaArchivo,
        ]
      );
      res
        .status(200)
        .json({ message: "El manifiesto se actualizo correctamente" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async idServicioActualVin(req: Request, res: Response): Promise<any> {
    const vin = req.params.vin;
    try {
      const result = await pool.query("select idServicioActualVin(?)", [vin]);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async tipoServicioActualVin(
    req: Request,
    res: Response
  ): Promise<any> {
    const vin = req.params.vin;
    try {
      const result = await pool.query("select tipoServicioActualVin(?)", [vin]);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async vinsFacturar(req: Request, res: Response): Promise<any> {
    const pa_fechaInicio = req.params.pa_fechaInicio;
    const pa_fechaFin = req.params.pa_fechaFin;
    const pa_idLocalidad = req.params.pa_idLocalidad;
    const pa_usuarios = req.params.pa_usuarios;
    try {
      const result = await pool.query("call vinsFacturar(?,?,?,?)", [
        pa_fechaInicio,
        pa_fechaFin,
        pa_idLocalidad,
        pa_usuarios,
      ]);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async todosServicios(req: Request, res: Response): Promise<any> {
    const vin = req.params.vin;
    try {
      const results = await pool.query("call todosServiciosVin(?)", [vin]);
      res.status(200).json(results);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async actualizarFechaIngresoVins(
    req: Request,
    res: Response
  ): Promise<any> {
    let vin: string = req.body.vin;
    let fechaIngreso: string = req.body.fechaIngreso;

    try {
      const resultado = await pool.query(
        "call actualizarFechaIngresoVins(?, ?)",
        [vin, fechaIngreso]
      );
      return res.status(200).json(resultado);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }

  public async actualizarStatusDFYVins(
    req: Request,
    res: Response
  ): Promise<any> {
    let idServicio = req.body.idServicio;
    let statusDFY: string = req.body.statusDFY;

    try {
      const resultado = await pool.query("call actualizarStatusDFYVins(?, ?)", [
        idServicio,
        statusDFY,
      ]);
      return res.status(200).json(resultado);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }

  public async actualizarStatusVtimsVins(
    req: Request,
    res: Response
  ): Promise<any> {
    let idServicio = req.body.idServicio;
    let statusVtims: string = req.body.statusVtims;

    try {
      const resultado = await pool.query(
        "call actualizarStatusVtimsVins(?, ?)",
        [idServicio, statusVtims]
      );
      return res.status(200).json(resultado);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }

  // busqFiltradaGraficoInicio
  public async busqFiltradaGraficoInicio(
    req: Request,
    res: Response
  ): Promise<any> {
    const idGeocerca = req.params.idGeocerca;
    const idLocalidad = req.params.idLocalidad;

    try {
      const resultado = await pool.query(
        "call busqFiltradaGraficoInicio(?, ?)",
        [idGeocerca, idLocalidad]
      );
      return res.status(200).json(resultado);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }


  public async busqFiltradaInicioAutomatico(
    req: Request,
    res: Response
  ): Promise<any> {
    const idLocalidad = req.params.idLocalidad;

    try {
      const resultado = await pool.query(
        "call busqFiltradaInicioAutomatico(?)",
        idLocalidad
      );
      return res.status(200).json(resultado);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }

  public async ocuparCajon(req: Request, res: Response): Promise<any> {
    // const obj = JSON.parse(JSON.stringify(req.body));
    // req.body = [Object: null prototype] { title: 'product' }
    let vin: string = "";
    let tamanio: string = ""
    const postBody = () => {
      const obj = JSON.stringify(req.body);

      let dospuntos = obj.search('":"');
      let cuerpo = obj.substring(2, dospuntos);

      let dospuntos2 = cuerpo.search(':');
      vin = cuerpo.substring(0, dospuntos2);
      tamanio = cuerpo.substring(dospuntos2 + 1, cuerpo.length);
    }

    postBody();
    try {
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
    let vin: string = "";
    const postBody = () => {
      const obj = JSON.stringify(req.body);

      let dospuntos = obj.search('":"');
      let cuerpo = obj.substring(2, dospuntos);
      vin = cuerpo;
    }

    postBody();
    try {
      const resultado = await pool.query(
        "call desocuparCajones(?)", [vin]);
      return res.status(200).json(resultado);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }

  public async MostrarCajon(req: Request, res: Response): Promise<any> {
    let vin: string = req.params.vin;
    try {
      const result = await pool.query('call mostrarCajon(?)', [vin]);
      let result2 = JSON.stringify(result[0]);
      result2 = result2.slice(1,-1);
      let result3 = JSON.parse(result2);
      let result4  = "";
      let pasillo:string = JSON.stringify(result3.pasillo);
      let cajon:string =  JSON.stringify(result3.cajon);
      
      if(result3.patio == '3'){
        result4 += "NVDC";
      }
      if(pasillo.length < 2){
        pasillo = "0"
      }
      if(cajon.length <2){
        cajon = "0"
      }

      pasillo += result3.pasillo;
      cajon += result3.cajon;

      result4 += "-"+ pasillo +"-"+ result3.fila +"-" +cajon;
      return res.json(result4);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // public async listarVin(req: Request, res: Response): Promise<any> {
  //   let idlocalidadUsuario: string = req.body.idlocalidadUsuario;
  //   let truckId: string = req.body.truckId;
  //   let vin: string = req.body.vin;
  //   let model: string = req.body.model;
  //   let origin: string = req.body.origin;
  //   let dealer: string = req.body.dealer;
  //   let weight: number = req.body.weight;
  //   let modelId: string = req.body.ModelID;
  //   let truckDriver: string = req.body.truckDriver;
  //   let carrier: string = req.body.carrier;
  //   let buqueViaje: string = req.body.buqueyviaje;
  //   let puertoDescarga: string = req.body.puertodeDescarga;
  //   let destinoFinal: string = req.body.destinofinal;
  //   let eta: string = req.body.eta;
  //   let demandArea: string = req.body.demandArea;
  //   let rampa: string = req.body.rampa;
  //   let mode: string = req.body.mode;
  //   console.log(req.body);
  //   try {
  //     const resultado = await pool.query(
  //       "call ingreso_vin(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  //       [
  //         idlocalidadUsuario,
  //         vin,
  //         truckId,
  //         model,
  //         origin,
  //         dealer,
  //         weight,
  //         modelId,
  //         truckDriver,
  //         carrier,
  //         buqueViaje,
  //         puertoDescarga,
  //         destinoFinal,
  //         eta,
  //         demandArea,
  //         rampa,
  //         mode,
  //       ]
  //     );
  //     return res.status(200).json(resultado);
  //   } catch (error: any) {
  //     console.log(error.message);
  //     res.status(500).send(error.message);
  //   }
  // }
}

const vins = new VinController();
export default vins;

function r(r: any, arg1: (any: any) => void) {
  throw new Error("Function not implemented.");
}
