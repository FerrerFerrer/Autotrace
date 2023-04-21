import { Model } from '@/models/Model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService extends ApiService {

  constructor(private http:HttpClient ) {super(); }

  getListModel() : Observable<Model> {
    return this.http.get<Model>(this.API_URI + '/proceso');
  }

  actualizarModel(body: any): Observable<Model> {
    return this.http.post<Model>(this.API_URI + '/proceso/actualizar', body);
  }
}
