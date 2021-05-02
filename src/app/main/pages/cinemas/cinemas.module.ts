import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CinemasComponent } from './cinemas.component';
import { SpinnerModule } from '../../components/spinner/spinner.module';

@NgModule({
  declarations: [CinemasComponent],
  imports: [
    CommonModule,
    SpinnerModule
  ]
})
export class CinemasModule { }
