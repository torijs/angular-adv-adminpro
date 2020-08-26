import {Injectable} from '@angular/core';

// Http
import {HttpClient} from '@angular/common/http';

// Vaiables globales
import {environment} from '../../environments/environment';

// Ruta para el servidor local
const base_url = environment.base_url;

// Modelos
import { Medico } from '../models/medico.model';

// Rxjs
import {map} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})

export class  MedicoService {

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

    constructor(private http: HttpClient){

    }

    cargarMedicos(){
        const url = `${base_url}/medicos`;
        return this.http.get(`${url}`, this.headers)
        .pipe( // En la siguiente linea definimos lo que vamos a mandar del otro lado.
            map( (resp: {ok: boolean, msg: string, medicosDB: Medico[]}) => {
                return resp.medicosDB;
            })
        )
    }

    getMedicoById(id: string){
        const url = `${base_url}/medicos/${id}`;
        return this.http.get(`${url}`, this.headers)
        .pipe( // En la siguiente linea definimos lo que vamos a mandar del otro lado.
            map( (resp: {ok: boolean, medico: Medico}) => {
                console.log(resp.medico);
                return resp.medico;
            })
        )
    }

    crearMedico(medico: {nombre: string, hospital: string}){
        console.log('Estos son los datos mandados : ', medico);
        const url = `${base_url}/medicos`;
        return this.http.post(`${url}`, medico, this.headers);
    }

    actualizarMedico(medico: Medico){
        const url = `${base_url}/medicos`;
        return this.http.put(`${url}/${medico._id}`, medico, this.headers);
    }

    borrarMedico(_id: string){
        const url = `${base_url}/medicos`;
        return this.http.delete(`${url}/${_id}`, this.headers);
    }
}
