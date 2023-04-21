import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({  
  selector: 'app-codigos-danios',
  templateUrl: './codigos-danios.component.html',
  styleUrls: ['./codigos-danios.component.scss']
})
export class CodigosDaniosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  irAdministrarArea(){
    this.router.navigateByUrl("menu/codigos-danios/area");
  }

  irAdministrarSeveridadFactor(){
    this.router.navigateByUrl("menu/codigos-danios/severidad-factor");
  }

  irAdministrarTipo(){
    this.router.navigateByUrl("menu/codigos-danios/tipo");
  }

  irAdministrarTipoReparacion(){
    this.router.navigateByUrl("menu/codigos-danios/tipo-reparacion");
  }

  irAdministrarUbicacion(){
    this.router.navigateByUrl("menu/codigos-danios/ubicacion");
  }

  

}
