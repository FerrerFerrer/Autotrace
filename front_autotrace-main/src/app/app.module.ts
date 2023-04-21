import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { DataTablesModule } from "angular-datatables";
import { AppRoutingModule } from '@/app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from '@modules/main/main.component';
import { LoginComponent } from '@modules/login/login.component';
import { HeaderComponent } from '@modules/main/header/header.component';
import { FooterComponent } from '@modules/main/footer/footer.component';
import { MenuSidebarComponent } from '@modules/main/menu-sidebar/menu-sidebar.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from '@pages/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from '@modules/register/register.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { MessagesDropdownMenuComponent } from '@modules/main/header/messages-dropdown-menu/messages-dropdown-menu.component';
import { NotificationsDropdownMenuComponent } from '@modules/main/header/notifications-dropdown-menu/notifications-dropdown-menu.component';
import { AppButtonComponent } from './components/app-button/app-button.component';
import { AuthGuard } from '@guards/auth.guard';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import { UserDropdownMenuComponent } from '@modules/main/header/user-dropdown-menu/user-dropdown-menu.component';
import { ForgotPasswordComponent } from '@modules/forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from '@modules/recover-password/recover-password.component';
import { LanguageDropdownComponent } from '@modules/main/header/language-dropdown/language-dropdown.component';
import { PrivacyPolicyComponent } from './modules/privacy-policy/privacy-policy.component';
import { MapadistribucionComponent } from './pages/mapadistribucion/mapadistribucion.component';
import { DaniosComponent } from './pages/danios/danios.component';
import { ChartsModule } from 'ng2-charts';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { ListasHoldsComponent } from './pages/listas-holds/listas-holds.component';
import { ManifiestoComponent } from './pages/manifiesto/manifiesto.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OlMapsModule } from '@pages/ol-maps/ol-maps.module';
import { BrowserModule } from '@angular/platform-browser';
import { ModalValidacionComponent } from '@pages/dashboard/modal-validacion/modal-validacion.component';
import { ListadoDaniosComponent } from '@pages/danios/listado-danios/listado-danios.component';
import { GraficasDaniosComponent } from './pages/danios/graficas-danios/graficas-danios.component';
import { CodigosDaniosComponent } from './pages/danios/codigos-danios/codigos-danios.component';

import { SubirManifiestoComponent } from './pages/manifiesto/subir-manifiesto/subir-manifiesto.component';
import { SeguimientoManifiestosComponent } from './pages/manifiesto/seguimiento-manifiestos/seguimiento-manifiestos.component';
import { TipoInventarioComponent } from './pages/miscelaneos/tipo-inventario/tipo-inventario.component';
import { MiscelaneosComponent } from './pages/miscelaneos/miscelaneos.component';
import { AreaComponent } from './pages/danios/codigos-danios/area/area.component';
import { TipoComponent } from './pages/danios/codigos-danios/tipo/tipo.component';
import { SeveridadFactorComponent } from './pages/danios/codigos-danios/severidad-factor/severidad-factor.component';
import { UbicacionComponent } from './pages/danios/codigos-danios/ubicacion/ubicacion.component';
import { TipoReparacionComponent } from './pages/danios/codigos-danios/tipo-reparacion/tipo-reparacion.component';

