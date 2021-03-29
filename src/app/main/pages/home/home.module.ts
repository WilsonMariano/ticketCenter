import { FooterModule } from './../../components/footer/footer.module';
import { MoviesGridModule } from './../../components/movies-grid/movies-grid.module';
import { MoviesSliderModule } from './../../components/movies-slider/movies-slider.module';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    MoviesSliderModule,
    MoviesGridModule,
    FooterModule,
    CommonModule
  ]
})
export class HomeModule { }
