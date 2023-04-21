import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService extends ApiService {

  constructor(private http: HttpClient) { super()}

  getListProveedores(): Observable<any>{
    return this.http.get(this.API_URI + '/proveedores');
  }

  crearProveedor(body: any): Observable<any>{
    return this.http.post(this.API_URI + '/proveedores', body);
  }

  updateProveedor(id: number, body: any): Observable<any>{
    return this.http.put(this.API_URI + '/proveedores/' + id, body);
  }

  deleteProveedor(id: number): Observable<any>{
    return this.http.delete(this.API_URI + '/proveedores/' + id);
  }

  buscarPatron(cadena: string): Observable<any>{
    return this.http.get(this.API_URI + '/proveedores/buscar/' + cadena);
  }
}