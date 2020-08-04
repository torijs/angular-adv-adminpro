import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';


declare function customInitFunctions(); // Esta variable ya lo declaramos de forma gloval desde el archivo js.

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {


  constructor(private settingsService: SettingsService) {
  }

  ngOnInit(): void {
    customInitFunctions(); // La funcion se encuentra en en un archivo en la carpeta assets
  }

}
