import { EIcon, FxGlobalsService } from '../../../services/fx-globals.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/main/services/movies.service';
import { Movie } from 'src/app/main/classes/movie.class';

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
    private fx: FxGlobalsService
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      'id': [''],
      'bulletsQty': ['3', [Validators.required, Validators.min(1), Validators.max(8)]],
      'interval': ['5', [Validators.required, Validators.min(1), Validators.max(8)]]
    });

    this.moviesService.getAll().subscribe(
      res => {
        this.movies = res;
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

  public setDetailPoster(poster: string){
    this.detailPoster = poster;
  }

  public addOrRemoveMovie(event:any, movie: Movie){
    const checked = event.target.checked as boolean;
    const exists = this.selectedMovies.indexOf(movie.id) >= 0 as boolean;
    const bulletsQty =  parseInt($("#bulletsQty").val());

    // TODO: revisar logica
    if(!exists && this.selectedMovies.length < bulletsQty && checked){
      this.selectedMovies.push(movie.id);
    }else if(exists && this.selectedMovies.length == bulletsQty){
      this.fx.showToast("carouselConfigToast");
      $("#chk" + movie.id).prop("checked", false);
    }else if(!checked){
      this.removeMovie(movie.id);
    }
    console.log(this.selectedMovies);
  }
  
  public enableMovieSelection(customMovieSelection: boolean){
    this.customMovieSelection = customMovieSelection;
  }

  public removeMovie(movieId){
    const index = this.selectedMovies.indexOf(movieId);
    if (index > -1) {
      this.selectedMovies.splice(index, 1);
    }
  }

  public async submit(): Promise<void> {
  }
}
