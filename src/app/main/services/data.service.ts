import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cinema } from '../classes/cinema.class';
import { User } from '../classes/user.class';

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

    constructor() {
        this.cinemaSelected = new BehaviorSubject<string>('0');
        this.cinemaSelected$ = this.cinemaSelected.asObservable();

        this.currentUser = new BehaviorSubject<User>(null);
        this.currentUser$ = this.currentUser.asObservable();

        this.isLogged = new BehaviorSubject<Boolean>(false);
        this.isLogged$ = this.isLogged.asObservable();
    }
}
