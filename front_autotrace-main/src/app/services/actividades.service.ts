import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService extends ApiService {

  constructor(private http: HttpClient) { super() }

  actualizarActividad(cveActividad: string, body: any): Observable<any>{
    return this.http.put(this.API_URI + '/actividades/actualizar/' + cveActividad, body);
  }

  buscarActividad(cadena: string): Observable<any>{
    return this.http.get(this.API_URI + '/actividades/buscar/' + cadena);
  }

  crearActividades(body: any): Observable<any>{
    return this.http.post(this.API_URI + '/actividades/crear', body);
  }

  crearActividadEmpleado(body: any): Observable<any>{
    return this.http.post(this.API_URI + '/actividades/crear/actividadEmpleado', body);
  }

  eliminarActividades(cveActividad: any): Observable<any>{
    return this.http.delete(this.API_URI + '/actividades/' + cveActividad);
  }

  eliminarActividadEmpleado(cveActividad: string, cveEmpleado: string): Observable<any>{
    return this.http.delete(this.API_URI + '/actividades/eliminar/actividadEmpleado/' + cveActividad + '/' + cveEmpleado);
  }

  getActividades(): Observable<any>{
    return this.http.get(this.API_URI + '/actividades');
  }

  getActividadesEmpleado(cveActividad: string): Observable<any>{
    return this.http.get(this.API_URI + '/actividades/obtener/actividadEmpleados/' + cveActividad);
  }

  getActividadesSinEmpleado(cveActividad: string): Observable<any>{
    return this.http.get(this.API_URI + '/actividades/obtener/actividadSinEmpleados/' + cveActividad);
  }
}