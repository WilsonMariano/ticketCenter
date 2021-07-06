import { Subscription } from 'rxjs';
import { AuthService } from './../../../services/auth.service';
import { EState, Reservation } from './../../../classes/reservation';
import { FxGlobalsService } from './../../../services/fx-globals.service';
import { TransactionService } from './../../../services/transactions.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
declare const bootstrap;

@Component({
  selector: 'app-verify-ticket',
  templateUrl: './verify-ticket.component.html',
  styleUrls: ['./verify-ticket.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class VerifyTicketComponent implements OnInit {

  public formGroup: FormGroup;
  public toastMessage: string;
  public reservation: Reservation;
  private subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private fxService: FxGlobalsService,
    private authService: AuthService,
    private transactionService: TransactionService
    ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      'code': ['', Validators.required]
    });
  }

  public verifyTicket(): void {
    this.fxService.showSpinner();
    const code = this.formGroup.get('code').value;
    this.subscription = this.transactionService.getOne(code).subscribe(
      (reservation: Reservation[]) => {
        if(reservation.length === 0) {
          this.toastMessage = 'No se encontró ninguna entrada con el código ingresado';
          this.fxService.showToast('verifyTicketToast');
          this.fxService.hideSpinner();
          return;
        }

        if(reservation[0].cinema.id !== this.authService.getUserData().idCinema) {
          this.toastMessage = 'El ticket ingresado corresponde a otra sucursal';
          this.fxService.showToast('verifyTicketToast');
          this.fxService.hideSpinner();
          return;
        }

        if(reservation[0].state === EState.Canceled) {
          this.toastMessage = 'El ticket ingresado ha sido cancelado';
          this.fxService.showToast('verifyTicketToast');
          this.fxService.hideSpinner();
          return;
        }

        if(reservation[0].state === EState.Used) {
          this.toastMessage = 'El ticket ingresado ya ha sido utilizado';
          this.fxService.showToast('verifyTicketToast');
          this.fxService.hideSpinner();
          return;
        }

        this.reservation = reservation[0];

        const arrSeats = [];
        for(let i = 0 ; i < Object.keys(this.reservation.seats).length; i++) {
          arrSeats.push(this.reservation.seats[i]);
        }
        this.reservation.seats = arrSeats;

        console.log({reservation: this.reservation});

        const modal = new bootstrap.Modal(document.getElementById('modalVerifyTicket'), {
          keyboard: false
        });

        this.fxService.hideSpinner();
        this.formGroup.reset();
        modal.show();

        this.subscription.unsubscribe();
        this.transactionService.changeState(this.reservation.id, EState.Used);
      }
    )
  }

  // public changeState(): void {
  //   this.subscription.unsubscribe();
  //   this.transactionService.changeState(this.reservation.id, EState.Used);
  // }

  public getSeat(seat: string): string {
    return seat.replace('_', '');
  }

}
