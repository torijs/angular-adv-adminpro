import { Component, OnInit } from '@angular/core';

// Servicios
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  // public imgURL = '';
  public usuario: Usuario;

  constructor(private usuarioServices: UsuarioService) {
    // this.imgURL = this.usuarioServices.usuario.imagenURL; // Como es un get no se necesita las llaves.
    this.usuario = this.usuarioServices.usuario;
  }

  ngOnInit(): void {
  }

  logout(){
    this.usuarioServices.logout();
  }
}
