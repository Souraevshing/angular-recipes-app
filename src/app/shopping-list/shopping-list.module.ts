import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListRoutingModule } from './shopping-list.routing.module';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    ShoppingListRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [ShoppingListComponent, ShoppingEditComponent],
})
export class ShoppingListModule {}
