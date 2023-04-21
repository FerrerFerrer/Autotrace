import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class GeocercasService extends ApiService {

  // API_URI = 'http://http://75.102.23.90:3000/api/autotech/geocercas/8';

  constructor(private http: HttpClient) { super() }

  getListGeocercasLocalidad(id: string): Observable<any> {
    return this.http.get(this.API_URI + '/geocercas/' + id);
  }

  getSubtotales(id: string): Observable<any> {
    return this.http.get(this.API_URI + '/geocercas/subtotales/' + id);
  }

  getBusquedaVinLocalidad(idlocalidad: number, VIN: string): Observable<any> {
    return this.http.get(this.API_URI + '/geocercas/busqueda_vin/' + idlocalidad + '/' + VIN);
  }

  getBusquedaTipoServicioLocalidad(idlocalidad: number, tipoServicio: string): Observable<any> {
    return this.http.get(this.API_URI + '/geocercas/busqueda_tipoServicio/' + idlocalidad + '/' + tipoServicio);
  }

  getPuntos(id: number): Observable<any> {
    return this.http.get(this.API_URI + '/geocercas/puntos/' + id);
  }

  getGeocercasList(idlista: number): Observable<any> {
    return this.http.get(this.API_URI + '/geocercas/geocercaList/' + idlista);
  }

  getVinGeocerca(idgeocerca: number): Observable<any> {
    return this.http.get(this.API_URI + '/geocercas/vinGeocerca/' + idgeocerca);
  }

  busqFiltradaMapDist(fechaInicio: string, fechaFin: string, geocerca: string, tipoServicio: number, estadoProceso: number, localidad: string): Observable<any> {
    return this.http.get(this.API_URI + '/geocercas/busqFiltradaMapDist/' + fechaInicio + '/' + fechaFin + '/' + geocerca + '/' + tipoServicio + '/' + estadoProceso + '/' + localidad);
  }

  listaVinsMapDistribucion(lista: string, localidad: string): Observable<any> {
    return this.http.get(this.API_URI + '/geocercas/listaVinsMapDistribucion/' + lista + '/' + localidad);
  }

  listaVinsMapDistribucionV2(pa_vins: any, idlocalidad: string): Observable<any> {
    const body: any = {
      pa_vins: pa_vins,
      idlocalidad: idlocalidad
    };
    return this.http.post(this.API_URI + '/geocercas/listaVinsMapDistribucionV2', body);
  }

  busqFiltradaHistorial(fechaInicio: string, fechaFin: string, geocerca: string, tipoServicio: number, estadoProceso: number, localidad: string): Observable<any> {
    return this.http.get(this.API_URI + '/geocercas/busqFiltradaHistorial/' + fechaInicio + '/' + fechaFin + '/' + geocerca + '/' + tipoServicio + '/' + estadoProceso + '/' + localidad);
  }

  listaVinsHistorial(lista: string, localidad: string): Observable<any> {
    return this.http.get(this.API_URI + '/geocercas/listaVinsHistorial/' + lista + '/' + localidad);
  }

  listaVinsHistorialV2(pa_vins: any, idlocalidad: string): Observable<any> {
    const body: any = {
      pa_vins: pa_vins,
      idlocalidad: idlocalidad
    };

    return this.http.post(this.API_URI + '/geocercas/listaVinsHistorialV2', body);
  }

  geocercasMapaDistribucion(fechaInicio: string, fechaFin: string, geocerca: string, tipoServicio: number, estadoProceso: number): Observable<any> {
    return this.http.get(this.API_URI + '/geocercas/geocercasMapaDistribucion/' + fechaInicio + '/' + fechaFin + '/' + geocerca + '/' + tipoServicio + '/' + estadoProceso);
  }

  geocercasListaVins(lista: string): Observable<any> {
    return this.http.get(this.API_URI + '/geocercas/geocercasListaVins/' + lista);
  }

  geocercasListaVinsV2(pa_vins: any, idlocalidad: string): Observable<any> {
    const body: any = {
      pa_vins: pa_vins,
      idlocalidad: idlocalidad
    };
    return this.http.post(this.API_URI + '/geocercas/geocercasListaVinsV2', body);
  }

  createGeocerca(body: any): Observable<any> {
    return this.http.post(this.API_URI + '/geocercas/', body);
  }

  createPuntoPoligono(body: any): Observable<any> {
    return this.http.post(this.API_URI + '/geocercas/puntos', body);
  }

  updateGecerca(idgeocerca: string, body: any): Observable<any> {
    return this.http.put(this.API_URI + '/geocercas/' + idgeocerca, body);
  }

  deletePuntosPoligono(idgeocerca: string): Observable<any> {
    return this.http.delete(this.API_URI + '/geocercas/puntos/' + idgeocerca);
  }

  deleteGeocerca(idgeocerca: string): Observable<any> {
    return this.http.delete(this.API_URI + '/geocercas/geocerca/' + idgeocerca);
  }

  buscarPatronGeocerca(cadena: string): Observable<any> {
    return this.http.get(this.API_URI + '/geocercas/buscar/' + cadena);
  }

  listarGeocercasLocalidad(cadena: string): Observable<any> {
    return this.http.get(this.API_URI + '/geocercas/listarGeocercasLocalidad/' + cadena);
  }



}
