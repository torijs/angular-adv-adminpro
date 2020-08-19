import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  public titulo: string;
  public tituloSubs$: Subscription; // Para indicar que un Subscription

  constructor(private router: Router) {
    // Nos subscribimos al observable para poder utilizarlo.
    this.tituloSubs$ = this.getArgumentosRuta().subscribe(({ titulo }) => {// Aqui estamos utilizando la destructuracion
      this.titulo = titulo; // asigamos el valor.
      document.title = `AdminPro - ${titulo}`; // AQui es donde le ponemos el titulo en la pestaña de arriba.
    });
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe(); // Lo destruimos ya que un observable siempre se sigue ejecuntado infinitamente.
  }

  ngOnInit(): void {}

  getArgumentosRuta() {
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd), // Hacemos la comparacion de que event sea instanceof ActivationEnd.
      filter((event: ActivationEnd) => event.snapshot.firstChild === null), //  aqui solo paso el event.snapshot.firstChild === null
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
}

/* el ("this.router.events") es un observable que emite eventos. En este caso tenemos que acceder al ActivationEnd para poder
acceder a la data y extraer el nombre de el componete para visualizarlo, en a linea 29 donde inicia la funcion empezamos a acceder
pero es mucha la informacion que se nos presenta y para eso utilizamos el "filter", para poder filtrar la informacion y solo
y solo regresar el valor o los datos que nos interesan, que en el primer filter que ocupamos es para poder separar todos los
que sea de tipo ( instanceof " ActivationEnd " ) propio de javasCript, en el segundo filter solo paso (event.snapshot.firstChild === null)
y es el que contiene la data de la ruta hija, por ultimo utilizamos el map para retornar solo la data y ahi termina la funcion
en la linea 33. */
