import { NgModule } from '@angular/core';
import { Dropdown } from './dropdown.directive';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [Dropdown],
  imports: [CommonModule,HttpClientModule],
  exports: [Dropdown, CommonModule,HttpClientModule],
})
export class SharedModule {}
