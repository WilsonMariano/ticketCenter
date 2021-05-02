import { DataService } from './main/services/data.service';

import { FooterModule } from './main/components/footer/footer.module';
import { DatabaseModule } from './main/database/database.module';
import { NavbarModule } from './main/components/navbar/navbar.module';
import { PagesModule } from './main/pages/pages.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MoviesService } from './main/services/movies.service';
import { CinemasService } from './main/services/cinemas.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DatabaseModule,
    PagesModule,
    NavbarModule,
    FooterModule
  ],
  providers: [
    MoviesService,
    CinemasService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
