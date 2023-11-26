import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthSignIn, AuthSignUp } from './auth.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  isLogin: boolean = false;
  isSignUp: boolean = false;
  public authSignIn!: AuthSignIn;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.email,
          Validators.required,
          Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ],
      ],
    });
  }

  handleSubmit(): void {
    console.log(this.authForm.value);
  }

  signUpUser(): void {
    if (this.authForm.valid) {
      const email: string = this.authForm.value.email;
      const password: string = this.authForm.value.password;
      const returnSecureToken: boolean = true;
      this.authService
        .signUpUser(email, password, returnSecureToken)
        .subscribe({
          next: (res: AuthSignUp) => {
            if (res.idToken) {
              this.isSignUp = true;
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log(err.error);
            this.isSignUp = false;
          },
        });
    }
    this.authForm.reset();
  }

  signInUser(): void {
    if (this.authForm.valid) {
      const email = this.authForm.value.email;
      const password = this.authForm.value.password;
      this.authService.signInUser(email, password).subscribe({
        next: (res: AuthSignIn) => {
          if (res.idToken) {
            this.isLogin = true;
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error);
          this.isLogin = false;
        },
      });
    }
    this.authForm.reset();
  }
}
