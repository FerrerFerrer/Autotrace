import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { ActividadesComponent } from './actividades/actividades.component';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { EmpleadosComponent } from './empleados/empleados.component';
import { HerramientasComponent } from './herramientas/herramientas.component';
import { HistorialTarifasComponent } from './historial-tarifas/historial-tarifas.component';
import { ReporteServiciosComponent } from './reporte-servicios/reporte-servicios.component';
import { TipoServicioComponent } from './tipo-servicio/tipo-servicio.component';
import { ModalAgregarActividadComponent } from './actividades/modal-agregar-actividad/modal-agregar-actividad.component';
import { ModalEditarActividadComponent } from './actividades/modal-editar-actividad/modal-editar-actividad.component';
import { ModalEmpleadosActividadComponent } from './actividades/modal-empleados-actividad/modal-empleados-actividad.component';
import { ModalAgregarEmpleadoComponent } from './empleados/modal-agregar-empleado/modal-agregar-empleado.component';
import { ModalEditarEmpleadoComponent } from './empleados/modal-editar-empleado/modal-editar-empleado.component';
import { ModalEditarHerramientaComponent } from './herramientas/modal-editar-herramienta/modal-editar-herramienta.component';
import { ModalAgregarHerramientaComponent } from './herramientas/modal-agregar-herramienta/modal-agregar-herramienta.component';
import { ModalDetallesReporteComponent } from './reporte-servicios/modal-detalles-reporte/modal-detalles-reporte.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalAgregarTipoServicioComponent } from './tipo-servicio/modal-agregar-tipo-servicio/modal-agregar-tipo-servicio.component';
import { ModalEditarTipoServicioComponent } from './tipo-servicio/modal-editar-tipo-servicio/modal-editar-tipo-servicio.component';
import { ModalDocRequerimientoComponent } from './tipo-servicio/modal-doc-requerimiento/modal-doc-requerimiento.component';
import { ModalDocCotizacionComponent } from './tipo-servicio/modal-doc-cotizacion/modal-doc-cotizacion.component';
import { ModalDocAprobacionComponent } from './tipo-servicio/modal-doc-aprobacion/modal-doc-aprobacion.component';
import { ModalCambiarEstadoServicioComponent } from './tipo-servicio/modal-cambiar-estado-servicio/modal-cambiar-estado-servicio.component';

@NgModule({
  declarations: [
    ActividadesComponent,
    EmpleadosComponent,
    HerramientasComponent,
    HistorialTarifasComponent,
    ReporteServiciosComponent,
    TipoServicioComponent,
    ModalAgregarActividadComponent,
    ModalEditarActividadComponent,
    ModalEmpleadosActividadComponent,
    ModalAgregarEmpleadoComponent,
    ModalEditarEmpleadoComponent,
    ModalEditarHerramientaComponent,
    ModalAgregarHerramientaComponent,
    ModalDetallesReporteComponent,
    ModalAgregarTipoServicioComponent,
    ModalEditarTipoServicioComponent,
    ModalDocRequerimientoComponent,
    ModalDocCotizacionComponent,
    ModalDocAprobacionComponent,
    ModalCambiarEstadoServicioComponent,
    
  ],
  imports: [
    CommonModule,
    ServiciosRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgxSpinnerModule,
  ],
  entryComponents: [
    ModalAgregarActividadComponent,
    ModalEditarActividadComponent,
    ModalEmpleadosActividadComponent,
    ModalAgregarEmpleadoComponent,
    ModalEditarEmpleadoComponent,
    ModalEditarHerramientaComponent,
    ModalAgregarHerramientaComponent,
    ModalDetallesReporteComponent,
    ModalAgregarTipoServicioComponent,
    ModalEditarTipoServicioComponent,
    ModalDocRequerimientoComponent,
    ModalDocCotizacionComponent,
    ModalDocAprobacionComponent,
    ModalCambiarEstadoServicioComponent,
  ]
})
export class ServiciosModule { }
