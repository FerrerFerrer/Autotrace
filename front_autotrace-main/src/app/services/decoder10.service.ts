import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class Decoder10Service extends ApiService{

  constructor(private http:HttpClient) { super()}

  getListDecoder10(): Observable<any>{
    return this.http.get(this.API_URI + '/decoder10');
  }

  insertarDigito10(body: any):Observable<any>{
    return this.http.post(this.API_URI+'/decoder10/insertar', body);
  }

  actualizarDigito10(body: any):Observable<any>{
    return this.http.post(this.API_URI+'/decoder10/actualizar', body);
  }

  delete(cve_digito:string):Observable<any>{
    return this.http.delete(this.API_URI+'/decoder10/'+cve_digito);
  }

  buscarPatronDigito10(cadena : string):Observable<any>{
    return this.http.get(this.API_URI + '/decoder10/buscarPatronDigito10/' + cadena);
  }

}