import { VinsManifiestoComponent } from './pages/manifiesto/seguimiento-manifiestos/vins-manifiesto/vins-manifiesto.component';
import { ModalEditarAreaComponent } from './pages/danios/codigos-danios/area/modal-editar-area/modal-editar-area.component';
import { ModalAgrearAreaComponent } from './pages/danios/codigos-danios/area/modal-agrear-area/modal-agrear-area.component';
import { TablaModalComponent } from './pages/componentes-utiles/tabla-modal/tabla-modal.component';
import { ModalHistorialVinComponent } from './pages/historial/modal-historial-vin/modal-historial-vin.component';
import { EncabezadoPaginaComponent } from './pages/componentes-utiles/encabezado-pagina/encabezado-pagina.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { DescargarPlacardComponent } from './pages/componentes-utiles/descargar-placard/descargar-placard.component';
import { VinsListaComponent } from '@pages/listas-holds/vins-lista/vins-lista.component';
import { AltaListaComponent } from './pages/listas-holds/alta-lista/alta-lista.component';
import { ModalAgregarSeveridadFactorComponent } from './pages/danios/codigos-danios/severidad-factor/modal-agregar-severidad-factor/modal-agregar-severidad-factor.component';
import { ModalEditarSeveridadFactorComponent } from './pages/danios/codigos-danios/severidad-factor/modal-editar-severidad-factor/modal-editar-severidad-factor.component';
import { ModalEditarTipoComponent } from './pages/danios/codigos-danios/tipo/modal-editar-tipo/modal-editar-tipo.component';
import { ModalAgregarTipoComponent } from './pages/danios/codigos-danios/tipo/modal-agregar-tipo/modal-agregar-tipo.component';
import { ModalAgregarTipoReparacionComponent } from './pages/danios/codigos-danios/tipo-reparacion/modal-agregar-tipo-reparacion/modal-agregar-tipo-reparacion.component';
import { ModalEditarTipoReparacionComponent } from './pages/danios/codigos-danios/tipo-reparacion/modal-editar-tipo-reparacion/modal-editar-tipo-reparacion.component';
import { ModalEditarUbicacionComponent } from './pages/danios/codigos-danios/ubicacion/modal-editar-ubicacion/modal-editar-ubicacion.component';
import { ModalAgregarUbicacionComponent } from './pages/danios/codigos-danios/ubicacion/modal-agregar-ubicacion/modal-agregar-ubicacion.component';
import { ModalAgregarTipoInventarioComponent } from './pages/miscelaneos/tipo-inventario/modal-agregar-tipo-inventario/modal-agregar-tipo-inventario.component';
import { ModalEditarTipoInventarioComponent } from './pages/miscelaneos/tipo-inventario/modal-editar-tipo-inventario/modal-editar-tipo-inventario.component';
import { DetallesDanioComponent } from './pages/danios/detalles-danio/detalles-danio.component';
import { ModalUbicacionVinDanioComponent } from './pages/danios/detalles-danio/modal-ubicacion-vin-danio/modal-ubicacion-vin-danio.component';
import { LineChartComponent } from './pages/danios/graficas-danios/charts/line-chart/line-chart.component';
import { ModalEnviarListaCorreoComponent } from './pages/listas-holds/modal-enviar-lista-correo/modal-enviar-lista-correo.component';

import { ModalDetallesDanioComponent } from './pages/danios/listado-danios/modal-detalles-danio/modal-detalles-danio.component';
import { ModalDanioUbicacionComponent } from './pages/danios/listado-danios/modal-danio-ubicacion/modal-danio-ubicacion.component';
import { ModalDescargaDetallesDaniosComponent } from './pages/danios/listado-danios/modal-descarga-detalles-danios/modal-descarga-detalles-danios.component';
import { PlacardMultipleComponent } from './pages/componentes-utiles/placard-multiple/placard-multiple.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalEditarFechaIngresoComponent } from './pages/mapadistribucion/modal-editar-fecha-ingreso/modal-editar-fecha-ingreso.component';
import { ModalEditarStatusDfyComponent } from './pages/mapadistribucion/modal-editar-status-dfy/modal-editar-status-dfy.component';
import { ModalEditarStatusVitimsComponent } from './pages/mapadistribucion/modal-editar-status-vitims/modal-editar-status-vitims.component';
import { ModalEditarEstadoProcesoComponent } from './pages/mapadistribucion/modal-editar-estado-proceso/modal-editar-estado-proceso.component';
import { SabanaComponent } from './pages/sabana/sabana.component';
import { FormsModule } from '@angular/forms';
import { SubirArchivoComponent } from './pages/sabana/subir-archivo/subir-archivo.component';
import { ModalArchivosSubidosComponent } from './pages/sabana/modal-archivos-subidos/modal-archivos-subidos.component';
import { RequisitosArchivoComponent } from './pages/sabana/requisitos-archivo/requisitos-archivo.component';

