import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { loginRoute, searchRoute } from '../shared/constants';
import { User } from '../shared/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: User|null;
  public get user(): User | null{
    return this._user
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
  login(email: string, password: string) : Promise<User | null> {
    if(email==="email@email.hu"&&password==="12345678"){
      this._user={userId:email, companyName:email}
      return Promise.resolve(this.user)
    }else return Promise.resolve(null)
  }
  logout() {
    this._user=null;
  }
  

  constructor() { }
}
