import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// los siguiente son las importaciones de los componentes
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'progress', component: ProgressComponent},
      {path: 'grafica1', component: Grafica1Component},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'}, // Para cuando sea una ruta vacia
    ]
  },

  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},

  {path: '**', component: NopagefoundComponent} // Cualquier otra ruta que no exista nos mandara aqui
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)], // Aqui en esta linea le decimos que son las rutas principales.
  exports: [RouterModule]
})

export class AppRoutingModule { }
