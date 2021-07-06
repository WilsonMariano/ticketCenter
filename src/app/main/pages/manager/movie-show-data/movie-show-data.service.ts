import { Reservation } from './../../../classes/reservation';
import { TransactionService } from './../../../services/transactions.service';
import { MovieShow } from './../../../classes/movieShow.class';
import { AuthService } from './../../../services/auth.service';
import { Movie } from './../../../classes/movie.class';
import { MoviesShowService } from './../../../services/movieShow.service';
import { MoviesService } from './../../../services/movies.service';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MovieShowDataService {

  private movies: Movie[];
  private movieShows: MovieShow[];

  constructor(
    private movieService: MoviesService,
    private movieShowService: MoviesShowService,
    private transactionService: TransactionService,
    private authService: AuthService
  ) { 
    this.getAllMovies();
    this.getAllMovieShows();
  }

  private getAllMovies(): void {
    this.movieService.getAll().subscribe(
      res => this.movies = res
    )
  }

  private getAllMovieShows(): void {
    this.movieShowService.getByCinema(this.authService.getUserData().idCinema).subscribe(
      res => this.movieShows = res
    );
  }

  // Verifica que no haya funciones en el horario elegido
  public verifyShowTime(show: MovieShow, movie: Movie): Promise<boolean> {
    return new Promise(resolve => {
      // Calculo la fecha desde y hasta que se proyecta la pelicula
      const timeFromShow = moment(show.time, 'HH:mm');
      const timeToShow = moment(show.time, 'HH:mm').add(movie.runtime, 'minutes');

      // Obtengo las funciones del dia y la sala
      const movieShowsDay = this.movieShows.filter(m => (m.day === show.day && m.idSaloon === show.idSaloon));

      movieShowsDay.forEach(ms => {

        if(ms.id === show.id) {
          return;
        }

        // Obtengo la pelicula de la función;
        const movie = this.movies.find(m => m.id === ms.idMovie);

        const timeFrom = moment(ms.time, 'HH:mm');
        const timeTo = moment(ms.time, 'HH:mm').add(movie.runtime, 'minutes');

        // Si el horario de la función coincide con otra función ya existente
        if((timeFromShow >= timeFrom && timeFromShow <= timeTo) ||
          (timeToShow >= timeFrom && timeToShow <= timeTo)) {
            resolve(false);
        } 
      });
      resolve(true);
    });
  }

    // Verifica que no haya funciones posteriores para la sala a editar
    public verifyLaterShow(idMovieShow: string): Promise<boolean> {
      return new Promise(resolve => {
        this.transactionService.getAll().subscribe(
          (res: Reservation[]) => {
            const transactions = res.filter(t => {
              if(t.movieShow.id === idMovieShow) {
                const movieShowDate = moment(`${t.movieShow.date} ${t.movieShow.time}`, 'DD-MM-YYYY HH:mm');
                  return movieShowDate.diff(moment()) > 0 && t;
              }
            });
            if(transactions.length != 0) {
              resolve(true);
            } else {
              resolve(false);
            }
          });
      });
    }

}
