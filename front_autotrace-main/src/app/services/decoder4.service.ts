import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class Decoder4Service extends ApiService {

  constructor(private http: HttpClient) { super() }

  getListDecoder4(): Observable<any>{
    return this.http.get(this.API_URI + '/decoder4');
  }

  insertarDigito4(body: any):Observable<any>{
    return this.http.post(this.API_URI+'/decoder4/insertar', body);
  }
  // cve_digito,cve_digitoNuevo, manufacturerName,vehicleType
  actualizarDigito4(body: any):Observable<any>{
    return this.http.post(this.API_URI+'/decoder4/actualizar', body);
  }

  delete(cve_digito:string):Observable<any>{
    return this.http.delete(this.API_URI+'/decoder4/'+cve_digito);
  }

  buscarPatronDigito4(cadena : string):Observable<any>{
    return this.http.get(this.API_URI + '/decoder4/buscarPatronDigito4/' + cadena);
  }
}