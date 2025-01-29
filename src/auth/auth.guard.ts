import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router'; 
 
import { StorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  User:any = {};
  constructor(private store: StorageService, private router: Router) {
    this.User = this.store.getItem("User");
   }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {  
      if (!this.User) { 
      this.router.navigate(['/login']);
      return false;
    }    else  if(state.url.indexOf("/faculty/") > -1){
      if(this.User?.userTypeId == 2) return true;
      else {this.navigateDashboard();return false; };
     }else if(state.url.indexOf("/student/") > -1){
      if(this.User?.userTypeId == 3) return true;
      else {this.navigateDashboard();return false; };
     }else if(state.url.indexOf("/admin/") > -1){
      if(this.User?.userTypeId == 1) return true;
      else {this.navigateDashboard();return false; };
     }
    return true;
  }
  navigateDashboard(){
    if(this.User?.userTypeId == 1) location.href = "/#/admin/dashboard";   
    else if(this.User?.userTypeId == 2) location.href = "/#/faculty/dashboard";
    else if(this.User?.userTypeId == 3) location.href = "/#/student/dashboard";
  }
}
