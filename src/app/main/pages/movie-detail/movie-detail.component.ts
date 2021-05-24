import { MovieShow } from './../../classes/movieShow.class';
import { Movie } from './../../classes/movie.class';
import { MoviesService } from './../../services/movies.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FxGlobalsService } from '../../services/fx-globals.service';
import * as moment from 'moment';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  public movie: Movie;
  public selectedDate: string;
  public initialDay: string;
  public nextMovieShowsDays: string[] = [];
  private nextDaysQuantity: number = 5;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private spinner: NgxSpinnerService,
    private gFx: FxGlobalsService) { }

  ngOnInit(): void {
    const idMovie = parseInt(this.route.snapshot.paramMap.get('id'));

    this.getMovie(idMovie);
    this.setNextMovieShowsDays();
  }

  private getMovie(idMovie: number): void {
    this.spinner.show();
    this.moviesService.getOne(idMovie).subscribe(
      res => {
        if(res.length === 1) {
          this.movie = res[0];
        } 
        setTimeout(() => this.spinner.hide(), 1000);
      }
    );
  }

  private setNextMovieShowsDays(){
    const today = new Date();
    const tomorrow = new Date();

    for(let i=0;i < this.nextDaysQuantity; i++){
      tomorrow.setDate(today.getDate() + i);
      this.nextMovieShowsDays.push(this.gFx.getDayName(tomorrow) + " " + this.gFx.getDateDDMM(tomorrow));
    }
    
    // Seteo el dia de hoy por defecto
    this.setSelectedDate(this.nextMovieShowsDays[0]);
  }

  public setSelectedDate(value: string){
    this.selectedDate = value.substring(value.length -5) ;
  }

  // Devuelve las funciones de la fecha seleccionada
  public getMovieShowsByDate(): MovieShow[]  {
    const today = moment();
    const arrSelectedDate = this.selectedDate.split('/');
    const selectedDate = moment(`${today.year()}/${arrSelectedDate[1]}/${arrSelectedDate[0]}`);

    return this.movie.movieShows.filter(show => {
      const showDate = moment(`${show.date} ${show.time}`);
      
      // Si la fecha elegida es igual a la de la funcion
      // Y además la hora actual es menor a la de la función
      if (selectedDate.isSame(showDate, 'day') &&
          today < showDate) {
          return show;
       }
    });

  } 
}