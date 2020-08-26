import { Component, OnDestroy, OnInit } from '@angular/core';


// servicios
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';

// Modelos
import { Medico } from '../../../models/medico.model';

// Rxjs
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

// sweetAlert2
import Swal from 'sweetalert2';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {


  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription; // Para eliminar la subscripcion ya que sino se sigue ejecutando indefinidamente

  constructor(private medicoService: MedicoService, private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.nuevaImagen // Nos susbcribimos para poder utilizarlo
    .pipe(
      delay(100)
    )
    .subscribe(
      (img) => {
        this.cargarMedicos();
      }
    );
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarMedicos(){
    this.cargando = true;
    this.medicoService.cargarMedicos()
    .subscribe( (resp: Medico[]) => {
      console.log('Servicio de carga de medicos : ', resp);
      this.medicos = resp;
      this.medicosTemp = resp;
      this.cargando = false;
    })
  }


  abrirModal(medico: Medico){
    this.modalImagenService.abrilModal('medicos', medico._id, medico.img);
    console.log('medico.img', medico.img);
    this.cargarMedicos();
  }

  buscar(termino: string) {
    if (termino.length === 0){
      return   this.medicos = this.medicosTemp;
    }

    this.busquedasService.buscar('medicos', termino)
      .subscribe( (resultados: Medico[]) => {
        console.log('Respuesta del servidor :', resultados);
        this.medicos = resultados;
      })

  }

  borrarMedico(medico: Medico){
    Swal.fire({
      title: '¿ Borrar Medico ?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar '
    }).then((result) => {
      if (result.value) {
        this.medicoService.borrarMedico(medico._id)
        .subscribe( (resp) => {
          console.log('Elimiado respuesta : ', resp );
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡ Usuario Eliminado Exitosamente !',
            showConfirmButton: false,
            timer: 1500
          })
          this.cargarMedicos();
        })
      }
    })

  }

}
