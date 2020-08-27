import { Component, OnInit } from '@angular/core';

// Servicios
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';


declare function customInitFunctions(); // Esta variable ya lo declaramos de forma gloval desde el archivo js.

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {


  constructor(private settingsService: SettingsService, private sidebarService: SidebarService) {
  }

  ngOnInit(): void {
    customInitFunctions(); // La funcion se encuentra en en un archivo en la carpeta assets, JQUERY
    this.sidebarService.cargarMenu(); // Primero se carga aqui antes que en otro lado Aqui llamamos el servicio para crear el menu
  }

}
