// Modulos
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Guard para la verificaci+on de que este autenticado
import {AuthGuard} from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

// Componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate : [AuthGuard],
        children: [ // MAnda algunos argumentos por la ruta, se tiene una propiedad llamado data, la cual es un objeto donde podemos mandar
            { path: '', component: DashboardComponent, data: {titulo: 'Dashboard'} }, // lo que sea, En este caso para saber en que ruta nos
            { path: 'progress', component: ProgressComponent, data: {titulo: 'ProgressBar'} }, // encontramos
            { path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil'} },
            { path: 'grafica1', component: Grafica1Component, data: {titulo: 'Grafica1'} },
            { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de Cuenta'}},
            { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
            { path: 'rxjs', component: RxjsComponent, data: {titulo: 'RXJS'}},
            { path: 'buscar/:termino', component: BusquedaComponent, data: {titulo: 'Busqueda Global'}},
            // MAntenimientos
            { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Hospitales de Aplicación'}},
            { path: 'medicos', component: MedicosComponent, data: {titulo: 'Medicos de Aplicación'}},
            { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizar Medico'}},
            // Rutas de administrador. --> Aqui lo pasamos por otro canActive para poder verificar que sea un usario Administrador
            { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: {titulo: 'Usuarios de Aplicación'}}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PagesRoutingModule {}
