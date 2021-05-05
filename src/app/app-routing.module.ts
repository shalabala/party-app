import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HierarchyPageComponent } from './pages/party/hierarchy-page/hierarchy-page.component';
import { SearchPageComponent } from './pages/party/searchpage/searchpage.component';
import { RegisterComponent } from './pages/register/register.component';
import { coworkerHierarchyRoute, loginRoute, registerRoute, searchRoute } from './shared/constants';

const routes: Routes = [
  {path: loginRoute, component: LoginComponent},
  {path: searchRoute, component: SearchPageComponent},
  {path: registerRoute, component: RegisterComponent},
  {path: coworkerHierarchyRoute, component: HierarchyPageComponent},
  {path: '', redirectTo: searchRoute,pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
