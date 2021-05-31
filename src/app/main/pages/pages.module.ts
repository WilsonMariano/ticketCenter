import { RegisterModule } from './register/register.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { MovieDetailModule } from './movie-detail/movie-detail.module';
import { MoviesModule } from './movies/movies.module';
import { LoginModule } from './login/login.module';
import { CinemasModule } from './cinemas/cinemas.module';
import { ProfileModule } from './profile/profile.module';
import { SeatSelectionModule } from './seat-selection/seat-selection.module';


@NgModule({
  imports: [
    CommonModule,
    HomeModule,
    MovieDetailModule,
    MoviesModule,
    CinemasModule,
    RegisterModule,
    ProfileModule,
    LoginModule,
    SeatSelectionModule
  ]
})
export class PagesModule { }
