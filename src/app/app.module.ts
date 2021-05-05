import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavModule } from './pages/nav/nav.module';
import { FooterModule } from './pages/footer/footer.module';

import { LoginModule } from './pages/login/login.module';
import { SearchPageModule } from './pages/party/searchpage/searchpage.module';
import { SearchBarComponent } from './pages/party/searchbar/searchbar.component';
import { SearchBarModule } from './pages/party/searchbar/searchbar.module';
import { RegisterModule } from './pages/register/register.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavModule,
    LoginModule,
    FooterModule,
    SearchPageModule,
    RegisterModule,
    SearchBarModule,
    
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
