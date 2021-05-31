import { TicketSelectModule } from './../../components/ticket-select/ticket-select.module';
import { PipesModule } from './../../pipes/pipes.module';
import { SpinnerModule } from './../../components/spinner/spinner.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailComponent } from './movie-detail.component';



@NgModule({
  declarations: [MovieDetailComponent],
  imports: [
    CommonModule,
    SpinnerModule,
    PipesModule,
    TicketSelectModule
  ]
})
export class MovieDetailModule { }
