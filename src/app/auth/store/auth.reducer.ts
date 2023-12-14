/* eslint-disable no-case-declarations */
import { HttpErrorResponse } from '@angular/common/http';

import { User } from '../user.model';
import * as AuthActions from './auth.action';

/** @description interface for auth */
export interface AuthState {
  user: User | null;
  loginError: HttpErrorResponse | null;
}

/** @description initial state for auth reducer */
const initialState: AuthState = {
  user: null,
  loginError: null,
};

/** @description auth interface state for auth */
export interface AppState {
  auth: AuthState;
}

/** @description auth reducer function */
export const authReducer = (
  state: AuthState = initialState,
  action: AuthActions.AuthActions
) => {
  switch (action.type) {
    case AuthActions.AUTH_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return { ...state, user: user, loginError: null };
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return { ...state, loginError: null };
    case AuthActions.AUTH_FAILED:
      return {
        ...state,
        user: null,
        loginError: action.payload,
      };
    case AuthActions.LOGOUT_USER:
      return { ...state, user: null, loginError: null };
    case AuthActions.CLEAR_ERROR:
      return { ...state, loginError: null };
    default:
      return state;
  }
};
