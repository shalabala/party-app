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
    this.authService.login(this.form.value.email, this.form.value.password).then(
      result => {
        if(result!==null){
          this.navTo('/'+searchRoute)
        }else{
          this.alertMessage=this.alertsList.user
        }
      },(error)=>{
        console.log(error)
      }
    );
  }

}
