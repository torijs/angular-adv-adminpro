
// Modulos
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesRoutingModule } from './pages/pages.routing'; // EStas son las rutas que movimos para que se vea
import { AuthRoutingModule } from './auth/auth.routing'; // Aqui un poco mas limpio y no todo sucio.

// los siguiente son las importaciones de los componentes
import { NopagefoundComponent } from './nopagefound/nopagefound.component';


const routes: Routes = [

  // path: 'dashboard' PagesRouting
  // path: '/auth' AuthRouting


  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', component: NopagefoundComponent} // Cualquier otra ruta que no exista nos mandara aqui
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),  // Aqui en esta linea le decimos que son las rutas principales.
    PagesRoutingModule, // ESta es la que separamos para que aqui quede mas limpio
    AuthRoutingModule
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
