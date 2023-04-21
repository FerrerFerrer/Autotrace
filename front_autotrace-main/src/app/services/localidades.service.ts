import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LocalidadesService extends ApiService{

  // API_URI = 'http://localhost:3000/api/autotech';

  constructor(private http: HttpClient) { super()} 

  getListLocalidades(): Observable<any>{
    return this.http.get(this.API_URI + '/localidades');
  }

  crearLocalidad(body: any): Observable<any>{
    return this.http.post(this.API_URI + '/localidades', body);
  }

  updateLocalidad(body: any): Observable<any>{
    return this.http.post(this.API_URI + '/localidades/actualizar', body);
  }

  deleteLocalidad(id: number): Observable<any>{
    return this.http.delete(this.API_URI + '/localidades/' + id);
  }

  buscarPatron(cadena: string): Observable<any>{
    return this.http.get(this.API_URI + '/localidades/buscar/' + cadena);
  }
}