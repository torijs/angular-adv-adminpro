import { Component, OnInit, OnDestroy } from '@angular/core';

// Servicios
import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

// Modelos
import { Usuario } from '../../../models/usuario.model';

// txjs
import {delay} from 'rxjs/operators';

// sweetAlert2
import Swal from 'sweetalert2';

// rxjs
import { Subscription } from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy{

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [] ;
  public desde: number = 0;
  public cargando: boolean = true;
  public usuariosTemp: Usuario[] = [];

  public imgSubs: Subscription; // Para eliminar la subscripcion ya que sino se sigue ejecutando indefinidamente

  public temporalMedidor: number = 1;

  constructor(private usuarioService: UsuarioService, private busquedasService: BusquedasService,
    public modalImagenService: ModalImagenService) { }


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    /* this.imgSubs = this.modalImagenService.nuevaImagen // Nos susbcribimos para poder utilizarlo
    .subscribe(
      (respuestaEmitido: any) => {
        const isLargeNumber = (element) => element.uid === respuestaEmitido.uid;
        const indice = this.usuarios.findIndex(isLargeNumber)
        this.usuarios[indice].img = respuestaEmitido.img;
      }
    ) */

    this.imgSubs = this.modalImagenService.nuevaImagen // Nos susbcribimos para poder utilizarlo
    .pipe(
      delay(100)
    )
    .subscribe(
      (img) => {
        this.cargarUsuarios();
      }
    );
  }


  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuario(this.desde)
    .subscribe( ({total, usuarios}) => { // Utilizamos la destructuración ya que del otro lado definimos que es lo que regresa
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.cargando = false;
    })
  }


  cambiarPagina(valor: number){
    this.desde += valor;

    if (this.desde < 0){
      this.desde = 0;
    }else if (this.desde >= this.totalUsuarios){
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar(termino: string) {
    if (termino.length === 0){
      return   this.usuarios = this.usuariosTemp;
    }

    this.busquedasService.buscar('usuarios', termino)
      .subscribe( (resultados: Usuario[]) => {
        console.log('Respuesta del servidor :', resultados);
        this.usuarios = resultados;
      })

  }

  eliminarUsuario(usuario: Usuario){

    if (usuario.uid === this.usuarioService.uid){ // Cuando se trate eliminar a si mismo
      return   Swal.fire({
        position: 'center',
        icon: 'error',
        title: '¡ No puede eliminarse a si mismo !',
        showConfirmButton: false,
        timer: 1500
      });
    }

    Swal.fire({
      title: '¿ Borrar Usuario ?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar '
    }).then((result) => {
      if (result.value) {
        this.usuarioService.eliminarUsuario(usuario)
        .subscribe( (resp) => {
          console.log('Elimiado respuesta : ', resp );
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡ Usuario Eliminado Exitosamente !',
            showConfirmButton: false,
            timer: 1500
          })
          this.cargarUsuarios();
        })
      }
    })
  }

  cambiarRole(usuario: Usuario){
    this.usuarioService.guardarUsuario(usuario).
    subscribe( (resp) => {
      console.log(resp);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡ Role de Usuario Actualizado !',
        showConfirmButton: false,
        timer: 1500
      });
    },
    (error) => {
      console.log(error);
    })
  }

  abrirModal(usuario: Usuario){
    this.modalImagenService.abrilModal('usuarios', usuario.uid, usuario.img);
  }

}

