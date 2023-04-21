import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SendMailService extends ApiService{

  constructor(private http:HttpClient) {super() }


  getListCorreos(): Observable<any>{
    return this.http.get(this.API_URI + '/Email/listCorreos');
  }

  sendMail(body:any): Observable<any>{
    return this.http.post(this.API_URI + '/Email/sendMail', body);
  }

}
