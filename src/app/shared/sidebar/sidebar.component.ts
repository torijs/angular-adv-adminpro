import { Component, OnInit } from '@angular/core';

// SErvicios
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

// Modelo
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  // public imgURL = ''; // Otra forma de hacer para asignar la imagen es llamar directamente la funcion y asignar el valor
  public usuario: Usuario;

  constructor(private sidebarComponent: SidebarService, private usurioService: UsuarioService) {
    this.menuItems = sidebarComponent.menu;
    // this.imgURL = this.usurioService.usuario.imagenURL; // Se puede poner directo el valor, llamando la funcion
    this.usuario = this.usurioService.usuario;
    console.log(this.menuItems);
  }

  ngOnInit(): void {
  }

}
