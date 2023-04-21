import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '@modules/main/main.component';
import { LoginComponent } from '@modules/login/login.component';
import { ProfileComponent } from '@pages/profile/profile.component';
import { RegisterComponent } from '@modules/register/register.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { AuthGuard } from '@guards/auth.guard';
import { NonAuthGuard } from '@guards/non-auth.guard';
import { ForgotPasswordComponent } from '@modules/forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from '@modules/recover-password/recover-password.component';
import { PrivacyPolicyComponent } from '@modules/privacy-policy/privacy-policy.component';
import { MapadistribucionComponent } from '@pages/mapadistribucion/mapadistribucion.component';
import { ListasHoldsComponent } from '@pages/listas-holds/listas-holds.component';
import { HistorialComponent } from '@pages/historial/historial.component';
import { ListadoDaniosComponent } from '@pages/danios/listado-danios/listado-danios.component';
import { GraficasDaniosComponent } from '@pages/danios/graficas-danios/graficas-danios.component';
import { CodigosDaniosComponent } from '@pages/danios/codigos-danios/codigos-danios.component';
import { SeguimientoManifiestosComponent } from '@pages/manifiesto/seguimiento-manifiestos/seguimiento-manifiestos.component';
import { SubirManifiestoComponent } from '@pages/manifiesto/subir-manifiesto/subir-manifiesto.component';
import { AreaComponent } from '@pages/danios/codigos-danios/area/area.component';
import { SeveridadFactorComponent } from '@pages/danios/codigos-danios/severidad-factor/severidad-factor.component';
import { TipoComponent } from '@pages/danios/codigos-danios/tipo/tipo.component';
import { TipoReparacionComponent } from '@pages/danios/codigos-danios/tipo-reparacion/tipo-reparacion.component';
import { UbicacionComponent } from '@pages/danios/codigos-danios/ubicacion/ubicacion.component';
import { VinsManifiestoComponent } from '@pages/manifiesto/seguimiento-manifiestos/vins-manifiesto/vins-manifiesto.component';
import { VinsListaComponent } from '@pages/listas-holds/vins-lista/vins-lista.component';
import { AltaListaComponent } from '@pages/listas-holds/alta-lista/alta-lista.component';
import { SabanaComponent } from '@pages/sabana/sabana.component';


const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'miscelaneo',
                loadChildren: () => import('../app/pages/miscelaneos/miscelaneos.module').then(m => m.MiscelaneosModule)
            },
            {
                path: 'servicios',
                loadChildren: () => import('../app/pages/servicios/servicios.module').then(m => m.ServiciosModule)
            },
            {
                path: 'Inventarios',
                loadChildren: () => import('../app/pages/inventarios/inventarios.module').then(m => m.InventariosModule)
            },

            {
                path: 'geocercas',
                loadChildren: () => import('../app/pages/geocercas/geocercas.module').then(m => m.GeocercasModule)
            },
            {
                path: 'menu/geo-map-distribucion',
                component: MapadistribucionComponent
            },  {
                path: 'menu/listado-danios',
                component: ListadoDaniosComponent
            },{
                path: 'menu/graficas-danios',
                component: GraficasDaniosComponent
            },{
                path: 'menu/codigos-danios',
                component: CodigosDaniosComponent
            },{
                path: 'menu/codigos-danios/area',
                component: AreaComponent
            },{
                path: 'menu/codigos-danios/severidad-factor',
                component: SeveridadFactorComponent
            },{
                path: 'menu/codigos-danios/tipo',
                component: TipoComponent
            },{
                path: 'menu/codigos-danios/tipo-reparacion',
                component: TipoReparacionComponent
            },{
                path: 'menu/codigos-danios/ubicacion',
                component: UbicacionComponent
            }, {
                path: 'listas-hold',
                component: ListasHoldsComponent
            },{
                path: 'listas-hold/vins-lista/:id',
                component: VinsListaComponent
            },{
                path: 'listas-hold/alta-lista',
                component: AltaListaComponent
            },
            {
                path:'menu/geo-historial',
                component: HistorialComponent
            },

            {
                path:'menu/seguimiento-manifiesto',
                component: SeguimientoManifiestosComponent
            },
            {
                path:'menu/seguimiento-manifiesto/vins-manifiesto/:id',
                component: VinsManifiestoComponent
            },
            {
                path:'menu/subir-manifiesto',
                component: SubirManifiestoComponent
            },
            {
              path:'sabana',
              component: SabanaComponent
          },
            {
                path: '',
                component: DashboardComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
        canActivate: [NonAuthGuard]
    },
    // {
    //     path: 'sabana',
    //     component: SabanaComponent,
    //     canActivate: [NonAuthGuard]
    // },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
