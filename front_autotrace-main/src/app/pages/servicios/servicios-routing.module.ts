import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadesComponent } from './actividades/actividades.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { HerramientasComponent } from './herramientas/herramientas.component';
import { HistorialTarifasComponent } from './historial-tarifas/historial-tarifas.component';
import { ReporteServiciosComponent } from './reporte-servicios/reporte-servicios.component';
import { TipoServicioComponent } from './tipo-servicio/tipo-servicio.component';

const routes: Routes = [
  {
    path: 'servicios-actividades',
    component: ActividadesComponent
  },
  {
    path: 'empleados',
    component: EmpleadosComponent
  },
  {
    path: 'herramientas',
    component: HerramientasComponent
  },
  {
    path: 'historial-tarifas',
    component: HistorialTarifasComponent
  },
  {
    path: 'reporte-servicios',
    component: ReporteServiciosComponent
  },
  {
    path: 'servicios',
    component: TipoServicioComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosRoutingModule { }
