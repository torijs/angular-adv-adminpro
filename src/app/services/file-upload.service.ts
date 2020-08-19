import { Injectable } from '@angular/core';

/* En este caso para subir las imagenes vamos a utilizar el fetch API que es todo lo propio de javascript,
no vamos a ocupar nada del http de angular, aunque tambien se puede hacer si uno asi lo desea, pero esta es
una forma de hacerlo, y siempre es bueno saber hacer las cosas de varias formas*/

import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

import Swal from 'sweetalert2';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})

export class FileUploadService {
    constructor(private http: HttpClient) {
    }

    async actualizarFoto(
        archivo: File,
        tipo: 'usuarios'|'medicos'|'hospitales',
        id: string
    ){
        try{
            const url = `${base_url}/uploads/${tipo}/${id}`;
            /* const formData = new FormData() <-- Es propio de javascript(es para crear la data que yo quiero mandar por fetch)
            y es una manera de enviar informacion al backend
            mediante la petición fetch */

            const formData = new FormData();
            formData.append('imagen', archivo);

            // El fetch tambien es propio de javascript y es nos permite hacer peticiones http de una manera muy facil
            const resp = await fetch(url, {
                method: 'PUT',
                headers: {
                    'x-token': localStorage.getItem('token') || ''
                },
                body: formData
            });

            const data = await resp.json(); // Se tiene que hacer de esta forma ya que el body viene como encpsulado.

            if (data.ok){
                return data.nombreArchivo // Regresa un string con el nombre
            } else{
                console.log(data.msg);
                return false // Sino regresa un false y veremos en consola el mensage de error
            }
        }catch (error){
            console.log('Error en la petición : ', error);
        }
    }

}
