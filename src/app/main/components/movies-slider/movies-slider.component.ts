import { Component, OnInit } from '@angular/core';
import { Movie } from '../../classes/movie.class';
import { CarouselService } from '../../services/carousel.service';
import { MoviesService } from '../../services/movies.service';
import * as moment from 'moment';

@Component({
  selector: 'app-movies-slider',
  templateUrl: './movies-slider.component.html',
  styleUrls: ['./movies-slider.component.scss']
})
export class MoviesSliderComponent implements OnInit {

  public carouselConfig: any;
  public bullets: string[];
  public movies: Movie[];
  public selectedMovies: Movie[];

  constructor(
    private carouselService: CarouselService,
    private movieService: MoviesService
  ) { }

  ngOnInit(): void {
    this.carouselService.getAll().subscribe(
      res => { 
        this.carouselConfig = res[0];
        this.setBulletsArray(this.carouselConfig.bulletsQty);
        if(this.carouselConfig.lastMovies){
          this.useLastMovies(this.carouselConfig.bulletsQty);
        }else{
          this.useSelectedMovies(this.carouselConfig.selectedMovies);
        }
    });
  }

  private setBulletsArray(bulletsQty: number){
    this.bullets = [...new Array(bulletsQty - 1)];
    for(let i=0 ; i < bulletsQty ; i++){
      this.bullets[i] = (i).toString();
    }
  }

  private useLastMovies(qty: number){
    this.movieService.getAll().subscribe(
      res => {
        this.movies = res;
        const sortedArray  = this.movies.sort((a,b) =>  moment(b.startDate).unix() - moment(a.startDate).unix());
        this.selectedMovies = sortedArray.slice(0, qty);
      });
  }

  private useSelectedMovies(moviesFilter: Movie[]){
    this.movieService.getAll().subscribe(
      res => {
        this.movies = res;
        this.selectedMovies = this.movies.filter(
          function(m) { 
            return !(this.indexOf(m.id) < 0); 
          }, moviesFilter );
        console.log(this.selectedMovies);
      });
  }
}
