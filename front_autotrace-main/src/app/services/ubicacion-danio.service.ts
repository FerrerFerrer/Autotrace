import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UbicacionDanioService extends ApiService {

  constructor(private http: HttpClient) { super()}

  deleteUbicacionDanio(id: any): Observable<any>{
    return this.http.delete(this.API_URI + '/ubicaciondanio/' + id);
  }

  getListUbicacionesDanio(): Observable<any>{
    return this.http.get(this.API_URI + '/ubicaciondanio');
  }

  insertarActualizaUbicacionDanio(body: any): Observable<any>{
    return this.http.post(this.API_URI + '/ubicaciondanio', body);
  }

  actualizarUbicacionDanio(body: any): Observable<any>{
    return this.http.post(this.API_URI + '/ubicaciondanio/actualizar', body);
  }

  buscarPatron(cadena: string): Observable<any>{
    return this.http.get(this.API_URI + '/ubicaciondanio/buscar/' + cadena);
  }

  datosUbicacionDanio(fechaInicial:string, fechaFin:string):Observable<any>{
    return this.http.get(this.API_URI+'/ubicaciondanio/datos/' + fechaInicial + '/' + fechaFin);
  }
}
