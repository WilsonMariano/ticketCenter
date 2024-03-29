import { EIcon, FxGlobalsService } from '../../../services/fx-globals.service';
import { Cinema } from '../../../classes/cinema.class';
import { CinemasService } from '../../../services/cinemas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/main/services/movies.service';
import { Movie } from 'src/app/main/classes/movie.class';
import * as moment from 'moment';
declare var $;

@Component({
  selector: 'app-movie-data',
  templateUrl: './movie-data.component.html',
  styleUrls: ['./movie-data.component.scss']
})
export class MovieDataComponent implements OnInit {
  
  public typeOperation: string;
  public formGroup: FormGroup;
  public movie: Movie;
  public poster: string;
  public cinemas: Cinema[];
  public selectedCinemas: string[] = [];
  public customCinemaSelection: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private fxService: FxGlobalsService,
    private movieService: MoviesService,
    private cinemaService: CinemasService) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      'id': [''],
      'title': ['Movie 1', [Validators.required]],
      'overview': [''],
      'cast': [''],
      'poster': ['https://', [Validators.required]],
      'director': ['Juan José Campanella', [Validators.required]],
      'runtime': ['120', [Validators.required]],
      'startDate' : ['', [Validators.required]],
      'endDate' : ['', [Validators.required]],
    });

    const idMovie = this.route.snapshot.paramMap.get('id');

    this.cinemaService.getAll().subscribe(
      res => {
        this.cinemas = res;
        
        if(idMovie === 'nuevo') {
          this.typeOperation = 'nuevo';
          this.poster = '/assets/img/posterPlaceHolder.png';
          this.selectAllCinemas();
        } else {
          this.getMovieToEdit(idMovie);
        }
      }
    );
  }

  private getMovieToEdit(idMovie: string){
    this.movieService.getOne(idMovie).subscribe(
      data => {
        this.movie = data[0];
        this.poster = this.movie.poster;
        this.selectedCinemas = this.movie.cinemas;
        $("#rbCustomCinemas").prop("checked", true);
        this.enableCinemasSelection();
        this.formGroup.patchValue({
          ...this.movie,
          'director' : this.movie.director ?? "",
          'startDate' : moment(this.movie.startDate).format("YYYY-MM-DD"),
          'endDate' : moment(this.movie.endDate).format("YYYY-MM-DD")
        });
      }
    );
  }

  public addCinema(cinema: Cinema){
    if(this.selectedCinemas.indexOf(cinema.id) < 0)
    {
      this.selectedCinemas.push(cinema.id);
    }
  }

  public enableCinemasSelection(){
    this.customCinemaSelection = true;
    $("#dropdownCinemas").prop('disabled', false);
  }

  public selectAllCinemas(){
    this.removeAllCinemas();
    this.customCinemaSelection = false;
    this.cinemas.forEach(c => {
      this.selectedCinemas.push(c.id);
    });
  }

  public getCinemaName(cinemaId: string){
    const cinema = this.cinemas.find(c => c.id == cinemaId);

    return cinema && cinema.name;
  }

  public getSelectedCinemas(){
    const arr = [];

    this.selectedCinemas.forEach(e => {
      const cinema = this.cinemas.find(c => c.id === e);
      if(cinema) {
        arr.push(cinema.id);
      }
    });
    return arr;
  }

  public updatePosterURL(event: any){
    this.poster = event.target.value;
  }

  public removeCinema(cinemaId){
    const index = this.selectedCinemas.indexOf(cinemaId);
    if (index > -1 && this.customCinemaSelection) {
      this.selectedCinemas.splice(index, 1);
    }
  }

  public removeAllCinemas(){
    this.selectedCinemas = [];
  }

  public async submit(): Promise<void> {
    let movie = this.formGroup.getRawValue() as Movie;
    movie.cinemas = this.selectedCinemas;

    if(this.typeOperation === 'nuevo') {
      try {    
        movie.id = this.fxService.getRandomId();
        await this.movieService.create(movie);
        this.router.navigate(['admin/abm-movies']);
        this.fxService.showAlert('Perfecto!', 'La película fue creada con éxito', EIcon.success);

      } catch(e) {
        this.fxService.showAlert('Error!', 'No se pudo dar de alta la película', EIcon.error);
      }
    } else {
        try{
          await this.movieService.edit(movie);
          this.router.navigate(['admin/abm-movies']);
          this.fxService.showAlert('Perfecto!', 'La película fue editada con éxito', EIcon.success);

        } catch(e) {
          this.fxService.showAlert('Error!', 'La película no pudo ser editada, intente más tarde', EIcon.error);
        }
    }
  }
}
