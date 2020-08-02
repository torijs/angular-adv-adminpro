import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit{

  // Con el input le estamos indicando que recibira un valor desde el padre

  //   @Input('valor') progreso = 5; <= De esta forma podemos renombrar del otro lado lo que vamos a recibir
  @Input() progreso: number = 5;
  @Input() btnClass: string = 'btn btn-primary';

  // Creamos un output como valor de salidad que vamos a emitir,   emite  de tipo number;
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();


  ngOnInit(){
    this.btnClass = `btn ${this.btnClass}`;
  }

  onChange(nuevoValor: number){

    if (nuevoValor >= 100){
      this.progreso = 100;
    }
    else if (nuevoValor <= 0){
      this.progreso = 0;
    }
    else{
      this.progreso = nuevoValor;
    }
    this.valorSalida.emit(this.progreso);
  }


  cambiarValor(valor: number){

    if (this.progreso >= 100 && valor >= 0){
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }

    if (this.progreso <= 0 && valor < 0){
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }

    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);

  }

}
