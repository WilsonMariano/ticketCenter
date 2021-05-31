import { TicketSelectComponent } from './ticket-select.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [TicketSelectComponent],
  imports: [
    CommonModule
  ],
  exports: [
    TicketSelectComponent
  ]
})
export class TicketSelectModule { }
