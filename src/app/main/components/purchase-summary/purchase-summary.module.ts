import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseSummaryComponent } from './purchase-summary.component';



@NgModule({
  declarations: [PurchaseSummaryComponent],
  imports: [
    CommonModule
  ],
  exports: [
    PurchaseSummaryComponent
  ]
})
export class PurchaseSummaryModule { }
