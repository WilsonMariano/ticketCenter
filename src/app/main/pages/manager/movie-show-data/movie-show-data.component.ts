import { MovieShowDataService } from './movie-show-data.service';
import { Saloon } from 'src/app/main/classes/saloon.class';
import { EIcon, FxGlobalsService } from './../../../services/fx-globals.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CinemasService } from './../../../services/cinemas.service';
import { AuthService } from './../../../services/auth.service';
import { MoviesShowService } from './../../../services/movieShow.service';
import { MoviesService } from './../../../services/movies.service';
import { Movie } from './../../../classes/movie.class';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MovieShow } from 'src/app/main/classes/movieShow.class';

@Component({
  selector: 'app-movie-show-data',
  templateUrl: './movie-show-data.component.html',
  styleUrls: ['./movie-show-data.component.scss']
})
export class MovieShowDataComponent implements OnInit {

  public daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']; 
  public selectedDay: number = 0;
  public movie: Movie;
  public saloons: Saloon[] = [];
  private movieShows: MovieShow[];
  public filteredMovieShows: MovieShow[] = [];
  public formGroup: FormGroup;
  public movieShowEdit: MovieShow;

  constructor(
    private route: ActivatedRoute,
    private movieService: MoviesService,
    private movieShowService: MoviesShowService,
    private cinemaService: CinemasService,
    private authService: AuthService,
    private fxService: FxGlobalsService,
    private movieShowDataService: MovieShowDataService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    const idMovie = this.route.snapshot.paramMap.get('id');    
    this.getMovie(idMovie);
    this.getMovieShows(idMovie);
    this.getSaloons();

    this.formGroup = this.fb.group({
      'time': ['', Validators.required],
      'type': ['', Validators.required],
      'saloon': ['', Validators.required]
    });
    this.formGroup.get('saloon').disable();
  }

  private getMovie(idMovie: string): void {
    this.movieService.getOne(idMovie).subscribe(
      res => this.movie = res[0]
    );
  }

  private getMovieShows(idMovie: string): void {
    this.movieShowService.getByMovieAndCinema(this.authService.getUserData().idCinema, idMovie).subscribe(
      res => {
        this.movieShows = res;
        this.filterMovieShowsByDay();
      });
  }

  private getSaloons(): void {
    this.cinemaService.getOne(this.authService.getUserData().idCinema).subscribe(
      res => this.saloons = res[0].saloons
    );
  }

  public changeDay(index: number): void {
    this.selectedDay = index;
    this.filterMovieShowsByDay();
  }

  private filterMovieShowsByDay(): void {
    this.filteredMovieShows = this.movieShows.filter(m => m.day === this.selectedDay);
  }

  public getSaloonById(id: string): Saloon {
    return this.saloons.find(s => s.id === id);
  }

  public changeType(): void {
    this.formGroup.get('saloon').enable();
  }

  public getSaloonsByType(): Saloon[] {
    const type = this.formGroup.get('type').value.split(' ')[0];
    return this.saloons.filter(s => s.type === type);
  }

  public async addMovieShow(): Promise<void> {
    const movieShow = new MovieShow();
    movieShow.time = this.formGroup.get('time').value;
    movieShow.type = this.formGroup.get('type').value;
    movieShow.idSaloon = this.formGroup.get('saloon').value;
    movieShow.idMovie = this.movie.id;
    movieShow.day = this.selectedDay;
    movieShow.idCinema = this.authService.getUserData().idCinema;
    movieShow.id = this.fxService.getRandomId();
    movieShow.remainingSeats = this.getSaloonById(movieShow.idSaloon).seats;

    const isVerify = await this.movieShowDataService.verifyShowTime(movieShow, this.movie);
  
    if(isVerify) {
      this.fxService.showSpinner();
      try {
        this.fxService.hideSpinner();
        await this.movieShowService.create(movieShow);
      } catch(e) {
        this.fxService.hideSpinner();
        this.fxService.showAlert('Error', 'Se produjo un error, intente más tarde', EIcon.error);
      }
    } else {
      this.fxService.showToast('movieShowDataToast');
    }
  }

  public async deleteMovieShow(id: string): Promise<void> {

    if(!await this.movieShowDataService.verifyLaterShow(id)) {
      const resp = await this.fxService.showAlertConfirm('Confirmación', '¿Está seguro de desea dar de baja esta función?', EIcon.warning)

      if(resp) {
        this.fxService.showSpinner();
        this.movieShowService.deleteMovieShow(id);
        this.fxService.showAlert('Perfecto', 'La función fue dada de baja con éxito', EIcon.success);
        this.fxService.hideSpinner();
      }
    } else {
      this.fxService.showAlert('Atención', 'Hay funciones pendientes para esta sala', EIcon.warning);
    }
  }

  public async editMovieShow(movieShow: MovieShow): Promise<void> {
    
    if(!await this.movieShowDataService.verifyLaterShow(movieShow.id)) {
      this.movieShowEdit = movieShow;
      this.formGroup.get('time').setValue(movieShow.time);
      this.formGroup.get('type').setValue(movieShow.type);
      this.formGroup.get('saloon').setValue(movieShow.idSaloon);
      this.formGroup.get('saloon').enable();
    } else {
      this.fxService.showAlert('Atención', 'Hay funciones pendientes para esta sala', EIcon.warning);
    }
  
  }

  public cancelEdit(): void {
    this.movieShowEdit = null;
    this.formGroup.get('saloon').disable();
    this.formGroup.get('time').setValue('');
    this.formGroup.get('type').setValue('');
    this.formGroup.get('saloon').setValue('');
  }

  public async confirmEdit(): Promise<void> {
    this.movieShowEdit.time = this.formGroup.get('time').value;
    this.movieShowEdit.type = this.formGroup.get('type').value;
    this.movieShowEdit.idSaloon = this.formGroup.get('saloon').value;

    const isVerify = await this.movieShowDataService.verifyShowTime(this.movieShowEdit, this.movie);

    if(isVerify) {
      this.fxService.showSpinner();
      this.movieShowService.editMovieShow(this.movieShowEdit);
      this.cancelEdit();
      
      this.fxService.hideSpinner();
      this.fxService.showAlert('Perfecto', 'Función editada con éxito', EIcon.success);
    } else {
      this.fxService.showToast('movieShowDataToast');
    }

  }

}
