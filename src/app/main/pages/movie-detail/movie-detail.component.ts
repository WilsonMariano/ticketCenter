import { Movie } from './../../classes/movie.class';
import { MoviesService } from './../../services/movies.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FxGlobalsService } from '../../services/fx-globals.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  public movie: Movie;
  public selectedDate: String;
  public initialDay: String;
  public nextMovieShowsDays: String[] = [];
  public movieShows: String[] = [];
  private nextDaysQuantity: Number = 5;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private spinner: NgxSpinnerService,
    private gFx: FxGlobalsService) { }

  ngOnInit(): void {
    const idMovie = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(idMovie);
    this.getMovie(idMovie);
    this.setNextMovieShowsDays();
    this.selectedDate = this.gFx.getDateDDMM(new Date());
  }

  private getMovie(idMovie: number): void {
    this.spinner.show();
    this.moviesService.getOne(idMovie).subscribe(
      res => {
        if(res.length === 1) {
          this.movie = res[0];
          this.setMovieShows(res[0]);
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
  }

  // todo: La funcion debe poder prodesar por dia de la semana. Modificar los JSON
  private setMovieShows(movie: Movie){
    this.movie.movieShow.sort(function(a,b){
      return getSortableDate(a.time).getTime() - getSortableDate(b.time).getTime();
    });
    this.movie.movieShow.forEach(ms => {
      if(!this.hasBeenShowed(ms.time)){
        this.movieShows.push(ms.time + " hs : " + ms.type);
      }
    });  
  }

  /**
   * Indica si la función ya fue emitida, comparando con la hora actual
   * @param movieShowTime 
   * @returns Boolean
   */
  private hasBeenShowed(movieShowTime: string) : Boolean{
    let d = new Date();
    return (getSortableDate(movieShowTime).getTime() - d.getTime()) < 0;
  }

  private updateMovieShows(event: any){
    let myDate = event.target.value;
    this.selectedDate = myDate.substring(myDate.length -5) ;



  }

}

//****************FUNCIONES FUERA DE LA CLASE USADAS PARA CALLBACK   *************/

/**
 * A partir de un horario genera un objeto Date que pueda ser utilizado para ordenar un array.
 * @param time en formato "hh:mm"
 * @returns Objeto del tipo Date
 */
function getSortableDate(time: string) : Date{
  let d = new Date();
  d.setHours(parseInt(time.substring(0,2)));
  d.setMinutes(parseInt(time.substring(3,6)));
  return d;
}

 

