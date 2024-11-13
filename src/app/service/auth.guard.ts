import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AppSetting } from '../model/app.setting';
import { AuthenticationService } from './authentication.service';

Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate {
  appSet: AppSetting = new AppSetting(); 
  router = inject(Router); 
  authServive = inject(AuthenticationService); 
  
  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean { 
    var haveaccess = true; 
    var user = this.authServive.currentUser; 

    if (user.username != ''){ 
      var currDate = new Date 
      
      if (currDate > user.expirationDate) { 
        alert('Session expired you will redirect to Login page.'); 
        localStorage.removeItem(this.appSet.tokenName); 
        window.location.href = '/login'; } //TODO: check rights 
      } 
      else { 
        window.location.href = '/login'; 
      } 
    return haveaccess;
  }
};
