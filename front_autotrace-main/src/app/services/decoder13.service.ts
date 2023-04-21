import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class Decoder13Service extends ApiService {

  constructor(private http:HttpClient) {super(); }

  getListDecoder13():Observable<any>{
    return this.http.get(this.API_URI+'/decoder13');
  }

  insertarDigito13(cve_digito:string, manufacturerName:string,vehicleType:string):Observable<any>{
    return this.http.post(this.API_URI+'/decoder13/insertar', {cve_digito, manufacturerName,vehicleType});
  }

  actualizarDigito13(cve_digito:string,cve_digitoNuevo:string ,manufacturerName:string,vehicleType:string):Observable<any>{
    return this.http.post(this.API_URI+'/decoder13/actualizar', {cve_digito,cve_digitoNuevo ,manufacturerName,vehicleType});
  }

  delete(cve_digito:string):Observable<any>{
    return this.http.delete(this.API_URI+'/decoder13/'+cve_digito);
}


buscarPatronDigito13(cadena:string):Observable<any>{
  return this.http.get(this.API_URI+'/decoder13/buscarPatronDigito1_3/'+cadena);
}


}
