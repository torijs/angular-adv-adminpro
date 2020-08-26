import {Injectable} from '@angular/core';

// Http
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';


// Ruta para el servidor local
const base_url = environment.base_url;

// modelos
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

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

    /* Aqui los aue  hacemos es tranformar un simple resultado en un objeto de tipo Hospital
        para poder utilizar los metodo que tiene dentro ese modelo. Aunque aqui ya no es necesario ya que no ocupamos
        un pipe para mostrar la imagen*/
        private transformarHospitales(resultados: any[]): Hospital[]{
            const hospitales = resultados.map( hospital => new Hospital(hospital.nombre, hospital._id, hospital.img, hospital.usuario));
            return hospitales; // Aqui mandamos el resultado pero en forma de objetos Usuario.
        }

        private transformarMedicos(resultados: any[]): Medico[]{
            const medicos = resultados.map( medico => new Medico(medico.nombre, medico._id, medico.img, medico.usuario, medico.hospital));
            return medicos; // Aqui mandamos el resultado pero en forma de objetos Usuario.
        }

    buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string = ''){

        const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
        return this.http.get<any[]>(`${url}`, this.headers)
        .pipe(
            map( (resp: any) => {

                switch (tipo){
                    case 'usuarios':
                        return this.transformarUsuarios(resp.data);
                    case 'hospitales':
                            return this.transformarHospitales(resp.data);
                    case 'medicos':
                            return this.transformarMedicos(resp.data);
                    default:
                        return [];
                };
            })
        );
    }
}
