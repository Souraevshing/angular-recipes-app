import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Observable, map, tap } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { environment } from '../../environments/environmet.prod';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  saveAllRecipes() {
    const recipes = this.recipeService.getAllRecipes();
    try {
      return this.http
        .put<Recipe[]>(environment.url, recipes)
        .subscribe((res) => {
          console.log(res);
        });
    } catch (err) {
      console.log(err);
      return new Observable<Recipe[]>();
    }
  }

  //iterate on every recipes and return recipes if present, & return ingredients, if it's present on recipes else return empty array
  getAllRecipes() {
    try {
      return this.http.get<Recipe[]>(environment.url).pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes: Recipe[]) => {
          this.recipeService.setRecipesFromDatabase(recipes);
        })
      );
    } catch (err) {
      console.log(err);
      return new Observable<Recipe[]>();
    }
  }
}
