import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MovieShow } from '../classes/movieShow.class';

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

  public getOne(id: string): Observable<any> {
    return this.db.collection(this.dbpath, ref => ref.where('id', '==', id).limit(1))
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

  public deleteByIdSaloon(idSaloon: string): Promise<any> {
    return this.db.collection(this.dbpath, ref => ref.where('idSaloon', '==', idSaloon))
    .get()  
    .toPromise()
    .then(snapshot => {
      snapshot.forEach(document => 
        document.ref.delete());
    });
  }

  public delete(idMovieShow: string): Promise<any> {
    return this.db.collection(this.dbpath, ref => ref.where('id', '==', idMovieShow).limit(1))
    .get()  
    .toPromise()
    .then(snapshot => {
      snapshot.forEach(document => 
        document.ref.delete());
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

  public cancelBookedSeats(idMovieShow: string, bookedSeats: string[], remainingSeats: number): void {
    this.db.collection(this.dbpath, ref => ref.where('id', '==', idMovieShow).limit(1))
    .get()  
    .toPromise()
    .then(snapshot => {
      snapshot.forEach(document => 
        document.ref.set({ bookedSeats, remainingSeats }, {merge: true}));
    });
  }

  public create(movieShow: MovieShow): Promise<any> {
    return this.moviesRef.add({...movieShow});
  }

  public editField(idMovieShow: string, fieldName: string, fieldValue: any): void {
    this.db.collection(this.dbpath, ref => ref.where('id', '==', idMovieShow).limit(1))
    .get()  
    .toPromise()
    .then(snapshot => {
      snapshot.forEach(document => 
        document.ref.set({ [fieldName] : fieldValue }, {merge: true}));
    });
  }
}
