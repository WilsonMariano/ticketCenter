import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrxCountDownComponent } from './trx-count-down.component';



@NgModule({
  declarations: [TrxCountDownComponent],
  imports: [
    CommonModule
  ],
  exports: [
    TrxCountDownComponent
  ]
})
export class TrxCountDownModule { }
