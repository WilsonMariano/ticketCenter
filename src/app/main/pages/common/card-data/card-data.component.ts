import { DataService } from './../../../services/data.service';
import { FxGlobalsService } from './../../../services/fx-globals.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { 
  isValid, 
  isExpirationDateValid, 
  isSecurityCodeValid, 
} from 'creditcard.js';
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
    public dataService: DataService
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      number: ['', [Validators.required, this.cardNumberValidator]],
      name: ['', [Validators.required]],
      expiry: ['', [Validators.required]],
      cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });

    this.initCreditCard();
  }

  private initCreditCard(): void {
    new Card({
      form: document.querySelector('form'),
      container: '.card-wrapper'
  });
  }

  public finalizePurchase(): void {
    this.fx.showAlert("Excelente!", "La compra ha resultado satisfactoria, en tu perfil encontrarás la entrada para acceder a la función", "success");
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
    const number = control.value as string;
    const arrDate = number.split('/');
    const month = arrDate[0].toString().replace(' ', '');
    const year = arrDate[1].toString().replace(' ', '');

    console.log({month, year});
    // console.log(arrDate);
    if(isExpirationDateValid(arrDate[0], arrDate[1])) {
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

}
