import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService extends ApiService{

  constructor(private http: HttpClient) { super()}

  getListEmpleados() : Observable<any> {
    return this.http.get(this.API_URI + '/empleados');
  }

  buscarEmpleadoEspecifico(cadena : string) : Observable<any> {
    return this.http.get(this.API_URI + '/empleados/buscarEmpleadoEspecifico/' + cadena);
  }

  buscarEmpleados(cadena : string) : Observable<any> {
    return this.http.get(this.API_URI + '/empleados/buscarEmpleado/' + cadena);
  }

  crearEmpleado(body: any): Observable<any> {
    return this.http.post(this.API_URI + '/empleados/crear', body);
  }

  actualizarEmpleado(body: any): Observable<any> {
    return this.http.post(this.API_URI + '/empleados/actualizar', body);
  }

  borrarEmpleado(cveEmpleado: string): Observable<any> {
    return this.http.delete(this.API_URI + '/empleados/' + cveEmpleado);
  }
}
