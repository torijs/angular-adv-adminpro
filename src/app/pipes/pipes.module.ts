import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import {CommonModule} from '@angular/common';

@NgModule({
  imports : [CommonModule],
  declarations: [ImagenPipe],
  exports: [ImagenPipe]
})
export class PipesModule { }
