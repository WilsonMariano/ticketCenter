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
}
