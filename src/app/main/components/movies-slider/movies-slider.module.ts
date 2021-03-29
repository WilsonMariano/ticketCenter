import { MoviesSliderComponent } from './movies-slider.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [MoviesSliderComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MoviesSliderComponent
  ]
})
export class MoviesSliderModule { }
