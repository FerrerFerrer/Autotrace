import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class InventarioEtiquetaService extends ApiService {

  constructor(private http: HttpClient) { super() }

  actualizarInventarioEtiqueta(cveActividad: string, body: any): Observable<any>{
    return this.http.put(this.API_URI + '/inventarioEtiqueta/actualizar/' + cveActividad, body);
  }

  buscarInventarioEtiqueta(cadena: string): Observable<any>{
    return this.http.get(this.API_URI + '/inventarioEtiqueta/buscar/' + cadena);
  }

  crearInventarioEtiqueta(body: any): Observable<any>{
    return this.http.post(this.API_URI + '/inventarioEtiqueta/crear', body);
  }

  eliminarInventarioEtiqueta(cveInventario: string): Observable<any>{
    return this.http.delete(this.API_URI + '/inventarioEtiqueta/' + cveInventario);
  }

  listarInventarioEtiqueta(): Observable<any>{
    return this.http.get(this.API_URI + '/inventarioEtiqueta');
  }
}
