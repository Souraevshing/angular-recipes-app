import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.action';

/** @description interface for ingredients */
export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient | any;
  editedIngredientIndex: number;
}

/** @description interface for state for entire app */
export interface AppState {
  shoppingList: ShoppingListState;
}

/** @description initial state of reducer */
const initialState: ShoppingListState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

/** @description reducer function */
export const shoppingListReducer = (
  state: ShoppingListState = initialState,
  action: ShoppingListActions.ShoppingListActions
) => {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient, index) => {
          return index !== state.editedIngredientIndex;
        }),
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
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

    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] },
      };

    case ShoppingListActions.STOP_EDIT:
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
