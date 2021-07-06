import { TransactionService } from './../../../services/transactions.service';
import { AuthService } from './../../../services/auth.service';
import { DataService } from './../../../services/data.service';
import { EIcon, FxGlobalsService } from './../../../services/fx-globals.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { 
  isValid, 
  isExpirationDateValid 
} from 'creditcard.js';
import { Router } from '@angular/router';
import { MoviesShowService } from 'src/app/main/services/movieShow.service';
import { EState } from 'src/app/main/classes/reservation';
declare const Card;
@Component({
  selector: 'app-card-data',
  templateUrl: './card-data.component.html',
  styleUrls: ['./card-data.component.scss']
})
export class CardDataComponent implements OnInit {

  public formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fx: FxGlobalsService,
    public dataService: DataService,
    public authService: AuthService,
    private transactionService: TransactionService,
    private movieShowService: MoviesShowService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initCreditCard();
    
    if(!this.dataService.reservation) {
      this.router.navigate(['home']);
    } else {
      this.formGroup = this.fb.group({
        number: ['', [Validators.required, this.cardNumberValidator]],
        name: ['', [Validators.required]],
        expiry: ['', [Validators.required, this.expirationDateValidator]],
        cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
        installments: ['', Validators.required]
      });
  
      if(this.dataService.reservation?.payMethod === 'DC') {
        this.formGroup.get('installments').disable();
      }
    }
  }

  private initCreditCard(): void {
    const card = new Card({
      form: document.querySelector('form'),
      container: '.card-wrapper'
  });
  console.log({card});
  }

  public async finalizePurchase(): Promise<void> {
    this.dataService.reservation.user = this.authService.getUserData().email;
    this.dataService.reservation.id = this.fx.getRandomId();
    this.dataService.reservation.state = EState.Paid;
    // Calculo cantidad de butacas restantes
    const remainingSeats = this.dataService.reservation.movieShow.remainingSeats - this.dataService.reservation.seats.length;
    
    // Actualizo la cantidad de butacas restantes de la función
    await this.movieShowService.editRemainingSeats(this.dataService.reservation.movieShow.id, remainingSeats);
    let seats = this.dataService.reservation.movieShow.bookedSeats ?? [];
    this.dataService.reservation.seats.forEach(s => {
      seats.push(s.toString());
    });
    await this.movieShowService.editField(this.dataService.reservation.movieShow.id, "bookedSeats" , seats);

    // Elimino atributo innecesarios
    delete this.dataService.reservation.movieShow.remainingSeats;

    
    try {
      // Guardo reserva
      await this.transactionService.create(this.dataService.reservation);
      this.fx.showAlert("Excelente!", "La compra ha resultado satisfactoria, en tu perfil encontrarás la entrada para acceder a la función", EIcon.success);
      this.router.navigate(['profile']);
 
    } catch(e) {
      console.log("Se produjo un error: ", e);
      this.fx.showAlert("Ups!", "Hubo un problema con la compra, intenta nuevamente en unos minutos", EIcon.error);
    }
      
  }

  private cardNumberValidator(control: AbstractControl): object | null {
    const number = control.value;
    if(isValid(number)) {
      return null;
    } else {
      return {
        invalidCard: true
      }
    }
  }

  private expirationDateValidator(control: AbstractControl): object | null {
    const date = control.value as string;
    const arrDate = date.replaceAll(' ', '').split('/');
    const [month, year] = arrDate;

    if(isExpirationDateValid(month, year)) {
      return null;
    } else {
      return {
        invalidExpiry: true
      }
    }
  }

  public keyPressCvc(event: KeyboardEvent): void {
    if(this.formGroup.get('cvc').value.length === 3) {
      event.preventDefault()
    }
  }

  public getFeeAmount(quantity: number): string {
    return (this.dataService.reservation.totalAmount / quantity).toFixed(2);
  }

}
