import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environmet.prod';
import { Observable } from 'rxjs';
import { AuthSignIn, AuthSignUp } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUpUser(
    email: string,
    password: string,
    returnSecureToken: boolean
  ): Observable<AuthSignUp> {
    try {
      return this.http.post(environment.authSignUpUrl, {
        email,
        password,
        returnSecureToken,
      });
    } catch (err) {
      console.log(err);
      return new Observable<any>();
    }
  }

  signInUser(email: string, password: string): Observable<AuthSignIn> {
    try {
      return this.http.post(environment.authSignInUrl, { email, password });
    } catch (err) {
      console.log(err);
      return new Observable<any>();
    }
  }
}
