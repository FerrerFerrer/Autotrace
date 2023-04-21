import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Model } from '../models/Model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ModelService extends ApiService{

  constructor(private http:HttpClient ) {super(); }

  getListModel() : Observable<Model> {
    return this.http.get<Model>(this.API_URI + '/model');
  }

  crearModel(model:Model): Observable<Model> {
    return this.http.post<Model>(this.API_URI + '/model/crear', model);
  }

  actualizarModel(body: any): Observable<Model> {
    return this.http.post<Model>(this.API_URI + '/model/actualizar', body);
  }

  buscarModel(cadena : string) : Observable<Model> {
    return this.http.get<Model>(this.API_URI + '/model/buscarModel/' + cadena);
  }

  borrarModel(model:string, idcliente:number): Observable<Model> {
    console.log("model:"+model);
    console.log("idcliente"+idcliente);
    return this.http.delete<Model>(this.API_URI + '/model/eliminar/' + model+"/"+idcliente);
  }
}
