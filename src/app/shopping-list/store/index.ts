import { AppState, shoppingListReducer } from './shopping-list.reducer';
import { ActionReducerMap } from '@ngrx/store';

export const rootReducer = {};

/** @description group of objects of reducer to be used in the entire app */
export const reducers: ActionReducerMap<AppState, any> = {
  shoppingList: shoppingListReducer,
};
