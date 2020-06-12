import { HelperMethodsService } from './../../services/helper-methods.service';
import { ApiResponse } from './../../models/api-response';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators, PatternValidator } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

interface LoginResponse {
  token: string;
  user: { email: string; name: string };
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  signInForm: FormGroup;
  isLogin = true;
  userSubs: Subscription;
  emailPattern = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';

  constructor(
    private userService: UserService,
    private router: Router,
    private helperMethodsService: HelperMethodsService
  ) {}

  ngOnInit() {
    this.resetLoginForm();
  }

  changeFunction() {
    this.isLogin = !this.isLogin;
    this.isLogin ? this.resetLoginForm() : this.resetSignInForm();
  }

  resetLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl('', Validators.required),
    });
  }

  resetSignInForm() {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      passwordAgain: new FormControl('', Validators.required),
    });
  }

  login() {
    this.userSubs = this.userService.loginUser(this.loginForm.value).subscribe(
      (res: LoginResponse) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('name', res.user.name);
        localStorage.setItem('email', res.user.email);
        this.router.navigateByUrl('home');
      },
      (err) => {
        this.helperMethodsService.openSnackBar('Rossz felhasználónév és jelszó!');
      }
    );
  }

  signIn() {
    if (this.signInForm.value.password !== this.signInForm.value.passwordAgain) {
      this.helperMethodsService.openSnackBar('A két jelszónak meg kell egyeznie!');
    } else {
      delete this.signInForm.value.passwordAgain;
      this.userSubs = this.userService.createUser(this.signInForm.value).subscribe(
        (res: ApiResponse) => {
          this.helperMethodsService.openSnackBar('Sikeres regisztráció!');
          setTimeout(() => {
            this.changeFunction();
          }, 500);
        },
        (err) => {
          if (err.status === 409) {
            this.helperMethodsService.openSnackBar('Ilyen email című felhasználó már létezik!');
          } else {
            this.helperMethodsService.openSnackBar('Valami hiba történt');
            console.error(err);
          }
          this.resetSignInForm();
        }
      );
    }
  }
}
