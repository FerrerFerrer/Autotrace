import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TipodanioService extends ApiService{

  constructor(private http:HttpClient) {super() }

  getListTipoDanio():Observable<any>{
    return this.http.get(this.API_URI+'/tipodanio');
  }

  insertarActualizarTipoDanio(cve_tipoDanio:string, descripcion:string):Observable<any>{
    return this.http.post(this.API_URI+'/tipodanio', {cve_tipoDanio, descripcion} );
  }

  actualizarTipoDanio(body: any): Observable<any>{
    return this.http.post(this.API_URI+'/tipodanio/actualizar', body );
  }

  delete(cve_tipoDanio:string):Observable<any>{
    return this.http.delete(this.API_URI+'/tipodanio/'+cve_tipoDanio);
  }

  buscarPatronTipoDanio(cadena:string):Observable<any>{
    return this.http.get(this.API_URI+'/tipodanio/buscarPatronTipoDanio/'+cadena);
  }

  datosTipoDanio(fechaInicial:string, fechaFin:string):Observable<any>{
    return this.http.get(this.API_URI+'/tipodanio/datos/' + fechaInicial + '/' + fechaFin);
  }
}
 