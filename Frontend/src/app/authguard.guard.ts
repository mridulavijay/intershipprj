import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizeService } from './authorize.service';
@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private auth:AuthorizeService,private router:Router) { }
  canActivate():boolean {
    if (this.auth.loggedIn())
    {
      console.log('logged in :true');
      return true

    }
    else{
      console.log('logged in :false')
      this.router.navigate([''])
      return false
    }
  }
  
}
