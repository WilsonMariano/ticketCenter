import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private dataService: DataService) { }

  public createUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  public login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password);
                    
  }

  public logout(): void {
    this.auth.signOut().then(() => {
      this.dataService.userLogged.next(false);
    }).catch((error) => {
      // An error happened.
    });
  }

  public getUserToken(){ 
    var user = firebase.auth().currentUser
    return JSON.parse(JSON.stringify(user)).stsTokenManager.accessToken
  }

}
