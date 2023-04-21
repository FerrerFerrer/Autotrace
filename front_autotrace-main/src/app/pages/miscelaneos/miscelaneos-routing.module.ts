import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { DecoderDbComponent } from './decoder-db/decoder-db.component';
import { Digito10Component } from './decoder-db/digito10/digito10.component';
import { Digito11Component } from './decoder-db/digito11/digito11.component';
import { Digito13Component } from './decoder-db/digito13/digito13.component';
import { Digito4Component } from './decoder-db/digito4/digito4.component';
import { Digito57Component } from './decoder-db/digito57/digito57.component';
import { Digito8Component } from './decoder-db/digito8/digito8.component';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { ImprimirVinComponent } from './imprimir-vin/imprimir-vin.component';
import { LocalidadesComponent } from './localidades/localidades.component';
import { MiscelanioInventarioComponent } from './miscelanio-inventario/miscelanio-inventario.component';
import { ModelsComponent } from './models/models.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { TipoInventarioComponent } from './tipo-inventario/tipo-inventario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { VinFacturarComponent } from './vin-facturar/vin-facturar.component';

const routes: Routes = [
  {
    path: 'miscelaneo-inventario',
    component: MiscelanioInventarioComponent
  },
  {
    path: 'miscelaneo-imprimir-vin',
    component: ImprimirVinComponent
  },
  {
    path: 'clientes',
    component: ClientesComponent
  },
  {
    path: 'decoder-db/digito1-3',
    component: Digito13Component
  },
  {
    path: 'decoder-db/digito4',
    component: Digito4Component
  },
  {
    path: 'decoder-db/digito5-7',
    component: Digito57Component
  },
  {
    path: 'decoder-db/digito8',
    component: Digito8Component
  },
  {
    path: 'decoder-db/digito10',
    component: Digito10Component
  },
  {
    path: 'decoder-db/digito11',
    component: Digito11Component
  },
  {
    path: 'decoder-db',
    component: DecoderDbComponent
  },
  {
    path: 'localidades',
    component: LocalidadesComponent
  },
  {
    path: 'proveedores',
    component: ProveedoresComponent
  },
  {
    path: 'tipo-inventario',
    component: TipoInventarioComponent
  },
  {
    path: 'departamentos',
    component: DepartamentosComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent
  },
  {
    path: 'vin-facturar',
    component: VinFacturarComponent
  },
  {
    path: 'models',
    component: ModelsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiscelaneosRoutingModule { }
