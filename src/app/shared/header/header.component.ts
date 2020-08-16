import { Component, OnInit } from '@angular/core';

// Servicios
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(private usuarioServices: UsuarioService) { }

  ngOnInit(): void {
  }

  logout(){
    this.usuarioServices.logout();
  }
}
