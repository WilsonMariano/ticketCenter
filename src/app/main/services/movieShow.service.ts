import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MovieShow } from '../classes/movieShow.class';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MoviesShowService {

  private dbpath: string = 'movieShows';
  public moviesRef: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.moviesRef = db.collection(this.dbpath);
   }

  public getByMovieAndCinema(idCinema: string, idMovie: string): any {
    return this.db.collection(this.dbpath, ref => ref
        .where('idCinema', '==', idCinema)
        .where('idMovie', '==', idMovie)
        .where('delete', '!=', true))
    .valueChanges();
  }

  public getByCinema(idCinema: string): Observable<any> {
    return this.db.collection(this.dbpath, ref => ref
        .where('idCinema', '==', idCinema))
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

  public deleteMovieShow(idMovieShow: string): void {
    this.db.collection(this.dbpath, ref => ref.where('id', '==', idMovieShow).limit(1))
    .get()  
    .toPromise()
    .then(snapshot => {
      snapshot.forEach(document => 
        document.ref.set({ delete: true }, {merge: true}));
    });
  }

  public editMovieShow(movieShow: MovieShow): void {
    this.db.collection(this.dbpath, ref => ref.where('id', '==', movieShow.id).limit(1))
    .get()  
    .toPromise()
    .then(snapshot => {
      snapshot.forEach(document => 
        document.ref.set({ ...movieShow }, {merge: true}));
    });
  }

  public create(movieShow: MovieShow): Promise<any> {
    return this.moviesRef.add({...movieShow});
  }
}
