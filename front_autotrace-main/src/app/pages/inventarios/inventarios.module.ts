import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventariosRoutingModule } from './inventarios-routing.module';
import { InventarioTransitoComponent } from './inventario-transito/inventario-transito.component';
import { InventarioPatioComponent } from './inventario-patio/inventario-patio.component';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [   
    InventarioTransitoComponent,
    InventarioPatioComponent,
  ],
  imports: [
    CommonModule,
    InventariosRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ]
})
export class InventariosModule { }
