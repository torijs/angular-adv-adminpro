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
      ]
    }
  ];

  constructor() { }

}
