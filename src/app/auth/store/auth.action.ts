import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

/**
 * @description constants for auth actions
 */
export const LOGIN_START = '[Auth] Login Start';
export const LOGOUT_USER = '[Auth] Logout User';

export const AUTH_SUCCESS = '[Auth] Login User';
export const AUTH_FAILED = '[Auth] Login Failed';

export const SIGNUP_START = '[Auth] Signup Start';

export const CLEAR_ERROR = '[Auth] Clear Error';

export const AUTO_LOGIN = '[Auth] Auto Login';
export const CHECK_AUTH_STATUS = '[Auth] Check Auth Status';

/**
 * @description Login user
 */
export class AuthSuccess implements Action {
  readonly type = AUTH_SUCCESS;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
    }
  ) {}
}

/**
 * @description executes side-effect when user has started login
 */
export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(
    public payload: {
      email: string;
      password: string;
      returnSecureToken: boolean;
    }
  ) {}
}

/**
 * @description auto login user if page refreshes
 */
export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

/**
 * @description Login failed
 */
export class AuthFailed implements Action {
  readonly type = AUTH_FAILED;
  constructor(public payload: HttpErrorResponse | string) {}
}

/**
 * @description Signup user
 */

/**
 * @description Logout user
 */
export class Logout implements Action {
  readonly type = LOGOUT_USER;
}

/**
 * @description Signup user
 */
export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(
    public payload: {
      email: string;
      password: string;
      returnSecureToken: boolean;
    }
  ) {}
}

/**
 * @description handle error by clearing it when we login or signup successfully
 */
export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

/**
 * @description union type to export different types of action
 */
export type AuthActions =
  | AuthSuccess
  | LoginStart
  | AuthFailed
  | Logout
  | SignupStart
  | ClearError
  | AutoLogin;
