import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TipoInventarioService extends ApiService {

  constructor(private http: HttpClient) { super()}

  getListTipoInventarios(): Observable<any> {
    return this.http.get(this.API_URI + '/tipoInventario');
  }

  crearTipoInventario(body: any): Observable<any>{
    return this.http.post(this.API_URI + '/tipoInventario/insertar', body);
  }

  updateTipoInventario(body: any): Observable<any>{
    return this.http.post(this.API_URI + '/tipoInventario/actualizar', body);
  }

  deleteTipoInventario(id: string): Observable<any>{
    return this.http.delete(this.API_URI + '/tipoInventario/' + id);
  }

  buscarPatron(cadena: string): Observable<any>{
    return this.http.get(this.API_URI + '/tipoInventario/buscar/' + cadena);
  }
}
