import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeocercasComponent } from './geocercas.component';

const routes: Routes = [
  {
    path: 'geocercas',
    component: GeocercasComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeocercasRoutingModule { }
