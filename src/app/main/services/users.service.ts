import { User } from './../classes/user.class';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

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
    
    delete user.password;
    return this.usersRef.add({ ...user });
  }
}
