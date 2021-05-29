import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { loginRoute, registerRoute, searchRoute } from '../shared/constants';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {


  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.auth.userObservable.pipe(
      map(user => {
        if (user == null) {
          this.router.navigateByUrl('/' + loginRoute)
          return false
        }
        return true
      }
      )
    )

  }

}
