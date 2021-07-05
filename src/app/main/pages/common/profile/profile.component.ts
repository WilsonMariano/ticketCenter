import { PdfService } from './../../../services/pdf.service';
import { EState, Reservation } from './../../../classes/reservation';
import { TransactionService } from './../../../services/transactions.service';
import { EIcon, FxGlobalsService } from '../../../services/fx-globals.service';
import { UsersService } from '../../../services/users.service';
import { CinemasService } from '../../../services/cinemas.service';
import { Cinema } from '../../../classes/cinema.class';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../classes/user.class';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MoviesShowService } from 'src/app/main/services/movieShow.service';
import { MovieShow } from 'src/app/main/classes/movieShow.class';
declare const QRCode;
declare const $;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: User;
  public cinemas: Cinema[];
  public transactions: Reservation[];
  public formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UsersService,
    private cinemasService: CinemasService,
    private transactionsService: TransactionService,
    private movieShowService: MoviesShowService,
    private fxGlobalService: FxGlobalsService,
    private pdfService: PdfService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUserData();
    console.log({user: this.user});
    this.formGroup = this.fb.group({
      'name': [{value: this.user.name, disabled: true}],
      'surname': [{value: this.user.surname, disabled: true}],
      'document': [{value: this.user.document, disabled: true}],
      'email': [{value: this.user.email, disabled: true}],
      'cinemaPreference': ['']
    });
    this.getCinemas();
    this.getTransactions();
  }

  private getCinemas(): void {
    this.fxGlobalService.showSpinner();
    this.cinemasService.getAll().subscribe(
      res => {
        this.cinemas = res;
        this.fxGlobalService.hideSpinner();
      });
  }

  public editUser(): void {
    this.fxGlobalService.showSpinner();
    this.userService.edit(this.formGroup.getRawValue());
    this.fxGlobalService.hideSpinner();
    this.fxGlobalService.showAlert('Perfecto', 'Usuario editado con éxito', EIcon.success);
  
  }

  public getTransactions(): void {
    this.transactionsService.getAllByUser(this.user.email).subscribe(
      res => {this.transactions = res}
    );
  }

  public getSeatsLength(index: number): number {
    return this.transactions[index].seats.length;
  }

  public downloadTickets(transaction: Reservation): void {
    const qrcode = new QRCode("qr_code", {
	    text: "###REPLACE MEEEE###",
	    width: 128,
	    height: 128,
	    colorDark : "#000000",
	    colorLight : "#ffffff",
	    correctLevel : QRCode.CorrectLevel.H
	  });

    setTimeout(() => {
      const base64Image = $('#qr_code img').attr('src');
      this.pdfService.generatePdf(transaction, base64Image);
    
    }, 200);
  }

  public isCancellable(transaction: Reservation): boolean {

    const show = transaction.movieShow;
    const date = this.fxGlobalService.dateInverter(show.date);
    const dateTime = moment(`${date} ${show.time}`);

    const diff = dateTime.diff(moment(), 'minutes');

    return diff > 120;
  }

  public async orderRepayment(transaction: Reservation): Promise<void> {
    console.log({transaction});
    const resp = await this.fxGlobalService.showAlertConfirm('Confirmar cancelación', '¿Está seguro de anular la operación?', EIcon.warning);
    
    if(resp) {

      const subscription = this.movieShowService.getOne(transaction.movieShow.id).subscribe(
        (res: MovieShow[]) => {
          const show = res[0];

          // Convierto seats del movie show de firebase a array
          const bookedSeats = [];
          for(let i = 0; i < Object.keys(show.bookedSeats).length; i++) {
            bookedSeats.push(show.bookedSeats[i]);
          }

          // Convierto seats de la transacción de firebase a array
          const transactionSeats = [];
          for(let i = 0; i < Object.keys(transaction.seats).length; i++) {
            transactionSeats.push(transaction.seats[i]);
          }

          console.log({bookedSeats, transactionSeats});
          
          transactionSeats.map(seat => {
            const index = bookedSeats.findIndex(s => s === seat);
            bookedSeats.splice(index, 1);
          });

          this.movieShowService.cancelBookedSeats(transaction.movieShow.id, bookedSeats, show.remainingSeats + transactionSeats.length);
      });

       subscription.unsubscribe(); 

      this.transactionsService.changeState(transaction.id, EState.Canceled);
      this.fxGlobalService.showAlert('Perfecto!', 'La transacción ha sido cancelada. El dinero será reintegrado por el mismo medio que se realizó la compra.', EIcon.success);
    }
  }

}
