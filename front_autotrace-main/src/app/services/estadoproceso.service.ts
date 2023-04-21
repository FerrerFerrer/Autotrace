import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@services/api.service';

@Injectable({
  providedIn: 'root'
})
export class EstadoprocesoService extends ApiService {

  constructor(private http: HttpClient) {super()}

  getListEstadoProceso():Observable<any>{
    return this.http.get(this.API_URI+'/estadoProceso');
  }



  updateEstadoProceso(body : any) : Observable<any>{
    return this.http.post(this.API_URI + "/estadoProceso/updateEstadoProceso", body);
  }


}
