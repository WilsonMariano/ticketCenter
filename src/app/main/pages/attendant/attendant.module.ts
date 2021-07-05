import { SpinnerModule } from './../../components/spinner/spinner.module';
import { ToastModule } from './../../components/toast/toast.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterModule } from './../../components/footer/footer.module';
import { NavbarModule } from './../../components/navbar/navbar.module';
import { ATTENDANT_ROUTES } from './attendant-routes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendantComponent } from './attendant.component';
import { VerifyTicketComponent } from './verify-ticket/verify-ticket.component';



@NgModule({
  declarations: [AttendantComponent, VerifyTicketComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ATTENDANT_ROUTES,
    NavbarModule,
    FooterModule,
    ToastModule,
    SpinnerModule
  ]
})
export class AttendantModule { }
