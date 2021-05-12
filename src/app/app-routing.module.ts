import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './pages/details/details.component';
import { LoginComponent } from './pages/login/login.component';
import { SearchPageComponent } from './pages/party/searchpage/searchpage.component';
import { RegisterComponent } from './pages/register/register.component';
import { coworkerDetailsRoute, loginRoute, registerRoute, searchRoute } from './shared/constants';

const routes: Routes = [
  {path: loginRoute, component: LoginComponent},
  {path: searchRoute, component: SearchPageComponent},
  {path: registerRoute, component: RegisterComponent},
  {path: '', redirectTo: searchRoute,pathMatch:'full'},
  {path: coworkerDetailsRoute, component: DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
