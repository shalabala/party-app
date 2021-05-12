import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavModule } from './pages/nav/nav.module';
import { FooterModule } from './pages/footer/footer.module';

import { LoginModule } from './pages/login/login.module';
import { SearchPageModule } from './pages/party/searchpage/searchpage.module';

import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog'; 
import { SearchBarModule } from './pages/party/searchbar/searchbar.module';
import { RegisterModule } from './pages/register/register.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { DetailsModule } from './pages/details/details.module';

const firebaseConfig = {
  apiKey: "AIzaSyAN1kWDBWlSQa8vt9cbBDAhMYS8owF74e8",
  authDomain: "company-personnel.firebaseapp.com",
  projectId: "company-personnel",
  storageBucket: "company-personnel.appspot.com",
  messagingSenderId: "948137096278",
  appId: "1:948137096278:web:e1089f16a4de60880e37f7"
};

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
    DetailsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    RegisterModule,
    SearchBarModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [AngularFireAuth,AngularFirestore,MatDialog],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    
  }
}
