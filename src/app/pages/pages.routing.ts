// Modulos
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Guard para la verificaci+on de que este autenticado
import {AuthGuard} from '../guards/auth.guard';

// Componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';


const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate : [AuthGuard],
        children: [ // MAnda algunos argumentos por la ruta, se tiene una propiedad llamado data, la cual es un objeto donde podemos mandar
            { path: '', component: DashboardComponent, data: {titulo: 'Dashboard'} }, // lo que sea,
            { path: 'progress', component: ProgressComponent, data: {titulo: 'ProgressBar'} },
            { path: 'grafica1', component: Grafica1Component, data: {titulo: 'Grafica1'} },
            {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajuestes de Cuenta'}},
            {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
            {path: 'rxjs', component: RxjsComponent, data: {titulo: 'RXJS'}}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PagesRoutingModule {}
