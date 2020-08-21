import {Injectable} from '@angular/core';

// Http
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';


// Ruta para el servidor local
const base_url = environment.base_url;

// modelos
import { Usuario } from '../models/usuario.model';

// rxjs
import {map} from 'rxjs/operators';

// rutas Globales

@Injectable({
    providedIn: 'root'
})

export class BusquedasService{
    constructor(private http: HttpClient){}


    get token(): string{
        return localStorage.getItem('token') || '';
    }


    get headers(){
        return {
            headers: {
                'x-token': this.token
            }
        }
    }

    /* Aqui los aue  hacemos es tranformar un simple resultado en un objeto de tipo Usuario
        para poder utilizar los metodo que tiene dentro ese modelo. Como por ejemplo el
        modelo que tiene para asignar imagenes */
    private transformarUsuarios(resultados: any[]): Usuario[]{
        const usuarios = resultados.map( user => new Usuario(user.nombre, user.email, '', user.img,
        user.google, user.role, user.uid));
        return usuarios; // Aqui mandamos el resultado pero en forma de objetos Usuario.
    }

    buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string = ''){

        const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
        return this.http.get<Usuario[]>(`${url}`, this.headers)
        .pipe(
            map( (resp: any) => {

                switch (tipo){
                    case 'usuarios':
                        return this.transformarUsuarios(resp.data);
                    default:
                        return [];
                }
                return ;
            })
        )
    }
}
