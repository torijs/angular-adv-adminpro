import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

    // Sintaxis de jquey para poder acceder a la cabecera y asi poder modificarlo
    private linkTheme = document.querySelector('#theme');

  constructor() {
    const url: string = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.linkTheme.setAttribute('href', url);

  }

  changeTheme(theme: string){
    // Creamos el nuevo thema que queremos asignar para la aplicación
    const url = `./assets/css/colors/${theme}.css`;
    // Modificamos la cabecera su atributo y despues lo guardamos en el localStorage para
    // que cuando recargue retome el tema elegido.
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);


    this.checkCurrentTheme();
  }


  checkCurrentTheme(){

    const links = document.querySelectorAll('.selector'); // Se accede al selector por medio de javascript puro

    links.forEach(elem => {
      elem.classList.remove('working');

      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeURL = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme.getAttribute('href');

      if (btnThemeURL === currentTheme){
        elem.classList.add('working');
      }

    });
  }

}
