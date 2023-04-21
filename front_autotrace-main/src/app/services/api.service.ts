import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    //public API_URI = 'http://75.102.23.90:3000/api/autotech';
    // public API_URI ='http://b8ff0b49f137.sn.mynetname.net:3000/api/autotech';
    public API_URI ='http://localhost:3000/api/autotech';
    constructor(){}
}
 