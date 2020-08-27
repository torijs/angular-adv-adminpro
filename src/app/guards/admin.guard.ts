import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

// rxjs
import { Observable } from 'rxjs';

// Servicios
import { UsuarioService } from '../services/usuario.service';

// Router
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      console.log('Paso por adminGuard: Solo Administrador');
      // Se puede Utilizar un operador ternario para realizaar la condición
      // return (this.usuarioService.role === 'ADMIN_ROLE') ? true : false ;

      if (this.usuarioService.role === 'ADMIN_ROLE'){
        return true;
      }else{
        this.router.navigateByUrl('/dashboard');
        return false;
      }
  }

}
