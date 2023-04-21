import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService extends ApiService{

  constructor(private http: HttpClient) { super()}

  getListDepartamento(): Observable<any>{
    return this.http.get(this.API_URI + '/departamento');
  }

  insertarDepartamento(body: any):Observable<any>{
    return this.http.post(this.API_URI+'/departamento/insertar', body);
  }

  actualizarDepartamento(body: any):Observable<any>{
    return this.http.post(this.API_URI+'/departamento/actualizar', body);
  }

  delete(pa_cveDepartamento:string):Observable<any>{
    return this.http.delete(this.API_URI+'/departamento/'+pa_cveDepartamento);
  }


  buscarPatronDepartamento(cadena : string):Observable<any>{
    return this.http.get(this.API_URI + '/departamento/buscarPatronDepartamento/' + cadena);
  }

}
