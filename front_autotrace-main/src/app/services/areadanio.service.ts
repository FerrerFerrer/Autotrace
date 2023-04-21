import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AreadanioService extends ApiService {

  constructor(private http:HttpClient) { super()}
  
  getListAreadanio():Observable<any>{
    return this.http.get(this.API_URI+'/areadanio');
  }

  insertarActualizarAreaDanio(cve_areaDanio:string, descripcion:string):Observable<any>{
    return this.http.post(this.API_URI+'/areadanio', {cve_areaDanio, descripcion});
  }

  actualizarAreaDanio(body: any):Observable<any>{
    return this.http.post(this.API_URI+'/areadanio/actualizar', body);
  }

  delete(cve_areadanio:string):Observable<any>{
      return this.http.delete(this.API_URI+'/areadanio/'+cve_areadanio);
  }
  
  buscarPatronAreaDanio(cadena:string):Observable<any>{
    return this.http.get(this.API_URI+'/areadanio/buscarPatronAreaDanio/'+cadena);
  }

  datosArea(fechaInicio, fechaFinal):Observable<any>{
    return this.http.get(this.API_URI+'/areadanio/datos/area/' + fechaInicio + '/' + fechaFinal);
  }

  datosAreaAdicional(fechaInicio, fechaFinal):Observable<any>{
    return this.http.get(this.API_URI+'/areadanio/datos/area/adicional/' + fechaInicio + '/' + fechaFinal);
  }
}