import { RouterModule } from '@angular/router';
import { FooterModule } from './../../components/footer/footer.module';
import { NavbarModule } from './../../components/navbar/navbar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { CinemasComponent } from './cinemas/cinemas.component';
import { ADMIN_ROUTES } from './admin-routes.module';



@NgModule({
  declarations: [
    AdminComponent, 
    CinemasComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NavbarModule,
    FooterModule,
    ADMIN_ROUTES
  ]
})
export class AdminModule { }
