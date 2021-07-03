import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MoviesShowService {

  private dbpath: string = 'movieShows';
  public moviesRef: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.moviesRef = db.collection(this.dbpath);
   }

  public getByMovieAndCinema(idCinema: string, idMovie): any {
    return this.db.collection(this.dbpath, ref => ref
        .where('idCinema', '==', idCinema)
        .where('idMovie', '==', idMovie))
    .valueChanges();
  }

  public editRemainingSeats(idMovieShow: string, remainingSeats: number): void {
    this.db.collection(this.dbpath, ref => ref.where('id', '==', idMovieShow).limit(1))
    .get()  
    .toPromise()
    .then(snapshot => {
      snapshot.forEach(document => 
        document.ref.set({ remainingSeats }, {merge: true}));
    });
  }

  public editField(idMovieShow: string, fieldName: string,  fieldValue: any): void {
    this.db.collection(this.dbpath, ref => ref.where('id', '==', idMovieShow).limit(1))
    .get()  
    .toPromise()
    .then(snapshot => {
      snapshot.forEach(document => 
        document.ref.set({ [fieldName] : fieldValue }, {merge: true}));
    });
  }
}
