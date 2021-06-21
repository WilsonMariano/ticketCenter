import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrxCountDownComponent } from './trx-count-down.component';
import { ToastModule } from '../toast/toast.module';



@NgModule({
  declarations: [TrxCountDownComponent],
  imports: [
    CommonModule,
    ToastModule
  ],
  exports: [
    TrxCountDownComponent
  ]
})
export class TrxCountDownModule { }
