import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  /**
   * @description interceptor for HttpRequests
   * intercept all the request and attach the token generated by subscribing the user,
   * so that we don't have to pass the auth param everywhere in the app,
   * this intercept method will handle the auth param to be passed in the req
   */

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        /**
         * @description fetch recipes
         * if user is null, then send the actual req to solve the err for fetching recipes
         * this error can occur since the token may be null and we try to access the token so the req fails with 400 error
         */
        if (!user) {
          return next.handle(req);
        }
        const modifiedRequest = req.clone({
          params: new HttpParams().set('auth', user.token!),
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
