import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthSignIn, AuthSignUp } from './auth.model';
import { ToastService } from '../shared/toast.service';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../shared/firebase-auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  isLogin: boolean = false;
  isSignUp: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private firebaseAuthService: FirebaseAuthService,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
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

  signUpUser(): void {
    if (this.authForm.valid) {
      const email: string = this.authForm.value.email;
      const password: string = this.authForm.value.password;
      const returnSecureToken: boolean = true;

      this.authService
        .signUpUser(email, password, returnSecureToken)
        .subscribe({
          next: (res: AuthSignUp) => {
            this.router.navigate(['/recipes']);
            this.toastService.showSuccess(`Success!`, 'Signup successful');
            this.isSignUp = true;
          },
          error: (err: string) => {
            this.toastService.showError(err, 'Something went wrong');
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
      const returnSecureToken: boolean = true;

      this.authService.logInUser(email, password, returnSecureToken).subscribe({
        next: (res: AuthSignIn) => {
          this.isLogin = true;
          this.firebaseAuthService.getAllRecipes().subscribe();
          this.router.navigate(['/recipes']);
          this.toastService.showSuccess(
            `Welcome ${res.email}`,
            'Login successful'
          );
        },
        error: (err: string) => {
          this.toastService.showError(err, 'Something went wrong');
          this.isLogin = false;
        },
      });
    }
    this.authForm.reset();
  }
}
