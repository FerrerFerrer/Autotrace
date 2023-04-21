import { tablaHistorialGeolocalizacion } from '@/models/tablaHistorialGeolocalizacion';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TablaHistorialService {
  API_URL = '';


  constructor(private http: HttpClient) { }

  getListLocalidades(): Observable<any>{
    return this.http.get(this.API_URL + '/localidades');
  }
}
