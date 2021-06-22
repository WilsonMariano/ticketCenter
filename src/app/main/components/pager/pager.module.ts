import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent } from './pager.component';
import { SpinnerModule } from '../spinner/spinner.module';



@NgModule({
  declarations: [PagerComponent],
  imports: [
    CommonModule,
    SpinnerModule
  ],
  exports: [
    PagerComponent
  ]
})
export class PagerModule { }
