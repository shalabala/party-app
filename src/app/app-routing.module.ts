import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './pages/details/details.component';
import { LoginComponent } from './pages/login/login.component';
import { SearchPageComponent } from './pages/party/searchpage/searchpage.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuardService } from './services/authguard.service';
import { LoginGuardService } from './services/login-guard.service';
import { coworkerDetailsRoute, loginRoute, registerRoute, searchRoute } from './shared/constants';

const routes: Routes = [
  {path: loginRoute, component: LoginComponent, canActivate:[LoginGuardService]},
  {path: registerRoute, component: RegisterComponent, canActivate:[LoginGuardService]},
  {path: searchRoute, component: SearchPageComponent, canActivate:[AuthGuardService]},
  {path: coworkerDetailsRoute, component: DetailsComponent, canActivate:[AuthGuardService] },
  {path: '', redirectTo: searchRoute, pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
