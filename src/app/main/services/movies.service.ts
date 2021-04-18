import { Movie } from './../classes/movie.class';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private dbpath: string = 'movies';
  public moviesRef: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.moviesRef = db.collection(this.dbpath);
   }

  //  public getAll(): Promise<Movie[]> {
  //    return new Promise(resolve => {
  //     const arrMovies: Movie[] = [];
  //     this.moviesRef.snapshotChanges().subscribe(moviesSnap => {
  //       moviesSnap.forEach(movie => {
  //         const doc = movie.payload.doc;
  //         arrMovies.push({
  //           id: doc.id,
  //             title: doc.data().title,
  //             director: doc.data().director
  //         });
  //       });
  //     });
  //     resolve(arrMovies);
  //    });
  // }

  public getAll(): any {
    return this.moviesRef.valueChanges();
  }

  public create(movie): any {
    return this.moviesRef.add({...movie});
  }
}
