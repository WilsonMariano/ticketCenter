import { User } from './../classes/user.class';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private dbpath: string = 'users';
  public usersRef: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.usersRef = db.collection(this.dbpath);
  }

  public create(user: User): any {
    return this.usersRef.add({ ...user });
  }

  public edit(user: User): any {
    this.db.collection(this.dbpath, ref => ref.where('email', '==', user.email).limit(1))
    .get()  
    .toPromise()
    .then(snapshot => {
      snapshot.forEach(document => 
        document.ref.update({ ...user }));
  });
  }

  public getOneByEmail(email: string): any {
    return this.db.collection(this.dbpath, ref => ref.where('email', '==', email).limit(1))
      .valueChanges();
  }

  // public getOneByUid(uid: string): any {
  //   return this.db.collection(
  //     this.dbpath, 
  //     ref => ref.where(firebase.firestore.FieldPath.documentId(), '==', uid).limit(1))
  //     .valueChanges();
  // }
}
