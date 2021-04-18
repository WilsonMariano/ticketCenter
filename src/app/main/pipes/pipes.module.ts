import { MinutePipe } from './minute.pipe';
import { JoinPipe } from './join.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    JoinPipe,
    MinutePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    JoinPipe,
    MinutePipe
  ]
})
export class PipesModule { }
