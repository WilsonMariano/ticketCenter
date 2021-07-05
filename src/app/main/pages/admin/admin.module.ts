import { PipesModule } from './../../pipes/pipes.module';
import { UserDataComponent } from './user-data/user-data.component';
import { CinemaDataComponent } from './cinema-data/cinema-data.component';
import { SpinnerModule } from './../../components/spinner/spinner.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminGuard } from './admin.guard';
import { RouterModule } from '@angular/router';
import { FooterModule } from './../../components/footer/footer.module';
import { NavbarModule } from './../../components/navbar/navbar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { CinemasComponent } from './cinemas/cinemas.component';
import { ADMIN_ROUTES } from './admin-routes.module';
import { UsersComponent } from './users/users.component';
import { PagerModule } from '../../components/pager/pager.module';
import { MoviesComponent } from './movies/movies.component';
import { MovieDataComponent } from './movie-data/movie-data.component';



@NgModule({
  declarations: [
    AdminComponent, 
    CinemasComponent, 
    CinemaDataComponent, 
    UsersComponent,
    UserDataComponent,
    MoviesComponent,
    MovieDataComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SpinnerModule,
    NavbarModule,
    FooterModule,
    PagerModule,
    PipesModule,
    ADMIN_ROUTES
  ],
  providers: [
    AdminGuard
  ]
})
export class AdminModule { }
