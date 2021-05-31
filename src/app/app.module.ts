import { ServicesModule } from './main/services/services.module';
import { FxGlobalsService } from './main/services/fx-globals.service';
import { AuthService } from './main/services/auth.service';
import { UsersService } from './main/services/users.service';
import { DataService } from './main/services/data.service';

import { FooterModule } from './main/components/footer/footer.module';
import { DatabaseModule } from './main/database/database.module';
import { NavbarModule } from './main/components/navbar/navbar.module';
import { PagesModule } from './main/pages/pages.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


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
    FooterModule,
    ServicesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
