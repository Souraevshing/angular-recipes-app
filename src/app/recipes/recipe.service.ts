import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipesFromDatabase(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipesChanged.next(recipes.slice());
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
    this.shoppingListService.addIngredientsToShoppingList(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipeById(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
