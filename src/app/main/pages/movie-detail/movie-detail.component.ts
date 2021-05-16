import { Movie } from './../../classes/movie.class';
import { MoviesService } from './../../services/movies.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  public movie: Movie;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    const idMovie = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(idMovie);
    this.getMovie(idMovie);
  }

  private getMovie(idMovie: number): void {
    this.spinner.show();
    this.moviesService.getOne(idMovie).subscribe(
      res => {
        if(res.length === 1) {
          this.movie = res[0];
          console.log(this.movie);
        } 
        setTimeout(() => this.spinner.hide(), 1000);
      }
    )
  }

}
