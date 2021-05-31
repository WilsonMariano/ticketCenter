import { RegisterComponent } from './main/pages/register/register.component';
import { MovieDetailComponent } from './main/pages/movie-detail/movie-detail.component';
import { HomeComponent } from './main/pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './main/pages/movies/movies.component';
import { CinemasComponent } from './main/pages/cinemas/cinemas.component';
import { ProfileComponent } from './main/pages/profile/profile.component';
import { LoginComponent } from './main/pages/login/login.component';
import { SeatSelectionComponent } from './main/pages/seat-selection/seat-selection.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'cinemas', component: CinemasComponent },
  { path: 'seat-selection/:movieShowId', component: SeatSelectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
