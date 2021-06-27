import { Saloon } from 'src/app/main/classes/saloon.class';
import { Observable } from 'rxjs';
import { Cinema } from './../classes/cinema.class';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CinemasService {

  private dbpath: string = 'cinemas';
  public cinemasRef: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.cinemasRef = db.collection(this.dbpath);
   }

  public getAll(): Observable<any> {
    return this.cinemasRef.valueChanges();
  }

  public getOne(id: string): Observable<any> {
    return this.db.collection(this.dbpath, ref => ref.where('id', '==', id).limit(1))
      .valueChanges();
  }

  public create(cinema: Cinema): Promise<any> {
    return this.cinemasRef.add({...cinema});
  }
  
  public edit(cinema: Cinema): Promise<any> {
    return this.db.collection(this.dbpath, ref => ref.where('id', '==', cinema.id).limit(1))
    .get()  
    .toPromise()
    .then(snapshot => {
      snapshot.forEach(document => 
        document.ref.update({ ...cinema }));
    });
  }
}