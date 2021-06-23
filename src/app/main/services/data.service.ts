import { AuthService } from './auth.service';
import { Reservation } from './../classes/reservation';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../classes/user.class';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {

    public cinemaSelected: BehaviorSubject<string>;
    public cinemaSelected$: Observable<string>;
    public currentUser: BehaviorSubject<User>;
    public currentUser$: Observable<User>;
    public isLogged: BehaviorSubject<Boolean>;
    public isLogged$: Observable<Boolean>;
    public trxCountDown: BehaviorSubject<string>;
    public trxCountDown$: Observable<string>;
    private timerDuration = environment.timerDuration; 

    public reservation: Reservation;

    constructor(private authService: AuthService) {
        this.cinemaSelected = new BehaviorSubject<string>('0');
        this.cinemaSelected$ = this.cinemaSelected.asObservable();

        this.trxCountDown = new BehaviorSubject<string>(this.timerDuration);
        this.trxCountDown$ = this.trxCountDown.asObservable();

        this.currentUser = new BehaviorSubject<User>(this.authService.getUserData());
        this.currentUser$ = this.currentUser.asObservable();

        this.isLogged = new BehaviorSubject<Boolean>(this.authService.getUserData() ? true : false);
        this.isLogged$ = this.isLogged.asObservable();
    }
}
