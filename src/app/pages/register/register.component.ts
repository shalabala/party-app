import { Component, HostListener, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
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
    passwordAgain: new FormControl('', [Validators.required,this.checkPasswords],)
  });

  alertMessage = '';
  

  checkPasswords(control: AbstractControl) {
    const password = control?.parent?.get('password')?.value 
    return password === control.value ? null : { notSame: true }   
  }


  navToLogin(){
    this.router.navigateByUrl('/'+loginRoute)
  }

  register(): void {
    if (this.form.invalid) {
      return;
    }
    this.authService.createUserWithEmailAndPassword(this.form.value.email,this.form.value.password)
      .then((userCredential) => {
        this.router.navigateByUrl('/'+loginRoute)
      })
      .catch((error) => {
        if(error.code=='auth/email-already-in-use'){
          this.alertMessage="Ezzel az emaillel már regisztráltak!"

        }else if(error.code=='auth/invalid-email'){
          this.alertMessage="Ezz az email nem valid!"
          
        }else{
          this.alertMessage="Valami baj történt, próbálja meg később"
        }
      });
}}
