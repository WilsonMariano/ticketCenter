import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cinema } from 'src/app/main/classes/cinema.class';
import { Movie } from 'src/app/main/classes/movie.class';
import { CinemasService } from 'src/app/main/services/cinemas.service';
import { MoviesService } from 'src/app/main/services/movies.service';
declare const $;

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  private cinemas: Cinema[];
  public movies: Movie[];
  public pagedMoviesItems: Movie[];
  public detailPoster: string;

  constructor(
    private router: Router,
    private moviesService: MoviesService,
    private cinemasService: CinemasService
  ) { }

  ngOnInit(): void {
    this.moviesService.getAll().subscribe(
      res => {
        this.movies = res;
        this.cinemasService.getAll().subscribe(r => this.cinemas = r);
      });
  }

  public navigateTo(url: string): void {
    this.router.navigate([url]);
  }

  /**
   * Handler para el output del paginado. Actualiza los items de mi array
   * @param data 
   */
  public pageChanged(data: any){
    this.pagedMoviesItems = data;
  }

  public setDetailPoster(poster: string){
    this.detailPoster = poster;
  }

  public getCinemasNames(cinemasIds: string[]){
    let result = [];
    cinemasIds.forEach(id => {
      result.push(this.cinemas.find(c => c.id == id).name);
    });
    return result;
  }
}
