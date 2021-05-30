import { MovieShow } from './../../classes/movieShow.class';
import { Movie } from './../../classes/movie.class';
import { MoviesService } from './../../services/movies.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FxGlobalsService } from '../../services/fx-globals.service';
import * as moment from 'moment';
import 'moment/min/locales';
import { transpileModule } from 'typescript';
const movieShowDateFormat = "dddd DD/MM";

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
  private nextDaysQuantity: number = 4;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private spinner: NgxSpinnerService,
    private gFx: FxGlobalsService) { }

  ngOnInit(): void {
    moment.updateLocale('es', { weekdays : 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_') });
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
    this.nextMovieShowsDays.push(moment().locale("Es").format(movieShowDateFormat));
    let tomorrow = moment();
    for(let i=0;i < this.nextDaysQuantity; i++){
      tomorrow.add(1, 'days').calendar();    
      this.nextMovieShowsDays.push(tomorrow.locale("Es").format(movieShowDateFormat));
    }
    
    // Seteo el dia de hoy por defecto
    this.setSelectedDate(this.nextMovieShowsDays[0]);
  }

  public setSelectedDate(value: string){
    this.selectedDate = value.substring(value.length -5) ;
  }
  
  /**
   * Filtra las funciones disponibles según el día seleccionado y la fecha fin de proyección de la película
   * @returns array de funciones de cine
   */
  public getMovieShowsByDate(): MovieShow[]{
    const now = moment();
    const arrSelectedDate = this.selectedDate.split('/');
    const selectedDate = moment(`${now.year()}/${arrSelectedDate[1]}/${arrSelectedDate[0]}`);
    const movieEndDate = moment(this.movie.endDate);

    if(movieEndDate >= selectedDate){
      return this.movie.movieShows.filter(show => {
        const showTime = moment();
        const [hs, min] = show.time.split(':');
        showTime.set({ hours:parseInt(hs), minutes: parseInt(min) });
  
        if (selectedDate.day() == show.day) {
          return show.day == now.day() ? now < showTime : true;
        }
      });
    }
  } 
}