import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerModule } from '../../components/spinner/spinner.module';
import { SeatSelectionComponent } from './seat-selection.component';

@NgModule({
  declarations: [SeatSelectionComponent],
  imports: [
    CommonModule,
    SpinnerModule
  ]
})
export class SeatSelectionModule { }
