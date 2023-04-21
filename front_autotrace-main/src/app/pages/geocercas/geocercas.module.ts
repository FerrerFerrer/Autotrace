import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeocercasRoutingModule } from './geocercas-routing.module';
import { GeocercasComponent } from './geocercas.component';
import { ModalAgregarGeocercaComponent } from './modal-agregar-geocerca/modal-agregar-geocerca.component';
import { ModalEditarGeocercaComponent } from './modal-editar-geocerca/modal-editar-geocerca.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    GeocercasComponent,
    ModalAgregarGeocercaComponent,
    ModalEditarGeocercaComponent,
  ],
  imports: [
    CommonModule,
    GeocercasRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    DataTablesModule,
  ],
  entryComponents: [
    ModalAgregarGeocercaComponent,
    ModalEditarGeocercaComponent,
  ]
})
export class GeocercasModule { }
