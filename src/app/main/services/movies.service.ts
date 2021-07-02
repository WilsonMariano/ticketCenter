import { Observable } from 'rxjs';
import { Movie } from './../classes/movie.class';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private dbpath: string = 'movies';
  public moviesRef: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.moviesRef = db.collection(this.dbpath);
   }

  public getAll(): any {
    return this.moviesRef.valueChanges();
  }

  public getOne(id: string): any {
    return this.db.collection(this.dbpath, ref => ref.where('id', '==', id).limit(1))
      .valueChanges();
  }

  public getAllByCinema(idCinema: string): Observable<any> {
    return this.db.collection(this.dbpath, ref => ref.where('cinemas', 'array-contains', idCinema))
      .valueChanges();
  }

  public create(movie: Movie): any {
    return this.moviesRef.add({...movie});
  }
}
