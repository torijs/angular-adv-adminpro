import { Component, OnInit, OnDestroy } from '@angular/core';

// Servicios
import { HospitalService } from '../../../services/hospital.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';

// Modelos
import { Hospital } from '../../../models/hospital.model';

// sweetAlert2
import Swal from 'sweetalert2';

// rxjs
import { delay} from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit , OnDestroy{

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;

  public imgSubs: Subscription; // Para eliminar la subscripcion ya que sino se sigue ejecutando indefinidamente

  public hospitalesTemp: Hospital[] = [];


  constructor(private hospitalService: HospitalService, public modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.nuevaImagen // Nos susbcribimos para poder utilizarlo
    .pipe(
      delay(100)
    )
    .subscribe(
      (img) => {
        this.cargarHospitales();
      }
    );
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarHospitales(){
    this.cargando = true;
    this.hospitalService.cargarHospitales()
    .subscribe( (hospitales: Hospital[]) => {
      console.log('Esta es la respuesta del lado del servidor : ', hospitales);
      this.hospitales = hospitales;
      this.cargando = false;
      this.hospitalesTemp = hospitales;
    })
  }

  guardarCambios(hospital: Hospital){
    console.log('Este es el hospital que se modificara : ', hospital);
    this.hospitalService.actualizarHospitale(hospital._id, hospital.nombre)
    .subscribe( (resp: any) => {
      console.log(resp);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡ Hospital Actualizado Exitosamente !',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  eliminarHospital(hospital: Hospital){
    console.log('Este es el hospital que se Eliminara : ', hospital);
    this.hospitalService.borrarHospitales(hospital._id)
    .subscribe( (resp) => {
      // Para poder eliminar de la vista el hospital tenemos varias opciones una de ella es recargar los hospitales
      // Otra opcion seria eliminar el hospital que se encuentra dentro del arreglo de hospitales
      this.cargarHospitales();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡ Hospital Eliminado Exitosamente !',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  async abrirSweetAlert(){
    const {value = ''} = await Swal.fire<string>({
      title: 'Crear Hospital',
      text : 'Ingrese el nombre del nuevo Hospital',
      input: 'text',
      showCancelButton: true,
      inputPlaceholder: 'Nombre del Hospital'
    });
    // método trim( ) elimina los espacios en blanco en ambos extremos del string
    if (value.trim().length > 0){
      this.hospitalService.crearHospitale(value)
      .subscribe( (resp: any) => {
        console.log(resp);
        this.hospitales.push(resp.hospitalDB);
        // this.cargarHospitales();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡ Hospital Creado Exitosamente !',
          showConfirmButton: false,
          timer: 1500
        });
      });
    }
  }

  abrirModal(hospital: Hospital){
    this.modalImagenService.abrilModal('hospitales', hospital._id, hospital.img);
  }

  buscar(termino: string) {
    if (termino.length === 0){
      return   this.hospitales = this.hospitalesTemp;
    }

    this.busquedasService.buscar('hospitales', termino)
      .subscribe( (resultados: Hospital[]) => {
        console.log('Respuesta del servidor :', resultados);
        this.hospitales = resultados;
      })

  }

}
