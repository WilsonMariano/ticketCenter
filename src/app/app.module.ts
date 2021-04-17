import { DatabaseModule } from './main/database/database.module';
import { NavbarModule } from './main/components/navbar/navbar.module';
import { PagesModule } from './main/pages/pages.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MoviesService } from './main/services/movies.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DatabaseModule,
    PagesModule,
    NavbarModule
  ],
  providers: [MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
