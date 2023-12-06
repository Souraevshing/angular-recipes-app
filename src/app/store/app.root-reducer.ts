/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

/**
 * @description interface for root reducer
 */
export interface AppState {
  shoppingList: fromShoppingList.ShoppingListState;
  auth: fromAuth.AuthState;
}

/**
 * @description root reducer to be used in the entire application
 */
export const rootReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer as any,
  auth: fromAuth.authReducer as any,
};
