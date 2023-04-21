import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class HerramientasService extends ApiService {

  constructor(private http: HttpClient) {super() }

  getListHerramientas(): Observable<any>{
    return this.http.get(this.API_URI + '/herramientas');
  }

  crearHerramienta(body: any): Observable<any>{
    return this.http.post(this.API_URI + '/herramientas/crear', body);
  }

  updateHerramienta(body: any): Observable<any>{
    return this.http.post(this.API_URI + '/herramientas/actualizar', body);
  }

  deleteHerramienta(id: number): Observable<any>{
    return this.http.delete(this.API_URI + '/herramientas/' + id);
  }

  buscarPatron(cadena: string): Observable<any>{
    return this.http.get(this.API_URI + '/herramientas/buscar/' + cadena);
  }
}
