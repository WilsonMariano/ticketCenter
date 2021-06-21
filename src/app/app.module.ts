import { ManagerModule } from './main/pages/manager/manager.module';
import { AdminModule } from './main/pages/admin/admin.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthModule } from './main/pages/auth/auth.module';
import { CommonsModule } from './main/pages/common/common.module';
import { DatabaseModule } from './main/database/database.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AdminModule,
    AuthModule,
    ManagerModule,
    AppRoutingModule,
    CommonsModule,
    DatabaseModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
