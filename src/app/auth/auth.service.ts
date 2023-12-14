import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRootReducer from '../store/app.root-reducer';
import * as AuthActions from './store/auth.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //creating and emitting user object to allow all component to subscribe to it and know if user has signed in or not
  //initializing the default user to null since the user is not logged in yet
  //user = new BehaviorSubject<User>(new User('', '', '', null));
  private tokenExpirationTimer!: unknown;

  constructor(private store: Store<fromRootReducer.AppState>) {}

  //auto logout user when token expires by dispatching Logout action
  setLogoutTimer(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  //clearing timer from DOM and setting back to null to enable user to be logged in again if page refresh
  clearLogoutTimer(): void {
    if (this.tokenExpirationTimer) {
      clearTimeout(+this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
