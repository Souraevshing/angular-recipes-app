import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environmet.prod';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { AuthSignIn, AuthSignUp } from './auth.model';
import { User } from './user.model';
import { Router } from '@angular/router';
import { ToastService } from '../shared/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //creating and emitting user object to allow all component to subscribe to it and know if user has signed in or not
  //initializing the default user to null since the user is not logged in yet
  user = new BehaviorSubject<User>(new User('', '', '', null));
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) {}

  signUpUser(
    email: string,
    password: string,
    returnSecureToken: boolean
  ): Observable<AuthSignUp> {
    return this.http
      .post<AuthSignUp>(environment.authSignUp, {
        email,
        password,
        returnSecureToken,
      })
      .pipe(
        catchError((err: HttpErrorResponse) => this.handleError(err)),
        tap((res) =>
          this.handleAuthentication(
            res.email!,
            res.localId!,
            res.idToken!,
            +res.expiresIn!
          )
        )
      );
  }

  logInUser(
    email: string,
    password: string,
    returnSecureToken: boolean
  ): Observable<AuthSignIn> {
    return this.http
      .post<AuthSignIn>(environment.authSignIn, {
        email,
        password,
        returnSecureToken,
      })
      .pipe(
        catchError((err: HttpErrorResponse) => this.handleError(err)),
        tap((res) =>
          this.handleAuthentication(
            res.email!,
            res.localId!,
            res.idToken!,
            +res.expiresIn!
          )
        )
      );
  }

  loginAutomatically(): void {
    //creating the user token
    const userToken: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('_token')!);

    //if user doesn't exist just return
    if (!userToken) {
      return;
    }

    //if user exists in localStorage, then create new user from localStorage
    const loadUserFromLocalStorage = new User(
      userToken.email,
      userToken.id,
      userToken._token,
      new Date(userToken._tokenExpirationDate)
    );

    //if user has valid token, then emit the user to be logged in
    if (loadUserFromLocalStorage.token) {
      this.user.next(loadUserFromLocalStorage);
      this.toastService.showSuccess(
        `Welcome ${loadUserFromLocalStorage.email}`,
        'Welcome back'
      );
      const expirationDuration =
        new Date(userToken._tokenExpirationDate).getTime() -
        new Date().getTime(); //calculating current time
      this.logoutAutomatically(expirationDuration);
    }
  }

  logOutUser(): void {
    //when logout, we will assign the user with null to logout,
    //saving current logged in user to be able to keep the user logged in even if the page is refreshed till the expiration date
    this.user.next(new User('', '', '', null));
    this.router.navigate(['/auth']);
    localStorage.removeItem('_token');
    //log out user automatically after the expiration time using setTimeout, setting to null after logout
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.toastService.showInfo('Logout successfully', 'Logging out');
  }

  //clearing user from localStorage and logout user automatically
  logoutAutomatically(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOutUser();
    }, expirationDuration);
  }

  //after emitting user, calling logoutAutomatically by passing expiresIn in milliseconds
  handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.logoutAutomatically(expiresIn * 1000);
    localStorage.setItem('_token', JSON.stringify(user));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Something went wrong';

    if (!error?.error || !error?.error?.error) {
      return throwError(() => new Error(errorMessage));
    }

    switch (error?.error?.error?.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email already exists';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Action not allowed';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'Too many attempts';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Invalid email or password';
        break;
    }
    console.log(error);
    return throwError(() => new Error(errorMessage));
  }
}
