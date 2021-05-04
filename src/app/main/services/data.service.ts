import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cinema } from '../classes/cinema.class';

@Injectable({
  providedIn: 'root',
})
export class DataService {

    public cinemaSelected: BehaviorSubject<number>;
    public cinemaSelected$: Observable<number>;
    
    public userLogged: BehaviorSubject<Boolean>;
    public userLogged$: Observable<Boolean>;

    constructor() {
        this.cinemaSelected = new BehaviorSubject<number>(0);
        this.cinemaSelected$ = this.cinemaSelected.asObservable();
        this.userLogged = new BehaviorSubject<Boolean>(false);
        this.userLogged$ = this.userLogged.asObservable();
    }
}
