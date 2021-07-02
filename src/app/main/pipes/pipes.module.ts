import { DayOfWeek } from './dayOfWeek';
import { MinutePipe } from './minute.pipe';
import { JoinPipe } from './join.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    JoinPipe,
    MinutePipe,
    DayOfWeek
  ],
  imports: [
    CommonModule
  ],
  exports: [
    JoinPipe,
    MinutePipe,
    DayOfWeek
  ]
})
export class PipesModule { }
