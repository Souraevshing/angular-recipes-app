/* eslint-disable no-case-declarations */
import { Ingredient } from '../../shared/ingredient.model';

import {
  ADD_INGREDIENT,
  ADD_INGREDIENTS,
  DELETE_INGREDIENT,
  START_EDIT,
  STOP_EDIT,
  UPDATE_INGREDIENT,
} from './shopping-list.action';
import { ShoppingListActions } from './shopping-list.action';

/** @description interface for ingredients */
export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient | null;
  editedIngredientIndex: number;
}

/** @description interface for state for shopping-list */
export interface AppState {
  shoppingList: ShoppingListState;
}

/** @description initial state of shopping-list reducer */
const initialState: ShoppingListState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

/** @description shopping-list reducer function */
export const shoppingListReducer = (
  state: ShoppingListState = initialState,
  action: ShoppingListActions
) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    case DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient, index) => {
          return index !== state.editedIngredientIndex;
        }),
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    case UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload,
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };

    case START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] },
      };

    case STOP_EDIT:
      return { ...state, editedIngredientIndex: -1, editedIngredient: null };

    default:
      return state;
  }
};

/**
 * @description new approach using `@ngrx/store` library
 
 * import { createReducer, on } from '@ngrx/store';
 * import { AddIngredient } from './shopping-list.action';
 * import { Ingredient } from '../../shared/ingredient.model';
 * export const initialState = {
 * ingredients: [new Ingredient('Chicken', 5), new Ingredient('Paneer', 10)],
 * };
 * 
 * export const shoppingListReducer = createReducer(
 * initialState,
 * on(AddIngredient, (state, { payload }) => ({
 *  ...state,
 *  ingredients: [...state.ingredients, payload],
 * })),
 * on((state, action) => state)
 * );
*/
