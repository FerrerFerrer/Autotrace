import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesService extends ApiService {

  constructor(private http: HttpClient) {super()}

  getListClientes():Observable<any>{
    return this.http.get(`${this.API_URI}/clientes`);
  }

  insertarCliente(cliente:string, ePod:number):Observable<any>{
    return this.http.post(this.API_URI+'/clientes/insertar', {cliente, ePod});
  }

  insertarActualizarCliente(idcliente:number, cliente:string, ePod:number, activo:number):Observable<any>{
    return this.http.post(this.API_URI+'/clientes/actualizar', {idcliente, cliente, ePod, activo});
  }

  delete(idcliente:number):Observable<any>{
    return this.http.delete(this.API_URI+'/clientes/'+idcliente);
  }

  buscarPatronCliente(cadena:string):Observable<any>{
    return this.http.get(this.API_URI+'/clientes/buscarPatronCliente/'+cadena);
  }

  datosClientes(fechaInicio, fechaFinal):Observable<any>{
    return this.http.get(this.API_URI+'/clientes/datos/' + fechaInicio + '/' + fechaFinal);
  }
}
