import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { loginRoute, onLogin, onLogout, registerRoute, searchRoute } from '../shared/constants';
import { User } from '../shared/model/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth, private router: Router) {

    fireAuth.onAuthStateChanged((user) => {
      if (user) {
        this._user = {
          userId: user.uid,
          email: user.email
        }
        onLogin(this.router)
      } else {
       // this._user = null
        onLogout(this.router)
      }
    })
  }


  private _user?: User
  public get user() {
    return this._user
  }
  public get userObservable() {
    return this.fireAuth.user
  }
  public get currentUser(){
    return this.fireAuth.currentUser
  }


  login(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password)
  }
  createUserWithEmailAndPassword(email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
  }
  logout() {
    return this.fireAuth.signOut()
  }


}
