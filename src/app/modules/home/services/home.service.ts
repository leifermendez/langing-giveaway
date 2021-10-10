import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {LocalStorageService} from "ngx-localstorage";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private localStorage: LocalStorageService, private cookieService: CookieService) {
  }

  getCurrentUser(): any {
    try {
      const userRaw = this.localStorage.get('user') || null
      return JSON.parse(userRaw)
    } catch (e) {
      return null
    }
  }

  cleanCurrentUser(): any {
    this.localStorage.remove('user')
    this.cookieService.delete('token')
  }
}
