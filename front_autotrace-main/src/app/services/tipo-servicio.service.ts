import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TipoServicioService extends ApiService{



  constructor(private http: HttpClient) {super()  }

  getListTipoServicio():Observable<any>{
    return this.http.get(this.API_URI + '/tiposervicio');
  }

  insertarTipoServicio(body: any): Observable<any>{
    return this.http.post(this.API_URI+'/tiposervicio/insertarTipoServicio/', body);
  }

  actualizarTipoServicio(body: any): Observable<any>{
    return this.http.post(this.API_URI+'/tiposervicio/actualizarTipoServicio/', body);
  }

  buscarTipoServicio(idtipoServicio:number): Observable<any>{
    return this.http.get(this.API_URI+'/tiposervicio/buscarTipoServicio/'+ idtipoServicio);
  }

  buscarPatronTipoServicio(cadena:string): Observable<any>{
    return this.http.get(this.API_URI+'/tiposervicio/buscarPatronTipoServicio/'+ cadena);
  }

  eliminarTipoServicio(body: any): Observable<any>{
    return this.http.post(this.API_URI+'/tiposervicio/eliminarTipoServicio/', body);
  }

  actualizarEstadoTipoServicio(body: any): Observable<any>{
    return this.http.post(this.API_URI+'/tiposervicio/actualizarEstadoTipoServicio/', body);
  }

  obtenerEstadoSiguiente(idtipoServicio:number, idUsuario:String): Observable<any>{
    return this.http.get(this.API_URI+'/tiposervicio/obtenerEstadoSiguiente/'+ idtipoServicio+'/'+idUsuario);
  }

  getActiviadesXcliente(pa_idcliente:string, pa_idtipoServicio :string):Observable<any>{
    return this.http.get(this.API_URI + '/tiposervicio/activiadesXcliente/'+pa_idcliente+'/'+pa_idtipoServicio);
  }

  getActiviadesXclienteNo(pa_idcliente:string, pa_idtipoServicio :string):Observable<any>{
    return this.http.get(this.API_URI + '/tiposervicio/activiadesXclienteNo/'+pa_idcliente+'/'+pa_idtipoServicio);
  }

  actualizarCotizacionServicio(body: any): Observable<any>{
    return this.http.post(this.API_URI+'/tiposervicio/actualizarCotizacionServicio/', body);
  }

  insertarActividadTipoServicio(body: any): Observable<any>{
    return this.http.post(this.API_URI+'/tiposervicio/insertarActividadTipoServicio/', body);
  }

  eliminarActividadTipoServicio(body: any): Observable<any>{
    return this.http.post(this.API_URI+'/tiposervicio/eliminarActividadTipoServicio/', body);
  }

  // eliminarActividadTipoServicio

  }
