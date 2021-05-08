import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { registerRoute, searchRoute } from 'src/app/shared/constants';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @HostListener('document:keydown.enter') onKeydownHandler() {
    this.login();
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
 
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required])
  });

  alertMessage = '';
  alertsList: any = {
    user:  'Hibás E-mail cím vagy jelszó.',
    server:  'A szolgáltatás nem elérhető.',
    false: ''
  };

  navTo(url: string): void {
    this.router.navigateByUrl(url);
  }

  navToRegister(){
    this.navTo('/'+registerRoute)
  }

  login(): void {
    if (this.form.invalid) {
      return;
    }
    this.authService.login(this.form.value.email, this.form.value.password)/*
      .then((userCredential) => {
        this.router.navigateByUrl('/'+searchRoute)        
      })*/
      .catch((error) => {
        if(error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password'){
          this.alertMessage="Rossz email vagy jelszó"
        }else{
          this.alertMessage="Valami hiba történt, kérem próbálja újra később"
        }
      });
    }

}
