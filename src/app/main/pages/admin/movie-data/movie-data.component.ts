import { EIcon, FxGlobalsService } from '../../../services/fx-globals.service';
import { Cinema } from '../../../classes/cinema.class';
import { CinemasService } from '../../../services/cinemas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/main/services/movies.service';
import { Movie } from 'src/app/main/classes/movie.class';

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
      'startDate' : ['01/01/21', [Validators.required]],
      'endDate' : ['31/12/21', [Validators.required]],
    });

    const idMovie = this.route.snapshot.paramMap.get('id');

    this.cinemaService.getAll().subscribe(
      res => {
        this.cinemas = res;
        this.cinemas.forEach(c => {
          this.selectedCinemas.push(c.id);
        });
        
        if(idMovie === 'nuevo') {
          this.typeOperation = 'nuevo';
          this.poster = '/assets/img/posterPlaceHolder.png';
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
        this.formGroup.patchValue({
          ...this.movie,
          'director' : this.movie.director ?? ""
        });
      }
    );
  }

  public addCinema(cinema: Cinema){
    this.selectedCinemas.push(cinema.id);
  }

  public getCinemaName(cinemasId: string){
    return this.cinemas.find(c => c.id == cinemasId).name;
  }

  public updatePosterURL(event: any){
    this.poster = event.target.value;
  }

  public async submit(): Promise<void> {
    const movie = this.formGroup.getRawValue() as Movie;

    if(this.typeOperation === 'nuevo') {
      try {    
        movie.id = this.fxService.getRandomId();

        await this.movieService.create(movie);
        this.router.navigate(['admin/abm-movies']);
        this.fxService.showAlert('Perfecto!', 'La película fue creada con éxito', EIcon.success);
      } catch(e) {
        this.fxService.showAlert('Error!', 'No se pudo dar de alta la película', EIcon.error);
        console.log("Error: ", e);
      }
    } else {
        
        try{
          await this.movieService.edit(movie);
          this.router.navigate(['admin/abm-movies']);
          this.fxService.showAlert('Perfecto!', 'La película fue editada con éxito', EIcon.success);

        } catch(e) {
          this.fxService.showAlert('Error!', 'La película no pudo ser editada, intente más tarde', EIcon.error);
          console.log("Error: ", e);
        }
    }
  }
}
