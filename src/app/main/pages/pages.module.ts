import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { MovieDetailModule } from './movie-detail/movie-detail.module';
import { MoviesModule } from './movies/movies.module';
import { CinemasModule } from './cinemas/cinemas.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    MovieDetailModule,
    MoviesModule,
    CinemasModule
  ]
})
export class PagesModule { }
