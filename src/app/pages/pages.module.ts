// modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import {FormsModule} from '@angular/forms'; // Aqui lo importamo por el momento porque solo lo ocupamos aqui,
import { ComponentsModule } from '../components/components.module'; // aui lo declaramos porque aqui vamos a ocuparlo


// Compoenentes
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

@NgModule({
  declarations: [
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    DashboardComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent
  ],
  imports: [
    CommonModule,
    SharedModule, // Nuestro primer modulo personalisado que vamos a ocupar solo aqui.
    AppRoutingModule, // Este es para que funcione el router-outlet en el page.component.html
    FormsModule,
    ComponentsModule
  ],
  exports: [
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    DashboardComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent
  ]
})
export class PagesModule { }
