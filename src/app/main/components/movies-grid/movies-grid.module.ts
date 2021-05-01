import { SpinnerModule } from './../spinner/spinner.module';
import { MoviesGridComponent } from './movies-grid.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MoviesGridComponent],
  imports: [
    CommonModule,
    FormsModule,
    SpinnerModule
  ],
  exports: [
    MoviesGridComponent
  ]
})
export class MoviesGridModule { }
