import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environmet';
import { AuthSignIn, AuthSignUp } from '../auth.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  //using side-effects to login user, create and register effect to set type and map on actions to login
  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authState: AuthActions.LoginStart) => {
        return this.http
          .post<AuthSignIn>(environment.authSignIn, {
            email: authState.payload.email,
            password: authState.payload.password,
            returnSecureToken: true,
          })
          .pipe(
            tap((res) => {
              this.authService.setLogoutTimer(+res.expiresIn! * 1000); //setting timer
            }),
            map((res) => {
              return handleAuthentication(
                res.email!,
                res.localId!,
                +res.expiresIn!,
                res.idToken!
              );
            }),
            catchError((error: HttpErrorResponse) => {
              return handleError(error);
            })
          );
      })
    )
  );

  //keep user logged in if page is refreshed
  autoLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        //creating the user token
        const userToken: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('_token')!);

        //if user exists in localStorage, then create new user from localStorage
        const loadUserFromLocalStorage = new User(
          userToken.email,
          userToken.id,
          userToken._token,
          new Date(userToken._tokenExpirationDate)
        );

        //if user has valid token, then emit the user to be logged in
        if (loadUserFromLocalStorage.token) {
          const expirationDuration =
            new Date(userToken._tokenExpirationDate).getTime() -
            new Date().getTime(); //calculating current time
          this.authService.setLogoutTimer(expirationDuration); //setting timer

          return new AuthActions.AuthSuccess({
            email: loadUserFromLocalStorage.email,
            userId: loadUserFromLocalStorage.id,
            token: loadUserFromLocalStorage.token,
            expirationDate: new Date(userToken._tokenExpirationDate),
          });

          //   this.logoutAutomatically(expirationDuration);
        }

        return { type: 'DUMMY' };
      })
    )
  );

  //logout user after token has expired
  authLogout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGOUT_USER),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('_token');
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );

  //redirect user if login success
  authSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AUTH_SUCCESS),
        tap(() => {
          this.router.navigate(['/recipes']);
        })
      ),
    { dispatch: false }
  );

  //redirect user if login fails
  authFailed = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AUTH_FAILED),
        tap(() => {
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );

  //signup user
  authSignupSuccess = createEffect(() =>
    this.actions$
      .pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((authState: AuthActions.SignupStart) => {
          return this.http.post<AuthSignUp>(environment.authSignUp, {
            email: authState.payload.email,
            password: authState.payload.password,
            returnSecureToken: true,
          });
        })
      )
      .pipe(
        tap((res) => {
          this.authService.setLogoutTimer(+res.expiresIn! * 1000); //setting timer
        }),
        map((res) => {
          return handleAuthentication(
            res.email!,
            res.localId!,
            +res.expiresIn!,
            res.idToken!
          );
        }),
        catchError((error: HttpErrorResponse) => {
          return handleError(error);
        })
      )
  );
}

const handleAuthentication = (
  email: string,
  userId: string,
  expiresIn: number,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn! * 1000); //calculating time to logout user
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('_token', JSON.stringify(user));
  return new AuthActions.AuthSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate,
  });
};

const handleError = (error: HttpErrorResponse) => {
  let errorMessage = 'Something went wrong';

  if (!error?.error || !error?.error?.error) {
    return of(new AuthActions.AuthFailed(error));
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
    default:
      errorMessage = 'Something went wrong';
      break;
  }
  console.log(error);
  return of(new AuthActions.AuthFailed(errorMessage));
};
