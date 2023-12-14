import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DropdownDirective } from './dropdown.directive';
@NgModule({
  declarations: [DropdownDirective],
  imports: [CommonModule, HttpClientModule],
  exports: [DropdownDirective, CommonModule, HttpClientModule],
})
export class SharedModule {}
