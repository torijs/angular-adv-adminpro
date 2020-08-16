import { Component, OnInit, NgZone} from '@angular/core';
import {Router} from '@angular/router';

// Google
declare const gapi: any;

// Formulario
import { FormBuilder, Validators } from '@angular/forms';

// Servicios
import { UsuarioService } from '../../services/usuario.service';

// SweetAlert2
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  // Google
  public auth2: any;

  public formSubmitted = false;


  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  });


  constructor(private router: Router, private fb: FormBuilder, private usuarioService: UsuarioService,
    private ngZone: NgZone) { }
  ngOnInit(): void {
    this.renderButton();
  }


  login(){ // En este caso haremos la validacion de un forma diferente a la que hicimos en el de registro

  console.log(this.loginForm.value);

  this.usuarioService.login(this.loginForm.value)
  .subscribe( (resp: any) => {
    console.log('COMPONENTE: ', resp);

    if (this.loginForm.get('remember').value){
      localStorage.setItem('email', this.loginForm.get('email').value)
    }else{
      localStorage.removeItem('email');
    }
    this.router.navigateByUrl('/dashboard');
  },
  (error) => {
    console.warn(error);
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: `¡ ${error.error.msg} !`,
      showConfirmButton: false,
      timer: 1500
    });
  })
  }


  // Las siguientes 3 funciones no las proporciona google para poder utilizar su api

  renderButton() { // Renderizar el boton de google
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
    this.startApp();
  }

  async startApp() {

      await this.usuarioService.googleInit();
      this.auth2 = this.usuarioService.auth2; // Aqui ya esta inicizalizado gracias al await y el servicio
      this.attachSignin(document.getElementById('my-signin2'));

  };

  attachSignin(element){
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          const id_token = googleUser.getAuthResponse().id_token;
          console.log(id_token);
          this.usuarioService.loginGoogle(id_token).
          subscribe((resp) => {
            this.ngZone.run( () => {
              this.router.navigateByUrl('/dashboard');
            })
          });

        }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }


}
/*  *** ngZone???
Si nos vamos a la linea en donde se encuentra la funcion nos damos cuenta que arriba de el se encuentra llamado una
funcion externa a la de angular que en este archivo se trata de una funcion para poder hacer login con el api de Google,
cuando angular ejecuta esa funcion externa de Google, pierde por unos segundo el control sobre el ciclo de vida de la
aplicacion y es asi que al ejecutar una linea donde nos manda a otro componente este no se ejecuta bien, y es necesario
la ejecucion de la funcion ngZone para que adentro de ella ejejcutemos codigo de angular y no haya problemas */
