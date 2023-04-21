import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReporteServiciosService extends ApiService {

  constructor(private http: HttpClient) { super() }

  getReporteServicios(fechaInicial, fechaFinal,idlocalidad): Observable<any>{
    return this.http.get(this.API_URI + "/reporteServicios/resumen/" + fechaInicial + "/" + fechaFinal+ "/" + idlocalidad);
  }

  getVinsReporteServicios(fechaInicial, idlocalidad): Observable<any>{
    return this.http.get(this.API_URI + "/reporteServicios/vins/" + fechaInicial + "/" + idlocalidad);
  }
}