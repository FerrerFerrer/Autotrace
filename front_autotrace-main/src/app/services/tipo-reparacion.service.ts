import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TipoReparacionService extends ApiService {

  constructor(private http:HttpClient) { super()}

  getListTipoReparacion():Observable<any>{
    return this.http.get(this.API_URI+'/tiporeparacion');
  }

  insertarActualizarTipoReparacion(cve_tipoReparacion:string, descripcion:string):Observable<any>{
    return this.http.post(this.API_URI+'/tiporeparacion', {cve_tipoReparacion, descripcion} );
  }

  actualizarTipoReparacion(body: any):Observable<any>{
    return this.http.post(this.API_URI+'/tiporeparacion/actualizar/', body);
  }

  delete(cve_tiporeparacion:string):Observable<any>{
    return this.http.delete(this.API_URI+'/tiporeparacion/'+cve_tiporeparacion);
  }

  buscarPatronTipoReparacion(cadena:string):Observable<any>{
    return this.http.get(this.API_URI+'/tiporeparacion/buscarPatronTipoReparacion/'+cadena);
  }

  datosTipoReparacion(fechaInicial:string, fechaFin:string):Observable<any>{
    return this.http.get(this.API_URI+'/tiporeparacion/datos/' + fechaInicial + '/' + fechaFin);
  }

}