import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cinema } from '../classes/cinema.class';

@Injectable({
  providedIn: 'root',
})
export class DataService {

    public cinemaSelected: BehaviorSubject<number>;
    public cinemaSelected$: Observable<number>;

    constructor() {
        this.cinemaSelected = new BehaviorSubject<number>(0);
        this.cinemaSelected$ = this.cinemaSelected.asObservable();
    }
}
