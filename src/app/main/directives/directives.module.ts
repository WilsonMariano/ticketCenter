import { NgModule } from '@angular/core';
import { RoleMenuDirective } from './role-menu.directive';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    RoleMenuDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RoleMenuDirective
  ]
})
export class DirectivesModule { }
