import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class Decoder57Service extends ApiService{

  constructor(private http: HttpClient) { super()}

  getListDecoder57():Observable<any>{
    return this.http.get(this.API_URI+'/decoder57');
  }

  insertarDigito57(cve_digito:string, driverType:string,brand:string ,series:string,driverPosition:string,bodyTypeCab:string):Observable<any>{
    return this.http.post(this.API_URI+'/decoder57/insertar', {cve_digito, driverType,brand ,series,driverPosition,bodyTypeCab});
  }

  actualizarDigito57(cve_digito:string, cve_digitoNuevo:string,driverType:string,brand:string ,series:string,driverPosition:string,bodyTypeCab:string):Observable<any>{
    return this.http.post(this.API_URI+'/decoder57/actualizar', {cve_digito, cve_digitoNuevo,driverType,brand ,series,driverPosition,bodyTypeCab});
  }

  delete(cve_digito:string):Observable<any>{
    return this.http.delete(this.API_URI+'/decoder57/'+cve_digito);
}


buscarPatronDigito57(cadena:string):Observable<any>{
  return this.http.get(this.API_URI+'/decoder57/buscarPatronDigito5_7/'+cadena);
}


}
