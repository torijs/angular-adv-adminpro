import { Component, OnInit } from '@angular/core';

// Servicios
import { UsuarioService } from '../../services/usuario.service';

// Formulario
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

// SweetAlert2
import Swal from 'sweetalert2'

// Router
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {


  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    password2: ['', [Validators.required, Validators.minLength(3)]],
    terminos: [, [Validators.required]]
  }, {
    validators: this.passwordIguales('password', 'password2') // Esta es una validación personalizada que cramos, le
  }); // mandamos los dos nombre que queremos validadr.

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }

  crearUsuario(){
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid){
      console.log('Datos Erroneos');
      return;
    }

    // Datos correctos = crear un usuario.

    this.usuarioService.crearUsuario(this.registerForm.value).
    subscribe( (resp) => {
      console.log('Usuario creado Exitosamente');
      console.log('Respuesta del servidor : ', resp);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡ Usuario Creado !',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigateByUrl('/dashboard');
      this.registerForm.reset();
      this.formSubmitted = false;
    },
    (error) => {
      console.log('Se presento un error: ', error.error.message);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `¡ ${error.error.message} !`,
        showConfirmButton: false,
        timer: 1500
      });
    });

  }



  campoNoValido(campo: string): boolean{ // Esta funcion es para comprobar si los campos estan llenos y si ya ha sido mandado

    if (this.registerForm.get(campo).invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }

  }

  contrasenasNoValidas(){ // Esta funcion es solo para que aparesca el letrero de advertencia.

    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if ( (pass1 !== pass2) && this.formSubmitted){
      return true;
    }
    if (this.registerForm.get('password').invalid && this.formSubmitted){
      return true;
    }
    else{
      return false;
    }
  }


  aceptaTeminos(){
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }


  // Aqui es donde evitamos de que se manda los valores al poner un error
  passwordIguales(pass1Name: string, pass2Name: string){ // Aqui le pasamos los valores
  // Regresamos un funcion.
    return (formGroup: FormGroup ) => { // Aqui le tenemos que pasar las referencias

      const pass1Control = formGroup.get(pass1Name); // Aqui obtenemos el acceso a todo lo que contenga ese campo
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control.value === pass2Control.value){ // Aqui extraemos el valor y los comparamos
        pass2Control.setErrors(null); // Aqui le asiganmos pasamos el error a uno de los campos directamente
      }else{
        pass2Control.setErrors({noEsIgual : true}); // Es un objeto en el cual me dice cual es el error que esta ocurriendo ahi
      }

    }
  }


}
