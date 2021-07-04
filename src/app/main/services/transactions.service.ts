import { MovieShow } from 'src/app/main/classes/movieShow.class';
import { Observable } from 'rxjs';
import { IState, Reservation } from './../classes/reservation';
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
      seats: {
        ...reservation.seats
      },
      movie: {
        ...reservation.movie
      }
    };

    return this.transactionRef.add({ ...jsObject });
  }

  public getAllByUser(email: string): Observable<any> {
    return this.db.collection(this.dbpath, ref => ref.where('user', '==', email))
      .valueChanges();
  }

  public getAll(): Observable<any> {
    return this.transactionRef.valueChanges();
  }

  public changeState(idTransaction: string, state: IState): void {
    this.db.collection(this.dbpath, ref => ref.where('id', '==', idTransaction).limit(1))
    .get()  
    .toPromise()
    .then(snapshot => {
      snapshot.forEach(document => 
        document.ref.set({ state }, {merge: true}));
    });
  }
}
