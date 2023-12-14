import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';

import { ToastService } from '../shared/toast.service';

import * as fromRootReducer from '../store/app.root-reducer';
import * as AuthActions from './store/auth.action';

import { handleError } from './store/auth.effects';

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
    private toastService: ToastService,
    private store: Store<fromRootReducer.AppState>
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

      //dispatching signup action and passing email, password, returnSecureToken
      this.store.dispatch(
        new AuthActions.SignupStart({
          email: email,
          password: password,
          returnSecureToken: returnSecureToken,
        })
      );

      this.store.select('auth').subscribe((authState) => {
        if (!authState.loginError?.error) {
          //this.router.navigate(['/auth']);
          this.toastService.showSuccess(`Success!`, 'Signup successful');
          this.isSignUp = true;
        }
        if (authState.loginError?.error) {
          this.toastService.showError(
            authState.loginError.error,
            'Something went wrong'
          );
          this.isSignUp = false;
        }
        this.authForm.reset();
      });
    }
  }

  async signInUser(): Promise<void> {
    if (this.authForm.valid) {
      const email = this.authForm.value.email;
      const password = this.authForm.value.password;
      const returnSecureToken: boolean = true;

      // Dispatching login action and passing email, password, returnSecureToken
      this.store.dispatch(
        new AuthActions.LoginStart({
          email: email,
          password: password,
          returnSecureToken,
        })
      );

      try {
        // Wait for the asynchronous login process to complete
        const authState = await firstValueFrom(this.store.select('auth'));

        if (handleError(authState.loginError!)) {
          this.toastService.showError(
            'Unexpected error occurred',
            'Something went wrong!'
          );
        } else {
          this.toastService.showSuccess(`Welcome ${email}`, 'Login successful');
        }
      } catch (error) {
        console.error('An error occurred during login:', error);
      } finally {
        this.authForm.reset();
      }
    }
  }
}
