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

  public getAll(): any {
    return this.cinemasRef.valueChanges();
  }

  public getOne(id: string): any {
    return this.db.collection(this.dbpath, ref => ref.where('id', '==', id).limit(1))
      .valueChanges();
  }

  public create(cinema: Cinema): any {
    return this.cinemasRef.add({...cinema});
  }
}