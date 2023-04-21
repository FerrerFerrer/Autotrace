import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SeveridadFDanioService extends ApiService{

  constructor(private http: HttpClient) { super() }

  getListSeveridadFDanio(): Observable<any>{
    return this.http.get(this.API_URI + '/severidadFDanio');
  }

  deleteSeveridadFDanio(id: any): Observable<any>{
    return this.http.delete(this.API_URI + '/severidadFDanio/' + id);
  }

  insertarActualizarSeveridadFDanio(body: any): Observable<any>{
    return this.http.post(this.API_URI + '/severidadFDanio', body);
  }

  actualizarSeveridadFDanio(body: any): Observable<any>{
    return this.http.post(this.API_URI + '/severidadFDanio/actualizar/', body);
  }

  buscarPatron(cadena: string): Observable<any>{
    return this.http.get(this.API_URI + '/severidadFDanio/buscar/' + cadena);
  }

  datosSeveridadFDanio(fechaInicial:string, fechaFin:string):Observable<any>{
    return this.http.get(this.API_URI+'/severidadFDanio/datos/' + fechaInicial + '/' + fechaFin);
  }
}
