import { EIcon, FxGlobalsService } from '../../../services/fx-globals.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/main/services/movies.service';
import { Movie } from 'src/app/main/classes/movie.class';
import { CarouselService } from 'src/app/main/services/carousel.service';

declare var $;

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  public formGroup: FormGroup;
  public movies: Movie[];
  public pagedMoviesItems: Movie[];
  public detailPoster: string;
  private selectedMovies: string[] = [];
  public customMovieSelection: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private moviesService: MoviesService,
    private fx: FxGlobalsService,
    private carouselService: CarouselService
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      'selectedMovies': [''],
      'lastMovies' : [''],
      'bulletsQty': ['', [Validators.required, Validators.min(1), Validators.max(8)]],
      'interval': ['', [Validators.required, Validators.min(1), Validators.max(8)]]
    });

    this.carouselService.getAll().subscribe(
      data => {
        this.formGroup.patchValue({
          ...data[0]
        });
        this.customMovieSelection = !data[0].lastMovies;
        this.moviesService.getAll().subscribe(res => this.movies = res);
        if(this.customMovieSelection){
          setTimeout(() => this.setInitialMovies(data[0].selectedMovies), 1000);
        }
      }
    );
  }

  /**
   * Handler para el output del paginado. Actualiza los items de mi array
   * @param data 
   */
   public pageChanged(data: any){
    this.pagedMoviesItems = data;
  }

  public setInitialMovies(initialData: string[]){
    this.selectedMovies = initialData;
    this.selectedMovies.forEach(mId => {
        $("#chk" + mId).prop("checked", true);
    });
  }

  public setDetailPoster(poster: string){
    this.detailPoster = poster;
  }

  public addOrRemoveMovie(event:any, movie: Movie){
    const checked = event.target.checked as boolean;
    const exists = this.selectedMovies.some(m => m == movie.id) as boolean;
    const bulletsQty =  parseInt($("#bulletsQty").val());

    if(!exists && checked && this.selectedMovies.length < bulletsQty ){
      this.selectedMovies.push(movie.id);
    }else if(!exists && checked && this.selectedMovies.length == bulletsQty){
      this.fx.showToast("carouselConfigToast");
      $("#chk" + movie.id).prop("checked", false);
    }else if(!checked){
      this.removeMovie(movie.id);
    }
  }
  
  public enableMovieSelection(customMovieSelection: boolean){
    this.cleanSelection();
    this.customMovieSelection = customMovieSelection;
  }

  public removeMovie(movieId){
    const index = this.selectedMovies.indexOf(movieId);
    if (index > -1) {
      this.selectedMovies.splice(index, 1);
    }
  }

  public cleanSelection(){
    this.selectedMovies = [];
    $('input:checkbox').prop('checked', false);
  }

  public async submit(): Promise<void> {
    let carousel = this.formGroup.getRawValue();
    carousel.selectedMovies = this.selectedMovies;
    carousel.lastMovies = !this.customMovieSelection;

    try {    

      if(!carousel.lastMovies && carousel.selectedMovies.length == 0){
        throw new MovieQuantityError;
      }
      await this.carouselService.edit(carousel);
      this.router.navigate(['/home']);
      this.fx.showAlert('Perfecto!', 'La configuración se guardó con éxito', EIcon.success);

    } catch(e: any) {
      if(e instanceof MovieQuantityError ){
        this.fx.showAlert('Error!', e.message, EIcon.error);
      }else{
        this.fx.showAlert('Error!', 'No se pudo guardar la información', EIcon.error);
      }
      console.log("Error: ", e);
    }
  }
}

export class MovieQuantityError extends Error{
   public  message: string = "Debe seleccionar al menos una película";
}
