import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

import * as ShoppingListActions from '../shopping-list/store/shopping-list.action';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

import { ToastService } from '../shared/toast.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(
    private toastService: ToastService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  setRecipesFromDatabase(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipesChanged.next(recipes.slice());
    this.toastService.showInfo('Success!', 'Recipes fetched from database');
  }

  getAllRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  //getting recipe based on `id` passed as params inside the url
  getRecipeById(index: number): Recipe {
    return this.recipes[index];
  }

  //add ingredients to recipe
  addRecipeIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    this.toastService.showSuccess(
      'Success!',
      'Ingredients added to shopping list'
    );
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
    this.toastService.showSuccess('Success!', 'Recipe added');
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
    this.toastService.showSuccess('Success!', 'Recipe updated');
  }

  deleteRecipeById(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
    this.toastService.showSuccess('Success!', 'Recipe deleted');
  }
}
