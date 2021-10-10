import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {LocalStorageService} from "ngx-localstorage";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private localStorage: LocalStorageService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAdmin();
  }

  checkAdmin(): boolean {
    try {
      const check = JSON.parse(this.localStorage.get('user'))
      const role = check?.role === 'admin'
      if (!role) {
        this.router.navigate(['/'])
      }
      return check?.role === 'admin'

    } catch (e) {
      return false
    }
  }
}
