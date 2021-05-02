import { CinemaSelectComponent } from './cinema-select.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CinemaSelectComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CinemaSelectComponent
  ]
})
export class CinemaSelectModule { }
