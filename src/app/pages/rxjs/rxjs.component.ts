import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs'; // Hay otras opciones para crear observables
import {retry, take, map, filter} from 'rxjs/operators'; // operadores son como piezas de lego que se conectan.

// retry <-- Este operador se un utiliza comunmente en un observable, es para cuando se tiene un error en un funcion
//       para volever a tratar de ejecutar la funcion las veces que nosotros le asignemos.
// take <-- Este operador se utiliza comunmente para decirle cuantas emiciones del obsrvable necesitamos y automativamente
//     completa el observable.
// map <-- Me sirve para transformar la informacion que recibe le observalo y mutarla de la manera que yo lo necesito.
// Filter <-- Como su nombre propio lo indica, nos sirve para poder filtrar los datos antes de mandarlo a su destino

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})

export class RxjsComponent implements OnInit, OnDestroy{

  public intervalSubs: Subscription;

  constructor() {

    // this.retornaObservable().pipe(
    //   retry(2) // AQui le decimos cuantas veces queremos que lo intente si da un error.
    // )
    // .subscribe( // Esto es lo que necesita para que el observable empiece a trabajar.
    //   valor => console.log('Subs: ', valor), // se recibe los valores que emita el observable.
    //   error => console.warn('Error: ', error), // Se captura el error y se imprime
    //   ()  => console.info('obs Terminado') // AQui es donde se ejecuta una accion cuando se deja de emitir el observable.
    // );

    this.intervalSubs = this.retornaIntervalo().subscribe((valor) =>
      console.log(valor)
    );

  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe(); // Con esto dejara de esta emitiendo cuando nos cambiemos de pagina o componente, destruye el proceso.
  }

  ngOnInit(): void {
  }

  retornaIntervalo(): Observable<number>{

    // Hay que tener en cuenta las posiciones donde ponemos cade uno de los operadores, ya que influyen segun en donde se encuentre.
    return  interval(100).pipe( // interval(100) <-- dentro del parentesis se pone la velocidad en milisegundo a al cual mandara el valor.
      map( valor => valor + 1),
      filter(valor => (valor % 2 === 0 ) ? true : false) // Filter lo utilizamos para poder especificar que valores vamos a mandar o enviar
      // take(10)
    );
  }





  retornaObservable(): Observable<number> {

    let i = -1; // Esta es una variable temporal

    return  new Observable<number>(observer => {

      const intervalo = setInterval( () => { // ESta es un metodo propio de javascript para repetir ciertas acciones

        i++; // Aqui se realiza el aumento

        observer.next(i); // De esta manera se notifica el nuevo valor a la cual se esta subscrita y se emite.

        if (i === 4) {
          clearInterval(intervalo); // Esto es propio de javascript para que ya no siga repitiendose esta funcion.
          observer.complete(); // Para dejar de emiitr
        }
        if (i === 2) {
          i = 0; // Se reinicializa.
          observer.error('i Llego al valor de 2'); // ESto es lo que manda como error
        }

      }, 1000);

    });
  }

}
