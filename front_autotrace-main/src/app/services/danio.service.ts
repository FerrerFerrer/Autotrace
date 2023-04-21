import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DanioService extends ApiService{

  constructor(private http:HttpClient) { super()}

  busqFiltradaListaDanios(fechaIni:string,fechaFin:string,cliente:number,areaDanio:string,tipoDanio:string,danioEstado:number,geocercas:string, idlocalidad:string):Observable<any>{
    return this.http.get(this.API_URI+'/danios/busqFiltradaListaDanios/'+fechaIni+'/'+fechaFin+'/'+cliente+'/'+areaDanio+'/'+tipoDanio+'/'+danioEstado+'/'+geocercas + '/' + idlocalidad);
  }

  busqFiltradaXVinsDanios(lista:string,idlocalidad:string):Observable<any>{
    return this.http.get(this.API_URI+'/danios/busqFiltradaXVinsDanios/' + lista + '/' + idlocalidad);
  }

  busqFiltradaXVinsDaniosV2(pa_vins: any, idlocalidad: string):Observable<any>{
    const body: any = {
      pa_vins: pa_vins,
      idlocalidad: idlocalidad
    };
    return this.http.post(this.API_URI+'/danios/busqFiltradaXVinsDaniosV2', body);
  }

  consultaDetallesDanio(vin:string):Observable<any>{
    return this.http.get(this.API_URI+'/danios/consultaDetallesDanio/'+vin);
  }
  ubicacionActualVin(vin:string):Observable<any>{
    return this.http.get(this.API_URI+'/danios/ubicacionActualVin/'+vin);
  }

  getAllFotografiasDanio(id:number):Observable<any>{
    return this.http.get(this.API_URI+'/danios/'+id);
  }

  datosClasificacion(fechaInicial: string, fechaFin: string, clasificacion: string):Observable<any>{
    return this.http.get(this.API_URI+'/danios/datos/clasificacion/' + fechaInicial + '/' + fechaFin + '/' + clasificacion);
  }

  datosEstatus(fechaInicial:string, fechaFin:string):Observable<any>{
    return this.http.get(this.API_URI+'/danios/datos/estatus/' + fechaInicial + '/' + fechaFin);
  }

  datosResponsable(fechaInicial:string, fechaFin:string):Observable<any>{
    return this.http.get(this.API_URI+'/danios/datos/responsable/' + fechaInicial + '/' + fechaFin);
  }

  exportExcel(vins:string):Observable<any>{
    return this.http.post(this.API_URI+'/danios/exportExcel',{vins});
  }



}
