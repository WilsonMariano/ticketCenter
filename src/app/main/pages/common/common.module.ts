import { NgModule } from '@angular/core';
import { CommonComponent } from './common.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProfileComponent } from './profile/profile.component';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { HomeComponent } from './home/home.component';
import { CinemasComponent } from './cinemas/cinemas.component';
import { MoviesComponent } from './movies/movies.component';

import { CinemaSelectModule } from './../../components/cinema-select/cinema-select.module';
import { PipesModule } from './../../pipes/pipes.module';
import { TicketSelectModule } from './../../components/ticket-select/ticket-select.module';
import { MoviesGridModule } from './../../components/movies-grid/movies-grid.module';
import { MoviesSliderModule } from './../../components/movies-slider/movies-slider.module';
import { SpinnerModule } from './../../components/spinner/spinner.module';
import { FooterModule } from './../../components/footer/footer.module';
import { NavbarModule } from './../../components/navbar/navbar.module';
import { COMMON_ROUTES } from './common-routes.module';
import { TrxCountDownModule } from '../../components/trx-count-down/trx-count-down.module';
import { PurchaseSummaryModule } from '../../components/purchase-summary/purchase-summary.module';



@NgModule({
  declarations: [
    HomeComponent,
    CinemasComponent,
    MoviesComponent,
    MovieDetailComponent,
    SeatSelectionComponent,
    ProfileComponent,
    CommonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarModule,
    FooterModule,
    SpinnerModule,
    MoviesSliderModule,
    MoviesGridModule,
    TicketSelectModule,
    PipesModule,
    CinemaSelectModule,
    TrxCountDownModule,
    PurchaseSummaryModule,
    COMMON_ROUTES
  ]
})
export class CommonsModule { }
