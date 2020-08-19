import { Injectable, NgZone} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment'; // Este es nuestro archivo donde tenemos nuestro varibales globales
import { tap, map, catchError } from 'rxjs/operators';

// Ruta para el servidor local
const base_url = environment.base_url;
declare const gapi: any;  // Google

// interfaces
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';

// Router
import {Router} from '@angular/router';

// Modelos
import {Usuario} from '../models/usuario.model';

@Injectable({
    providedIn: 'root'
})

export class UsuarioService {

    public auth2: any; // Google
    public usuario: Usuario; /* Aqui se guarda los datos del usuario que se logea internamente, y se pueden acceder a ell
    desde cualquier lado, solo llamando el servicio, y ya se podra acceder a los datos almacenados que se
    guardaron cuando se logio el usuaio */

    constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
        this.googleInit();
    }

    get token(): string{
        return localStorage.getItem('token') || '';
    }
    get uid(): string{
        return this.usuario.uid || '';
    }

    // Esta funcion le especificamos lo que tiene que regresar para poder ocuparlo en el guard.
    validaToken(): Observable <boolean>{ // Aqui utilizamos el servicio para verificar de que el token sea correcto, se manda por headers

        return this.http.get(`${base_url}/login/renew`, {
            headers: { // Aqui mandamos el token en el header y se especifica de la siguiente manera
                'x-token': this.token
            }
        }).pipe( // Aqui lo pasamo por el pipe para poder filtrarlo.
            map( (resp: any) => {
                /* aqui hay que instanciar el usuario para poder utilizar sus metodo que tiene adentro y no solo asignarlo*/
                const {email, google, nombre, role, img = '', uid} = resp.usuario; // <-- Destructurando el usuario
                this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
                localStorage.setItem('token', resp.token);
                return true
            }),
            catchError( (error) => of(false)) // Se tiene que manejar el error de afuerza
        );
    }

    crearUsuario(formData: RegisterForm) {

        return this.http.post(`${base_url}/usuarios`, formData).pipe(
            tap( (resp: any) => {
                localStorage.setItem('token', resp.token);
            })
        );
    }

    // La sigueinte linea es una forma se definir lo que se recibira de un dato, para evitar definir un interfacez
    actulizarUsuario(data: {email: string, nombre: string, role: string}){
        data = {
            ...data,
            role: this.usuario.role
        }
        return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
            headers: {
                'x-token': this.token
            }
        });
    }


    login(formData: LoginForm) {
        return this.http.post(`${base_url}/login`, formData).pipe(
            tap( (resp: any) => {
                localStorage.setItem('token', resp.token);
            })
        );

    }

    loginGoogle(token) {
        return this.http.post(`${base_url}/login/google`, {token}).pipe(
            tap( (resp: any) => {
                localStorage.setItem('token', resp.token);
            })
        );
    }

    logout(){
        localStorage.removeItem('token');
        this.auth2.signOut().then( () => { // Una vez inicializado el servicio de google hacemos el logout
            this.ngZone.run( () => { // ngzone para que pueda ejecutar librerias externas a la de angular
                this.router.navigateByUrl('/login'); // para que se pueda ejecutar esta linea de comando.
            })
        });
    }

    googleInit(){ // Esta funcion lo ocupamos solo para poder inicializar el servicio de google.

        return new Promise( (resolve, reject) => {
            console.log('Google Init JTS');
            gapi.load('auth2', () => {
                this.auth2 = gapi.auth2.init({
                client_id: '539293446231-7bdgv02pa4qhkthpbasjd92klkm8r1l9.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                });
                resolve();
            });
        });

    }


}

