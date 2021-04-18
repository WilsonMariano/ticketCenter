import { Component, OnInit } from '@angular/core';
import { MoviesService } from './../../services/movies.service';
import { Movie } from './../../classes/movie.class';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-grid',
  templateUrl: './movies-grid.component.html',
  styleUrls: ['./movies-grid.component.scss']
})
export class MoviesGridComponent implements OnInit {

  public movies: Movie[];

  constructor(
    private router: Router,
    private moviesService: MoviesService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getMovies();
  }

  private async getMovies() {
    this.spinner.show();
    this.moviesService.getAll().subscribe(
      res => { 
        this.movies = res;
        setTimeout(() => this.spinner.hide(), 1000);
      });
  }

  public navigateToDetail(idMovie: number) {
    this.router.navigate(['movie', idMovie]);
  }
}
