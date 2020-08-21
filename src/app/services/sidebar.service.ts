import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Main', url: '/'},
        {titulo: 'ProgressBar', url: '/dashboard/progress'},
        {titulo: 'Graficas', url: '/dashboard/grafica1'},
        {titulo: 'Promesas', url: '/dashboard/promesas'},
        {titulo: 'Rxjs', url: '/dashboard/rxjs'}
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Usuarios', url: '/dashboard/usuarios'},
        {titulo: 'Hospitales', url: '/dashboard/hospitales'},
        {titulo: 'Medicos', url: '/dashboard/medicos'}
      ]
    }
  ];

  constructor() { }

}
