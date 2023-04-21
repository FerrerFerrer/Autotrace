import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LocalidadesProveedoresService extends ApiService{

  constructor(private http: HttpClient) { super() }

  obtenerLocalidadesProveedores(id: any): Observable<any> {
    return this.http.get(this.API_URI + "/localidadesProveedores/" + id);
  }

  obtenerLocalidadesNoProveedores(id: any): Observable<any> {
    return this.http.get(this.API_URI + "/localidadesProveedores/sinlocalidad/" + id);
  }

  insertarLocalidadProveedor(body: any): Observable<any> {
    return this.http.post(this.API_URI + "/localidadesProveedores/", body);
  }

  eliminar(idproveedor, idlocalidad): Observable<any> {
    return this.http.delete(this.API_URI + "/localidadesProveedores/" + idproveedor + "/" + idlocalidad);
  }
}
