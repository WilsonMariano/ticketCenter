import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { MovieDetailModule } from './movie-detail/movie-detail.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    MovieDetailModule
  ]
})
export class PagesModule { }
