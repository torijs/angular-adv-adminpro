import {Injectable} from '@angular/core';

//  Http
import {HttpClient} from '@angular/common/http';

// Modelos
import { Hospital } from '../models/hospital.model';

// Ruta para el servidor local
import {environment} from '../../environments/environment';
const base_url = environment.base_url;

// Router

// Rxjs
import {map} from 'rxjs/operators';

// Interfaces


@Injectable({
    providedIn: 'root'
})

export class HospitalService{

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

    constructor(private http: HttpClient){}


    cargarHospitales(){
        const url = `${base_url}/hospitales`;
        return this.http.get(`${url}`, this.headers)
        .pipe( // En la siguiente linea definimos lo que vamos a mandar del otro lado.
            map( (resp: {ok: boolean, hospitalesDB: Hospital[]}) => {
                return resp.hospitalesDB;
            })
        )
    }

    crearHospitale(nombre: string){
        const url = `${base_url}/hospitales`;
        return this.http.post(`${url}`, {nombre}, this.headers);
    }

    actualizarHospitale( _id: string, nombre: string){
        const url = `${base_url}/hospitales`;
        return this.http.put(`${url}/${_id}`, {nombre}, this.headers);
    }

    borrarHospitales(_id: string){
        const url = `${base_url}/hospitales`;
        return this.http.delete(`${url}/${_id}`, this.headers);
    }

}
