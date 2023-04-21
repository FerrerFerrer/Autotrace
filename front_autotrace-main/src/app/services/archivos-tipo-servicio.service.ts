import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ArchivosTipoServicioService extends ApiService{

  constructor(private http:HttpClient) {super() }

  subirDocAprobacion(body: any):Observable<any>{
    return this.http.post(this.API_URI+'/ArchivosTipoServicio/upload/tiposervicio/apro', body);
  }


  subirDocCotizacion(body: any):Observable<any>{
    return this.http.post(this.API_URI+'/ArchivosTipoServicio/upload/tiposervicio/cot', body);
  }

  subirDocRequerimientos(body: any):Observable<any>{
    return this.http.post(this.API_URI+'/ArchivosTipoServicio/upload/tiposervicio/req', body);
  }

  descargarDocumentosTipoServicio(id:number,tipo:string):Observable<any>{
    const headers= new HttpHeaders().set('Content-Type','application/json');
    const header2=new HttpHeaders().set('Content-Disposition','application/json');
    return this.http.get(this.API_URI+'/ArchivosTipoServicio/download/tiposervicio/'+id+'/'+tipo, {headers,responseType:'blob'as 'json'});
  }

}
