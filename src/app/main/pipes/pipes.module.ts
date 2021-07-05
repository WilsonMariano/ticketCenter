import { ProfilePipe } from './profile.pipe';
import { DayOfWeekPipe } from './dayOfWeek.pipe';
import { MinutePipe } from './minute.pipe';
import { JoinPipe } from './join.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    JoinPipe,
    MinutePipe,
    DayOfWeekPipe,
    ProfilePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    JoinPipe,
    MinutePipe,
    DayOfWeekPipe,
    ProfilePipe
  ]
})
export class PipesModule { }
