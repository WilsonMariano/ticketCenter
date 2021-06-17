import { Observable } from 'rxjs';
import { Reservation } from './../classes/reservation';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private dbpath: string = 'transactions';
  private transactionRef: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.transactionRef = db.collection(this.dbpath);
  }

  public create(reservation: Reservation): Promise<any> {
    const jsObject = {
      ...reservation,
      movieShow: {
        ...reservation.movieShow,
      },
      cinema: {
        ...reservation.cinema,
      },
    };

    return this.transactionRef.add({ ...jsObject });
  }

  public getAllByUser(email: string): Observable<any> {
    return this.db.collection(this.dbpath, ref => ref.where('user', '==', email))
      .valueChanges();
  }
}
