import { MovieDetailComponent } from './main/pages/movie-detail/movie-detail.component';
import { HomeComponent } from './main/pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './main/pages/movies/movies.component';
import { CinemasComponent } from './main/pages/cinemas/cinemas.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'movie/:{id}', component: MovieDetailComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'cinemas', component: CinemasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
