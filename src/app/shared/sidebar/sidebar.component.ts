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

  // public imgURL = ''; // Otra forma de hacer para asignar la imagen es llamar directamente la funcion y asignar el valor
  public usuario: Usuario;

  constructor(public sidebarService: SidebarService, private usurioService: UsuarioService) {
    // this.imgURL = this.usurioService.usuario.imagenURL; // Se puede poner directo el valor, llamando la funcion
    this.usuario = this.usurioService.usuario;
  }

  ngOnInit(): void {
  }

}
