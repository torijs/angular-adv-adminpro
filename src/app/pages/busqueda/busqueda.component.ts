import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

// Servicios
import { BusquedasService } from '../../services/busquedas.service';

// Modelas
import { Usuario } from '../../models/usuario.model';
import {Hospital} from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';

// Router
import {Router} from '@angular/router';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(private activatedRoute: ActivatedRoute, private busquedasServices: BusquedasService,
    private router: Router) {
  }


  ngOnInit(): void {
    this.busquedaGlobal();
  }

  busquedaGlobal(){
    this.activatedRoute.params.subscribe( ({termino}) => {
      this.busquedasServices.busquedaGlobal(termino)
      .subscribe( (resp: any) => {
        this.usuarios = resp.usuarios;
        this.medicos = resp.medicos;
        this.hospitales = resp.hospitales;

        console.log('usuarios :', this.usuarios);
        console.log('medicos :', this.medicos);
        console.log('hospitales :', this.hospitales);

      })
    });
  }

  abrirMedico(medico: Medico){
    console.log(medico);
    this.router.navigateByUrl(`/dashboard/medico/${medico._id}`);

  }

}
