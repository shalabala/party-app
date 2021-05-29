import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { searchRoute } from '../shared/constants';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate() {
    return this.auth.userObservable.pipe(
      map(user => {
        if (user != null) {
          this.router.navigateByUrl('/' + searchRoute)
          return false
        }
        return true
      })
    )

  }
}
