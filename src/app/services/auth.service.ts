import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { loginRoute, mainPage, registerRoute, searchRoute } from '../shared/constants';
import { User } from '../shared/model/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth, private router: Router) {
    fireAuth.onAuthStateChanged((user)=>{
      if(user){
        this._user={
          userId:user.uid,
          email:user.email
        }
        if(router.url.endsWith(loginRoute)||router.url.endsWith(registerRoute)){
          router.navigateByUrl('/'+mainPage)
        }
      }else{
        this._user=null
        if(!(router.url.endsWith(loginRoute)||router.url.endsWith(registerRoute))){
          router.navigateByUrl('/'+loginRoute)
        }
      }
    })
   }
  
  private _user?:User 
  public get user(){
    return this._user
  }
 
  login(email: string, password: string){
    return this.fireAuth.signInWithEmailAndPassword(email,password)
  }
  createUserWithEmailAndPassword(email: string, password: string){
    return this.fireAuth.createUserWithEmailAndPassword(email,password)
  }
  logout() {
    return this.fireAuth.signOut()
  }
  

}
