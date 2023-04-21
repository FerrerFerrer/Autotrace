import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '@services/api.service';

@Injectable({
  providedIn: 'root'
})
export class VinService extends ApiService {

  constructor(private http: HttpClient) { super()}

  getOne(vin : string) : Observable<any>{
    return this.http.get(this.API_URI + "/vin/" + vin)
  }

  ingreso(body : any): Observable<any>{
    return this.http.post(this.API_URI + '/vin/ingreso/ingreso', body);
  }

  manifiesto(body: any) : Observable<any>{
    return this.http.post(this.API_URI + '/vin/manifiesto', body);
  }

  bitacora(body : any) : Observable<any>{
    return this.http.post(this.API_URI + "/vin/bitacora", body);
  }

  actualizarVinManifiesto(body : any, vin : string) : Observable<any>{
    return this.http.put(this.API_URI + "/vin/actualizarVinManifiesto/" + vin, body);
  }

  historicoServiciosVin(vin:string):Observable<any>{
    return this.http.get(this.API_URI+"/vin/historicoServiciosVin/"+vin);
  }

  historicoVin(vin:string):Observable<any>{
    return this.http.get(this.API_URI+"/vin/historicoVin/"+vin);
  }

  historialUbicacionesVin(vin:string):Observable<any>{
    return this.http.get(this.API_URI+"/vin/historialUbicacionesVin/"+vin);
  }

  public obtenerDecoderVin(vin:string):Observable<any>{
    return this.http.get(this.API_URI+"/vin/obtenerDecoderVin/"+vin);
  }

  public obtenerdatosPlacard(vin:string):Observable<any>{
    return this.http.get(this.API_URI + "/vin/obtenerPlacard/" + vin);
  }

  busqFiltradaInicio(pa_idGeocerca:string, pa_tipoServicio:string, pa_fechaInicio:string, pa_fechaFin:string, pa_conHistorico:number, pa_idLocalidad:string):Observable<any>{
    return this.http.get(this.API_URI+'/vin/busqFiltradaInicio/'+pa_idGeocerca+'/'+pa_tipoServicio+'/'+pa_fechaInicio+'/'+pa_fechaFin+'/'+pa_conHistorico+'/'+pa_idLocalidad);
  }

  busqXVinsInicio(pa_ListaVins:string, pa_conHistorico:number):Observable<any>{
    return this.http.get(this.API_URI+'/vin/busqXVinsInicio/'+pa_ListaVins+'/'+pa_conHistorico);
  }

  busqXVinsInicioV2(body : any):Observable<any>{
    return this.http.post(this.API_URI+'/vin/busqXVinsInicioV2',body );
  }

  vinsFacturar( pa_fechaInicio:string, pa_fechaFin:string, pa_idLocalidad:string, pa_usuarios:string):Observable<any>{
    return this.http.get(this.API_URI+'/vin/vinsFacturar/'+pa_fechaInicio+'/'+pa_fechaFin+'/'+pa_idLocalidad+'/'+pa_usuarios);
  }

  fechaIngreso(body : any) : Observable<any>{
    return this.http.post(this.API_URI + "/vin/fechaIngreso", body);
  }


  updateStatusDFY(body : any) : Observable<any>{
    return this.http.post(this.API_URI + "/vin/updateStatusDFY", body);
  }

  updateStatusVtims(body : any) : Observable<any>{
    return this.http.post(this.API_URI + "/vin/updateStatusVtims", body);
  }

  filtroGraficoInicio(idGeocerca:string, idLocalidad:string) : Observable<any>{
    return this.http.get(this.API_URI + "/vin/filtroGraficoInicio/"+idGeocerca+"/"+idLocalidad);
  }


  busqFiltradaInicioAutomatico(idLocalidad:string) : Observable<any>{
    return this.http.get(this.API_URI + "/vin/filtroGraficoInicioAutomatico/"+idLocalidad);
  }

  // public subirGmTotal(body: any):Observable<any>{
  //   return  this.http.post(this.API_URI +'/usuarios/eliminarUsuario/', body);
  // }

//  rutas para subir/descargar reportes
  public consultaSabana():Observable<any>{
    return  this.http.get(this.API_URI +'/vin/sabana/datos');
  }

  public ingresoGm_total(body: any) : Observable<any>{
    return  this.http.post(this.API_URI +'/vin/ingreso/ingresoGm', body);
  }

  public crearVinHistorico(body: any) : Observable<any>{
    return  this.http.post(this.API_URI +'/vin/vinHistorico/vinHistorico', body);
  }

  public crearVin(body: any) : Observable<any>{
    return  this.http.post(this.API_URI +'/vin/crear/vin', body);
  }

  public actualizarVin(body: any) : Observable<any>{
    return  this.http.put(this.API_URI +'/vin/update/vin', body);
  }

  public ingresoModel(body: any) : Observable<any>{
    return  this.http.post(this.API_URI +'/vin/model/ingresar', body);
  }

  public verModelos():Observable<any>{
    return  this.http.get(this.API_URI +'/vin/model/ver');
  }

  public ingresoDat(body:any):Observable<any>{
    return  this.http.post(this.API_URI +'/vin/ingreso/dat', body);
  }
}
