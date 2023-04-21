import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class HistorialTarifasService extends ApiService {

  constructor(private http: HttpClient) { super() }

  busqueda(fechaInicio, fechaFin, idusuario?: any, tipoServicio?: any): Observable<any>{
    return this.http.get(this.API_URI + "/historialTarifas/buscar/" + fechaInicio + "/" + fechaFin + "/" + idusuario + "/" + tipoServicio);
  }
}
