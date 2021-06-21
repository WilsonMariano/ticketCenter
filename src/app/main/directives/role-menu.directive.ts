import { ERole } from './../classes/user.class';
import { AuthService } from '../services/auth.service';
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[roleMenu]'
})
export class RoleMenuDirective {
  @Input('roleMenu') roleMenu: string; 

  private roles: ERole[];

  constructor(
    private elementRef: ElementRef,
    private authService: AuthService) { }

  ngOnInit() {
    this.roles = this.roleMenu.split('|') as ERole[];
    this.elementRef.nativeElement.style.display = "none";
    this.checkVisibility();
  }

  private checkVisibility(): void {
    const userRole = this.authService.getUserData() 
      ? this.authService.getUserData().role 
      : 'anonymus';

    this.roles.some(r => userRole === r)
      ? this.elementRef.nativeElement.style.display = 'block'
      : this.elementRef.nativeElement.style.display = 'none';
  }

}