registerLocaleData(localeEn, 'en-EN');

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        MenuSidebarComponent,
        ProfileComponent,
        RegisterComponent,
        DashboardComponent,
        MessagesDropdownMenuComponent,
        NotificationsDropdownMenuComponent,
        AppButtonComponent,
        UserDropdownMenuComponent,
        ForgotPasswordComponent,
        RecoverPasswordComponent,
        LanguageDropdownComponent,
        PrivacyPolicyComponent,
        MapadistribucionComponent,
        DaniosComponent,
        ServiciosComponent,
        ListasHoldsComponent,

        ManifiestoComponent,
        HistorialComponent,
        ListadoDaniosComponent,
        GraficasDaniosComponent,
        CodigosDaniosComponent,

        SubirManifiestoComponent,
        SeguimientoManifiestosComponent,
        TipoInventarioComponent,
        MiscelaneosComponent,
        AreaComponent,
        TipoComponent,
        SeveridadFactorComponent,
        UbicacionComponent,
        TipoReparacionComponent,

        VinsManifiestoComponent,
        TablaModalComponent,
        ModalHistorialVinComponent,
        EncabezadoPaginaComponent,
        VinsListaComponent,
        AltaListaComponent,
        ModalValidacionComponent,
        ModalEditarAreaComponent,
        ModalAgrearAreaComponent,
        ModalAgregarSeveridadFactorComponent,
        ModalEditarSeveridadFactorComponent,
        ModalEditarTipoComponent,
        ModalAgregarTipoComponent,
        ModalAgregarTipoReparacionComponent,
        ModalEditarTipoReparacionComponent,
        ModalEditarUbicacionComponent,
        ModalAgregarUbicacionComponent,
        DescargarPlacardComponent,
        ModalAgregarTipoInventarioComponent,
        ModalEditarTipoInventarioComponent,
        DetallesDanioComponent,
        ModalUbicacionVinDanioComponent,
        LineChartComponent,
        ModalEnviarListaCorreoComponent,
        ModalDetallesDanioComponent,
        ModalDanioUbicacionComponent,
        ModalDescargaDetallesDaniosComponent,
        PlacardMultipleComponent,
        ModalEditarFechaIngresoComponent,
        ModalEditarStatusDfyComponent,
        ModalEditarStatusVitimsComponent,
        ModalEditarEstadoProcesoComponent,
        SabanaComponent,
        SubirArchivoComponent,
        ModalArchivosSubidosComponent,
        RequisitosArchivoComponent,

    ],
    imports: [
        NgbModule,
        OlMapsModule,
        BrowserModule,
        CommonModule,
        ChartsModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        DataTablesModule,
        NgxBarcodeModule,
        NgxSpinnerModule,
        FormsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true
        })
    ],

    entryComponents: [
        ModalEditarAreaComponent,
        ModalAgrearAreaComponent,
        ModalValidacionComponent,
        ModalHistorialVinComponent,
        DescargarPlacardComponent,
        ModalAgregarSeveridadFactorComponent,
        ModalEditarSeveridadFactorComponent,
        ModalEditarTipoComponent,
        ModalAgregarTipoComponent,
        ModalAgregarTipoReparacionComponent,
        ModalEditarTipoReparacionComponent,
        ModalEditarUbicacionComponent,
        ModalAgregarUbicacionComponent,
        ModalAgregarTipoInventarioComponent,
        ModalEditarTipoInventarioComponent,
        ModalDetallesDanioComponent,
        ModalDanioUbicacionComponent,
        ModalEnviarListaCorreoComponent,
        ModalDetallesDanioComponent,
        ModalDanioUbicacionComponent,
        ModalDescargaDetallesDaniosComponent,

    ],
    providers: [AuthGuard, DatePipe],
    bootstrap: [AppComponent]
})
export class AppModule { }
