import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiscelaneosRoutingModule } from './miscelaneos-routing.module';
import { VinFacturarComponent } from './vin-facturar/vin-facturar.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalidadesComponent } from './localidades/localidades.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { DecoderDbComponent } from './decoder-db/decoder-db.component';
import { MiscelanioInventarioComponent } from './miscelanio-inventario/miscelanio-inventario.component';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { Digito13Component } from './decoder-db/digito13/digito13.component';
import { Digito4Component } from './decoder-db/digito4/digito4.component';
import { Digito57Component } from './decoder-db/digito57/digito57.component';
import { Digito8Component } from './decoder-db/digito8/digito8.component';
import { Digito11Component } from './decoder-db/digito11/digito11.component';
import { Digito10Component } from './decoder-db/digito10/digito10.component';
import { ModalAgregarDigito4Component } from './decoder-db/digito4/modal-agregar-digito4/modal-agregar-digito4.component';
import { ModalEditarDigito4Component } from './decoder-db/digito4/modal-editar-digito4/modal-editar-digito4.component';
import { ModalEditarDigito13Component } from './decoder-db/digito13/modal-editar-digito13/modal-editar-digito13.component';
import { ModalAgregarDigito13Component } from './decoder-db/digito13/modal-agregar-digito13/modal-agregar-digito13.component';
import { ModalAgregarDigito8Component } from './decoder-db/digito8/modal-agregar-digito8/modal-agregar-digito8.component';
import { ModalAgregarDigito10Component } from './decoder-db/digito10/modal-agregar-digito10/modal-agregar-digito10.component';
import { ModalEditarDigito8Component } from './decoder-db/digito8/modal-editar-digito8/modal-editar-digito8.component';
import { ModalEditarDigito10Component } from './decoder-db/digito10/modal-editar-digito10/modal-editar-digito10.component';
import { ModalAgregarDigito11Component } from './decoder-db/digito11/modal-agregar-digito11/modal-agregar-digito11.component';
import { ModalEditarDigito11Component } from './decoder-db/digito11/modal-editar-digito11/modal-editar-digito11.component';
import { ModalEditarDigito57Component } from './decoder-db/digito57/modal-editar-digito57/modal-editar-digito57.component';
import { ModalAgregarDigito57Component } from './decoder-db/digito57/modal-agregar-digito57/modal-agregar-digito57.component';
import { ModalEditarUsuarioComponent } from './usuarios/modal-editar-usuario/modal-editar-usuario.component';
import { ModalAgregarUsuarioComponent } from './usuarios/modal-agregar-usuario/modal-agregar-usuario.component';
import { ModalAgregarLocalidadComponent } from './localidades/modal-agregar-localidad/modal-agregar-localidad.component';
import { ModalEditarLocalidadComponent } from './localidades/modal-editar-localidad/modal-editar-localidad.component';
import { ModalLocalidadesUsuarioComponent } from './usuarios/modal-localidades-usuario/modal-localidades-usuario.component';
import { ModalEditarClienteComponent } from './clientes/modal-editar-cliente/modal-editar-cliente.component';
import { ModalAgregarClienteComponent } from './clientes/modal-agregar-cliente/modal-agregar-cliente.component';
import { ModalAgregarProveedorComponent } from './proveedores/modal-agregar-proveedor/modal-agregar-proveedor.component';
import { ModalEditarProveedorComponent } from './proveedores/modal-editar-proveedor/modal-editar-proveedor.component';
import { ModalAgregarInventarioComponent } from './miscelanio-inventario/modal-agregar-inventario/modal-agregar-inventario.component';
import { ModalEditarInventarioComponent } from './miscelanio-inventario/modal-editar-inventario/modal-editar-inventario.component';
import { ModalLocalidadesProveedorComponent } from './proveedores/modal-localidades-proveedor/modal-localidades-proveedor.component';
import { ModalAgregarDepartamentoComponent } from './departamentos/modal-agregar-departamento/modal-agregar-departamento.component';
import { ModalEditarDepartamentoComponent } from './departamentos/modal-editar-departamento/modal-editar-departamento.component';
import { ImprimirVinComponent } from './imprimir-vin/imprimir-vin.component';
import { ModelsComponent } from './models/models.component';
import { ModalAgregarModelComponent } from './models/modal-agregar-model/modal-agregar-model.component';
import { ModalEditarModelComponent } from './models/modal-editar-model/modal-editar-model.component';


@NgModule({
  declarations: [
    VinFacturarComponent,
    LocalidadesComponent,
    UsuariosComponent,
    ClientesComponent,
    ProveedoresComponent,
    DecoderDbComponent,
    MiscelanioInventarioComponent,
    DepartamentosComponent,
    Digito13Component,
    Digito4Component,
    Digito57Component,
    Digito8Component,
    Digito10Component,
    Digito11Component,
    ModalAgregarDigito4Component,
    ModalEditarDigito4Component,
    ModalEditarDigito13Component,
    ModalAgregarDigito13Component,
    ModalAgregarDigito8Component,
    ModalEditarDigito8Component,
    ModalAgregarDigito10Component,
    ModalEditarDigito10Component,
    ModalAgregarDigito11Component,
    ModalEditarDigito11Component,
    ModalEditarDigito57Component,
    ModalAgregarDigito57Component,
    ModalEditarUsuarioComponent,
    ModalAgregarUsuarioComponent,
    ModalAgregarLocalidadComponent,
    ModalEditarLocalidadComponent,
    ModalLocalidadesUsuarioComponent,
    ModalEditarClienteComponent,
    ModalAgregarClienteComponent,
    ModalAgregarProveedorComponent,
    ModalEditarProveedorComponent,
    ModalAgregarInventarioComponent,
    ModalEditarInventarioComponent,
    ModalLocalidadesProveedorComponent,
    ModalAgregarDepartamentoComponent,
    ModalEditarDepartamentoComponent,
    ImprimirVinComponent,
    ModelsComponent,
    ModalAgregarModelComponent,
    ModalEditarModelComponent
    
  ],
  imports: [
    CommonModule,
    MiscelaneosRoutingModule,
    NgxSpinnerModule,
    DataTablesModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    ModalAgregarDigito4Component,
    ModalEditarDigito4Component,
    ModalEditarDigito13Component,
    ModalAgregarDigito13Component,
    ModalAgregarDigito8Component,
    ModalEditarDigito8Component,
    ModalAgregarDigito10Component,
    ModalEditarDigito10Component,
    ModalAgregarDigito11Component,
    ModalEditarDigito11Component,
    ModalEditarDigito57Component,
    ModalAgregarDigito57Component,
    ModalEditarUsuarioComponent,
    ModalAgregarUsuarioComponent,
    ModalAgregarLocalidadComponent,
    ModalEditarLocalidadComponent,
    ModalLocalidadesUsuarioComponent,
    ModalAgregarInventarioComponent,
    ModalEditarInventarioComponent,
    ModalLocalidadesProveedorComponent,
    ModalAgregarDepartamentoComponent,
    ModalEditarDepartamentoComponent,
    ImprimirVinComponent
  ]
})
export class MiscelaneosModule { }
