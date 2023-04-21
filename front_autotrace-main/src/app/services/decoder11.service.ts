import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class Decoder11Service extends ApiService{

  constructor(private http: HttpClient) { super() }

  getListDecoder11(): Observable<any>{
    return this.http.get(this.API_URI + '/decoder11');
  }

  insertarDigito11(body: any):Observable<any>{
    return this.http.post(this.API_URI+'/decoder11/insertar', body);
  }

  actualizarDigito11(body: any):Observable<any>{
    return this.http.post(this.API_URI+'/decoder11/actualizar', body);
  }

  delete(cve_digito:string):Observable<any>{
    return this.http.delete(this.API_URI+'/decoder11/'+cve_digito);
  }

  buscarPatronDigito11(cadena : string):Observable<any>{
    return this.http.get(this.API_URI + '/decoder11/buscarPatronDigito11/' + cadena);
  }
}
