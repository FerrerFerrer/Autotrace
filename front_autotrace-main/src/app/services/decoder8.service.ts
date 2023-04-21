import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class Decoder8Service extends ApiService {

  constructor(private http: HttpClient) { super() }

  getListDecoder8(): Observable<any>{
    return this.http.get(this.API_URI + '/decoder8');
  }

  insertarDigito8(body: any):Observable<any>{
    return this.http.post(this.API_URI+'/decoder8/insertar', body);
  }

  actualizarDigito8(body: any):Observable<any>{
    return this.http.post(this.API_URI+'/decoder8/actualizar', body);
  }

  delete(cve_digito:string):Observable<any>{
    return this.http.delete(this.API_URI+'/decoder8/'+cve_digito);
  }

  buscarPatronDigito4(cadena : string):Observable<any>{
    return this.http.get(this.API_URI + '/decoder8/buscarPatronDigito8/' + cadena);
  }
}
