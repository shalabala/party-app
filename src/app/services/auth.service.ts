import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { loginRoute, searchRoute } from '../shared/constants';
import { User } from '../shared/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth) { }
  
  private _user: User|null;
  public get user(): User{
    //return this.fireAuth.user
    return {userId: "Asd", companyName: "asd"}
  }

  navigateToLoginPageIfUserNotLoggedIn(router: Router) {
    if(this.user===null){
      router.navigateByUrl('/'+loginRoute)
    }
  }
  navigateToMainPageIfUserLoggedIn(router : Router){
    if(this.user!==null){
      router.navigateByUrl('/'+searchRoute)
    }
  }
  login(email: string, password: string){
    return this.fireAuth.signInWithEmailAndPassword(email,password)
  }
  logout() {
    this.fireAuth.signOut()
  }
  

}
