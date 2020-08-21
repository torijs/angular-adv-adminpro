import { Component, OnInit } from '@angular/core';

// Servicios
import {FileUploadService} from '../../services/file-upload.service';
import { ModalImagenService } from '../../services/modal-imagen.service';

// SweetAlert
import Swal from 'sweetalert2'


@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: File; // Para aqui guardar la imagen que vamoa subir.
  public imgTemp: any = null; // para la imagen previa que vamos a mostrar.

  constructor(public modalImagenService: ModalImagenService, private fileUploadService: FileUploadService) {
  }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen(file: File){
    console.log(file);
    this.imagenSubir = file; // Aqui asignamos el archivo a la variable y tambien nos servira para poder

    if (!file){return this.imgTemp = null; } // Si no hay imagenes no se ejecutara lo demas

    const reader = new FileReader(); // Propio de javascript
    reader.readAsDataURL(file); // Aqui lo convieete
    reader.onloadend = () => { this.imgTemp = reader.result } // Aqui lo asignamos para una visualizacion previa

  }


  subirImagen(){

    const tipo: any = this.modalImagenService.tipo;
    const uid = this.modalImagenService.id;

    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, uid)
    .then(( img ) => {
      this.modalImagenService.nuevaImagen.emit(img); // Yo me puedo subscribir en cual quier lugar a este observable
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡ Imagen Actualizado Exitosamente.!',
        showConfirmButton: false,
        timer: 1500
      });
      this.cerrarModal();
    });

  }
}
