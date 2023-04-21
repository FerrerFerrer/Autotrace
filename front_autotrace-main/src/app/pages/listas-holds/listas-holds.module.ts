import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListasHoldsRoutingModule } from './listas-holds-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
   // ListasHoldsComponent,
  //  VinsListaComponent,
  //  AltaListaComponent,
  ],
  imports: [
    CommonModule,
    ListasHoldsRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
  ]
})
export class ListasHoldsModule { }
