import { Component, OnInit } from '@angular/core';


// Formulario
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// servicios
import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';

// Modelos
import { Hospital } from '../../../models/hospital.model';
import { Medico } from '../../../models/medico.model';

// rxjs

// SweetAlert2
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

// Router
import {Router, ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;

  constructor(private fb: FormBuilder, private hospitalService: HospitalService,
    private medicoService: MedicoService, private router: Router, private activatedRouted: ActivatedRoute) {
    }

  ngOnInit(): void {
    this.activatedRouted.params.subscribe( ({id}) => {
      this.cargarMedico(id);
    });
    this.medicoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      hospital: ['', [Validators.required]],
    });
    this.cargarHospitales();

    // Siguientes linea importantes, ya que es para estar al pendiente de los cambios que se realiza en la seleccion de los hospiales
    this.medicoForm.get('hospital').valueChanges // ESte es un Observable asi que podemos subscribirnos a el y estar al pendiente cambios
    .subscribe((hospitalId) => {
      this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId);
    });
  }

  cargarMedico(id: string){
    if (id === 'nuevo'){
      return ;
    }
    this.medicoService.getMedicoById(id)
    // .pipe(    En esta parte especialmente es para que le de tiempo de cargar todo los datos y asi pueda mostrar
    //   delay(100)  la imagen del hopitaL ya que lo esta haciendo muy rapido que no se carga
    // )
    .subscribe( (resp) => {
      console.log('Esta es la respuesta de la busqueda :', resp);
      if (!resp){
        return  this.router.navigateByUrl(`/dashboard/medicos`);
      }
      const {nombre, hospital: {_id}} = resp; // Extraemos el nombre y el id del hopsital por medio de la destruturación
      this.medicoSeleccionado = resp;
      this.medicoForm.setValue({nombre, hospital: _id}); // Reasignamos de nuevo los valores del formulario
      this.hospitalSeleccionado = resp.hospital; // Asignar el valor del hospital seleccionado
    }, (error) => {
      this.router.navigateByUrl(`/dashboard/medicos`);
    });
  }

  cargarHospitales(){

    this.hospitalService.cargarHospitales()
    .subscribe( (resp: Hospital[]) => {
      this.hospitales = resp;
    });

  }




  guardarDatos(){

    if (this.medicoSeleccionado){
      /* Si existe un medico seleccionado ose que mandaron un id correcto y se realizo de forma exitoso la consulta se
      tendra que actualizar el usuario y no crear */

      const data = {
        ...this.medicoForm.value, // Aqui destructuramos lo que es los datos del formulario
        _id: this.medicoSeleccionado._id
      }

      this.medicoService.actualizarMedico(data)
      .subscribe( (resp) => {
        console.log('respuesta de actualización :', resp);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `¡ Medico ${this.medicoForm.get('nombre').value} Actualizado Exitosamento !`,
          showConfirmButton: false,
          timer: 1500
        });
      })

    }else{
      /* sino se manda un id correcto, entonces no habra una consulta exitosa por lo cual el medicoSeleccionado
      Estata en null y eso quiere decir que se tiene que crear un nuevo usuario y No actualizar. */

      this.medicoService.crearMedico(this.medicoForm.value)
      .subscribe( (resp: any) => {
        console.log('Respuesta servicio creado :', resp);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `¡ Medico ${resp.medicoDB.nombre} Creado Exitosamento !`,
          showConfirmButton: false,
          timer: 1500
        });
        this.medicoForm.reset();
        this.router.navigateByUrl(`/dashboard/medico/${resp.medicoDB._id}`);
      });
    }
  }


}
