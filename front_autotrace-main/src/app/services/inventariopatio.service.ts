import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class InventariopatioService extends ApiService {

  constructor(private http: HttpClient) {super() }

  obtenerInventarioPatio(hold:number, marca:number,geocercas:string, localidad:string):Observable<any>{
    return this.http.get(this.API_URI + '/inventarioPatio/obtenerInventarioPatio/' +hold + '/' + marca + '/' + geocercas +'/'+localidad);
  }


  obtenerInventarioTransito(marca: number, tipoServicio: number, idLocalidad:string):Observable<any>{
    return this.http.get(this.API_URI + '/inventarioPatio/obtenerInventarioTransito/' + marca + '/' + tipoServicio + '/' + idLocalidad );
  }

  obtenerDatosPlacadXLista(lista: string):Observable<any>{
    return this.http.get(this.API_URI + '/inventarioPatio/datosPlacard/lista/' + lista);
  }

  obtInventarioTransitoListaVins(lista: string, idLocalidad:string, ):Observable<any>{
    return this.http.get(this.API_URI + '/inventarioPatio/listaVins/' + lista +'/' + idLocalidad);
  }

  obtInventarioTransitoListaVinsV2(pa_vins: any, idLocalidad:string):Observable<any>{
    const body: any = {
      pa_vins: pa_vins,
      idLocalidad: idLocalidad
    };
    return this.http.post(this.API_URI + '/inventarioPatio/listaVinsV2', body);
  }

}
