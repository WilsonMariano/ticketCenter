import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './movies.component';
import { SpinnerModule } from '../../components/spinner/spinner.module';



@NgModule({
  declarations: [MoviesComponent],
  imports: [
    CommonModule,
    SpinnerModule
  ]
})
export class MoviesModule { }
