import { Cinema } from 'src/app/main/classes/cinema.class';
import { CinemasService } from './../../../services/cinemas.service';
import { MoviesService } from './../../../services/movies.service';
import { Saloon } from 'src/app/main/classes/saloon.class';
import { Movie } from './../../../classes/movie.class';
import { AuthService } from './../../../services/auth.service';
import { MoviesShowService } from 'src/app/main/services/movieShow.service';
import { MovieShow } from 'src/app/main/classes/movieShow.class';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-abm-movie-shows',
  templateUrl: './abm-movie-shows.component.html',
  styleUrls: ['./abm-movie-shows.component.scss']
})
export class AbmMovieShowsComponent implements OnInit {

  public movieShows: MovieShow[];
  private movies: Movie[];
  private saloons: Saloon[];
  public pagedMovieShowsItems: MovieShow[];

  constructor(
    private router: Router,
    private movieShowService: MoviesShowService,
    private movieService: MoviesService,
    private cinemasService: CinemasService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getAllMovieShows();
    this.getAllMovies();
    this.getAllSaloons();
  }

  private getAllMovieShows(): void {
    this.movieShowService.getByCinema(this.authService.getUserData().idCinema).subscribe(
      (res: MovieShow[]) => this.movieShows = res
    );
  }

  private getAllMovies(): void {
    this.movieService.getAllByCinema(this.authService.getUserData().idCinema).subscribe(
      (res: Movie[]) => this.movies = res
    );
  }

  private getAllSaloons(): void {
    this.cinemasService.getOne(this.authService.getUserData().idCinema).subscribe(
      (res: Cinema[]) => this.saloons = res[0].saloons
    );
  }

  public getMovieName(idMovie: string): string {
    return this.movies.find(m => m.id === idMovie).title;
  }

  public getSaloonNumber(idSaloon: string): number {
    return this.saloons.find(s => s.id === idSaloon).number;
  }

  public navigateTo(url: string): void {
    this.router.navigate([url]);
  }

  public pageChanged(data: any){
    this.pagedMovieShowsItems = data;
  }

}
