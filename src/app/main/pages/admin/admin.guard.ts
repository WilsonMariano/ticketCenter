import { Injectable } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { ERole } from '../../classes/user.class';

@Injectable({
    providedIn: 'root'
  })
export class AdminGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router) {}

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
       
        if(!this.authService.getUserData() ||  (this.authService.getUserData().role !== ERole.Administrador)) {
            this.router.navigate(['auth/login']);
            return false;
        }
        return true;
    }
  }