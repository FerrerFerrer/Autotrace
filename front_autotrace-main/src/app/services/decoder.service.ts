import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DecoderService extends ApiService{

  constructor(private http: HttpClient) { super() }

  actualizarDecoder(): Observable<any> { return this.http.get(this.API_URI + '/decoder')}
}
