import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';

import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [ReactiveFormsModule, CommonModule, AuthRoutingModule],
})
export class AuthModule {}
