import { PipesModule } from './../../pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterModule } from './../../components/footer/footer.module';
import { NavbarModule } from './../../components/navbar/navbar.module';
import { MANAGER_ROUTES } from './manager-routes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerComponent } from './manager.component';
import { AbmSaloonsComponent } from './abm-saloons/abm-saloons.component';
import { SaloonDataComponent } from './saloon-data/saloon-data.component';
import { AbmMovieShowsComponent } from './abm-movie-shows/abm-movie-shows.component';
import { PagerModule } from '../../components/pager/pager.module';



@NgModule({
  declarations: [
    ManagerComponent, 
    AbmSaloonsComponent, SaloonDataComponent, AbmMovieShowsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarModule,
    FooterModule,
    PagerModule,
    PipesModule,
    MANAGER_ROUTES
  ]
})
export class ManagerModule { }
