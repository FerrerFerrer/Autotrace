import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Auth } from '../models/auth';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService extends ApiService{

  constructor(private http: HttpClient) {super()}

  login(auth : Auth) {
    return this.http.post(`${this.API_URI}/usuarios/signin`, auth);
  }

  modules(rol){
    return this.http.post(`${this.API_URI}/usuarios/modules`, rol);
  }

  cerrarSesion(idusuario: number){
    return this.http.get(this.API_URI+'/usuarios/logout/' + idusuario);
  }

  loggedIn() : boolean {
    return !!localStorage.getItem('usuario');
  }

  getListUsuarios(): Observable<any>{
    return this.http.get(this.API_URI + '/usuarios');
  }

  verificarUsuarioLibre(idusuario: number){
    return this.http.get(this.API_URI + '/usuarios/verificarLibre/' + idusuario);
  }

  public getCurrentUser(){
    return JSON.parse(localStorage.getItem('usuario'));
  }

  public insertarUsuario(body: any):Observable<any>{
    return this.http.post(this.API_URI + '/usuarios/insertar/', body);
  }

  public insertarLocalidadUsuario(body: any):Observable<any>{
  return this.http.post(this.API_URI + '/usuarios/insertarLocalidadUsuario/', body);
}

public eliminarLocalidadUsuario(body: any):Observable<any>{
  return this.http.post(this.API_URI + '/usuarios/eliminarLocalidadUsuario/', body);
}

public actualizarUsuario(body: any):Observable<any>{
  return this.http.post(this.API_URI + '/usuarios/actualizar/', body);
}

public eliminarUsuario(body: any):Observable<any>{
  return this.http.post(this.API_URI + '/usuarios/eliminarUsuario/', body);
}

public obtenerLocalidadesUsuario(idusuario:string):Observable<any>{
  return this.http.get(this.API_URI + '/usuarios/obtenerLocalidadesUsuario/'+ idusuario);
}

public obtenerLocalidadesNoUsuario(idusuario:string):Observable<any>{
  return this.http.get(this.API_URI + '/usuarios/obtenerLocalidadesNoUsuario/'+ idusuario);
}

public buscarPatronUsuario(cadena:string):Observable<any>{
  return this.http.get(this.API_URI + '/usuarios/buscarPatronUsuario/'+ cadena);
}

}
