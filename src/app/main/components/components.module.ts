import { NavbarComponent } from './navbar/navbar.component';
import { MoviesSliderComponent } from './movies-slider/movies-slider.component';
import { MoviesGridComponent } from './movies-grid/movies-grid.component';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';



@NgModule({
  declarations: [
    FooterComponent,
    MoviesGridComponent,
    MoviesSliderComponent,
    NavbarComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FooterComponent,
    MoviesGridComponent,
    MoviesSliderComponent,
    NavbarComponent
  ]
})
export class ComponentsModule { }
