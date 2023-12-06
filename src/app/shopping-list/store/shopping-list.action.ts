import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';
export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';
export const START_EDIT = '[Shopping List] Start Edit';
export const STOP_EDIT = '[Shopping List] Stop Edit';

/** @description add single ingredient */
export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public payload: Ingredient) {}
}

/** @description add array of ingredients */
export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {}
}

/** @description delete ingredient */
export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}

/** @description update ingredient */
export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;

  constructor(public payload: Ingredient) {}
}

/** @description check if user started editing */
export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: number) {}
}

/** @description check if user has done editing */
export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

/** @description union of multiple actions to be used inside reducer action types */
export type ShoppingListActions =
  | AddIngredient
  | AddIngredients
  | DeleteIngredient
  | UpdateIngredient
  | StartEdit
  | StopEdit;

/**
 * @description new approach using `@ngrx/store` library
 * import { createAction, props } from '@ngrx/store';
 * import { Ingredient } from '../../shared/ingredient.model';
 *
 * const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
 *
 * export const AddIngredient = createAction(
 * ADD_INGREDIENT,
 * props<{ payload: Ingredient }>()
 * );
 *
 * export type ShoppingListActions = ReturnType<typeof AddIngredient>;
 */
