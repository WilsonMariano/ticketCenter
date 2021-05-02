import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  public createUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  public login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  public logout(): void {
    this.auth.signOut();
  }
}
