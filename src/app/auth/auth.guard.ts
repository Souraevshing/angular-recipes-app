/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRootReducer from '../store/app.root-reducer';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<fromRootReducer.AppState>
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => {
        return authState.user;
      }),
      map((user) => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        } else {
          return this.router.createUrlTree(['/auth']);
        }
      })
    );
  }
}
