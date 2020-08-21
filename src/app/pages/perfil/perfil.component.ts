import { Component, OnInit } from '@angular/core';

// Formulario
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

// Modelos
import { Usuario } from 'src/app/models/usuario.model';

// Servicios
import { UsuarioService } from '../../services/usuario.service';
import {FileUploadService} from '../../services/file-upload.service';

// SweetAlert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})

export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File; // Para aqui guardar la imagen que vamoa subir.
  public imgTemp: any = null; // para la imagen previa que vamos a mostrar.

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });
  }


  actualizarPerfil(){
    console.log('Datos a guardar', this.perfilForm.value);
    this.usuarioService.actulizarPerfil(this.perfilForm.value)
    .subscribe((resp: any) => {
      console.log('Esta es la respuesta del servidor:', resp);
      const {nombre, email} = resp.usuarioActualizado;
      this.usuario.nombre = nombre;
      this.usuario.email = email;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡ Perfil Actualizado Exitosamente.!',
        showConfirmButton: false,
        timer: 1500
      })
      }, (error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title:  `${error.error.msg}`,
          showConfirmButton: false,
          timer: 1500
        })
      })
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

    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
    .then((resp) => {
      this.usuario.img = resp;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡ Imagen Actualizado Exitosamente.!',
        showConfirmButton: false,
        timer: 1500
      })
    });

  }

}
