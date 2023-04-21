import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioPatioComponent } from './inventario-patio/inventario-patio.component';
import { InventarioTransitoComponent } from './inventario-transito/inventario-transito.component';

const routes: Routes = [
  {
    path: 'inventario-transito',
    component: InventarioTransitoComponent
  },
  {
    path: 'inventario-patio',
    component: InventarioPatioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventariosRoutingModule { }
