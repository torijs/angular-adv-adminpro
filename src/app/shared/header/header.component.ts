import { Component, OnInit } from '@angular/core';


// Servicios
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

// Router
import {Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  // public imgURL = '';
  public usuario: Usuario;

  constructor(private usuarioServices: UsuarioService, private router: Router) {
    // this.imgURL = this.usuarioServices.usuario.imagenURL; // Como es un get no se necesita las llaves.
    this.usuario = this.usuarioServices.usuario;
  }

  ngOnInit(): void {
  }

  logout(){
    this.usuarioServices.logout();
  }

  buscar(termino: any){
    if (termino.length === 0){
      return this.router.navigateByUrl('/dashboard');
    }
    this.router.navigate(['/dashboard/buscar', termino]);

  }
}

