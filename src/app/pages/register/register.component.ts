import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { loginRoute } from 'src/app/shared/constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @HostListener('document:keydown.enter') onKeydownHandler() {
    this.register();
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
 
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required]),
    passwordAgain: new FormControl('', [Validators.minLength(6), Validators.required])
  });

  alertMessage = '';
  alertsList: any = {
    user:  'Hibás E-mail cím vagy jelszó.',
    server:  'A szolgáltatás nem elérhető.',
    false: ''
  };



  navToLogin(){
    this.router.navigateByUrl('/'+loginRoute)
  }

  register(): void {
    if (this.form.invalid) {
      return;
    
  }

}}
