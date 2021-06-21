import { DirectivesModule } from './../../directives/directives.module';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    DirectivesModule
  ],
  exports: [NavbarComponent]
})
export class NavbarModule { }
