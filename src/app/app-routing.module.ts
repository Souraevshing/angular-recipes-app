import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { SelectRecipeComponent } from './recipes/select-recipe/select-recipe.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/recipes',
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      {
        path: '', //child route to render, `http://localhost:3000/recipes` will show this component as landing page
        component: SelectRecipeComponent,
      },
      {
        path: 'create',
        component: RecipeEditComponent,
      },
      {
        path: ':id',
        component: RecipeDetailsComponent,
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
      },
    ],
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
  },
  {
    path: '**',
    redirectTo: '/recipes',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
