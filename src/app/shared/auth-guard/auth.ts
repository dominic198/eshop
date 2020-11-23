import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Auth implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    var token = localStorage.getItem('authorization');
    //var decoded = jwt_decode(token).data;
    let userType = "User";
    const path = route.url[0].path;
    if (userType === 'User') {
      this.router.navigateByUrl('home/list-view');
      return false;
    } else if (userType === 'SiteManager') {
      if (path == 'user-management') {
        this.router.navigateByUrl('home/site-management');
        return false;
      } else {
        return true;
      }
    } else if (userType === 'SuperAdmin') {
      return true;
    } else {
      return false;
    }
  }
}
