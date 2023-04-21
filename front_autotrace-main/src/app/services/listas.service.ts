import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ListasService extends ApiService {
  // API_URI = 'http://localhost:3000/api/autotech';

  constructor(private http: HttpClient) { super() }

  getListListaDefault(estado: string): Observable<any> {
    return this.http.get(this.API_URI + '/listas/' + estado);
  }


  getLisbusquedaLista(nombreLista: string, fechaInicial: string, fechaFinal: string) {

    return this.http.get(this.API_URI + '/listas/busqueda/' + nombreLista + '/' + fechaInicial + '/' + fechaFinal + '/Activo');
  }

  cambiarEstadoLista(id: number, estado: string): Observable<any> {
    return this.http.get(this.API_URI + '/listas/cambiarestado/' + id + '/' + estado);
  }

  vinsLista(id: number): Observable<any> {
    return this.http.get(this.API_URI + '/listas/vinsLista/' + id);
  }

  create(nombreLista: string, objetivo: string, vinsEncontrados: Number, estado: string, idusuario: Number) {
    return this.http.post(this.API_URI + '/listas/', { nombreLista, objetivo, vinsEncontrados, estado, idusuario });
  }

  insertarVinLista(idlista: Number, vin: string) {

    return this.http.post (this.API_URI + '/listas/insertarVinLista/', { idlista, vin });
  }

  listaVinsIngresos(lista:string){
    return this.http.get (this.API_URI + '/listas/listaVinsIngresos/'+ lista);
  }

  holdMasivo(idlista: any): Observable<any> {
    return this.http.put(this.API_URI + "/listas/hold/" + idlista, []);
  }
}