import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '@services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ManifiestoService extends ApiService {

  constructor(private http: HttpClient) { super(); }

  getManifiestosExistentes(): Observable<any>{
    return this.http.get(this.API_URI + '/manifiesto/manifiestos_existentes');
  }

  crearManifiesto(body : any): Observable<any>{
    return this.http.post(this.API_URI + '/manifiesto/create', body);
  }

  busquedaSegunManifiesto(incluirCerrado:number, idCliente:number, fechaInicial:string, fechaFinal:string):Observable<any>{
    return this.http.get(this.API_URI + '/manifiesto/busqueda/'+incluirCerrado+'/'+idCliente+'/'+fechaInicial+'/'+fechaFinal);
  }

  vinsManifiesto(idmanifiesto:number):Observable<any>{
    return this.http.get(this.API_URI + '/manifiesto/vinsManifiesto/'+idmanifiesto);
  }
  
  geocercasVinsManifiesto(idmanifiesto:number):Observable<any>{
    return this.http.get(this.API_URI + '/manifiesto/geocercasVinsManifiesto/'+idmanifiesto);
  }

  cambiarEstadoManifiesto(idmanifiesto:number, estado:string): Observable<any>{
    return this.http.post(this.API_URI + '/manifiesto/cambiarEstado', {idmanifiesto, estado});
  }


}