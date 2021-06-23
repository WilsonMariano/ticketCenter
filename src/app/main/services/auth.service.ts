import { User } from './../classes/user.class';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { DataService } from './data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    // private dataService: DataService,
    private router: Router) { }

  public createUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  public login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  public logout(): void {
    this.auth.signOut().then(() => {
      localStorage.clear();
      this.router.navigate(['auth/login']);
    }).catch((error) => {
      // An error happened.
    });
  }

  public getUserToken(){ 
    const user = firebase.auth().currentUser;
    return JSON.parse(JSON.stringify(user)).stsTokenManager.accessToken;
  }

  public setUserData(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserData(): User {
    const user = JSON.parse(localStorage.getItem('user'));
    return user || null;
  }

}
