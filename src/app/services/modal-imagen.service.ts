/* Este servicio es creado para poder manejar el modal desde aqui asi poder reutilizar toda la logica
y el servicio en general */

import { Injectable, EventEmitter } from '@angular/core';

// Vaiables globales
import {environment} from '../../environments/environment';

// Ruta para el servidor local
const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class ModalImagenService{

    private _ocultarModal: boolean = true;
    public tipo: string;
    public id: string;
    public img: string;


    public nuevaImagen: EventEmitter<string> = new EventEmitter<string>(); // Me puedo subscribir a el en cual quier lugar.

    get OcultarModal() {
        return this._ocultarModal;
    }

    // En donde sea que se abra el modal se tiene que mandar algunos argumentos que son obligatorios
    abrilModal(tipo: 'usuarios' | 'medicos' | 'hospitales', id: string, img: string = 'no-img'){
        this._ocultarModal = false;
        this.tipo = tipo;
        this.id = id;

        if (img.includes('https')){ // Si tiene una imagen de google asi se deja nadamas
            this.img = img;
        }else{ // Sino se sigue todo el proceso
            this.img =  `${base_url}/uploads/${tipo}/${img}`;
        }


    }

    cerrarModal(){
        this._ocultarModal = true;
    }

    constructor(){
    }

}
