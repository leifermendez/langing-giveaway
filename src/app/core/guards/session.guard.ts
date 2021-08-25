import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkSession();
  }

  checkSession(): boolean {
    const session = this.cookieService.get('token') || null;
    const check = !!(session);
    if (!check) {
      this.router.navigate(['/'])
    }
    return check;
  }
}
