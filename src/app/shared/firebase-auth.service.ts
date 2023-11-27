import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Observable, exhaustMap, map, pipe, take, tap } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { environment } from '../../environments/environmet.prod';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  saveAllRecipes() {
    const recipes = this.recipeService.getAllRecipes();

    return this.http
      .put<Recipe[]>(environment.url, recipes)
      .subscribe((res) => {
        console.log(res);
      });
  }

  getAllRecipes() {
    //iterate on every recipes and return recipes if present, & return ingredients, if it's present on recipes else return empty array

    //here, we use pipe() operator which takes number as arg to take the specified number of user by subscribing to it
    //exhaustMap() operator will wait for the first observable to finish, here fetching current user
    //and then will execute the next observable here, will fetch all the ingredients
    //exhaustMap((user) => {...}: The exhaustMap operator takes the emitted user from this.authService.user and returns a new observable.
    //If a new user emits while the inner observable is still running, the new user emission will be ignored until the inner observable completes.

    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
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
      })
    );
  }
}
