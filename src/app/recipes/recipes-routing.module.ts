import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeResolver } from './recipes-resolver.service';
import { RecipesComponent } from './recipes.component';
import { SelectRecipeComponent } from './select-recipe/select-recipe.component';

import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard],
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
        resolve: [RecipeResolver],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipeResolver],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
