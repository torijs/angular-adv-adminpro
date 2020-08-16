import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

// Servicios
import { UsuarioService } from '../services/usuario.service';

// router
import {Router} from '@angular/router';

// Operadores
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private usuarioServices: UsuarioService, private router: Router){}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('Paso por el canActivate del guard');

    return  this.usuarioServices.validaToken().pipe(
      tap( (estaAutenticado) => {
        if (!estaAutenticado){ this.router.navigateByUrl('/login') } // lo que hara es sacarnos directamente.
      })
    ) // Aqui lo podemos utilizar de esta manera ya que del otro lado del
    // servicio, ya lo modificamos de manera que regresa como respusta solo un false o un true. Y de esa forma lo
    // utilizamos aqui en la funcion (" canActivate ") ya que solo regresa un booleano
  }

}
