import { MoviesGridComponent } from './movies-grid.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [MoviesGridComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MoviesGridComponent
  ]
})
export class MoviesGridModule { }
