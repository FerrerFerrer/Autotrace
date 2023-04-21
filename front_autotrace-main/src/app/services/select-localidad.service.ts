import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectLocalidadService {

  cambioLocalidad = new EventEmitter();
  constructor(){}

}
