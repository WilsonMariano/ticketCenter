import { PdfService } from './../../../services/pdf.service';
import { IState, Reservation } from './../../../classes/reservation';
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
declare const QRCode;
declare const $;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private user: User;
  public cinemas: Cinema[];
  public transactions: Reservation[];
  public formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UsersService,
    private cinemasService: CinemasService,
    private transactionsService: TransactionService,
    private fxGlobalService: FxGlobalsService,
    private pdfService: PdfService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUserData();
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
    this.transactionsService.getAllByUser('mgw009@gmail.com').subscribe(
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
      this.transactionsService.changeState(transaction.id, IState.Canceled);
      this.fxGlobalService.showAlert('Perfecto!', 'La transacción ha sido cancelada. El dinero será reintegrado por el mismo medio que se realizó la compra.', EIcon.success);
    }
  }

}
