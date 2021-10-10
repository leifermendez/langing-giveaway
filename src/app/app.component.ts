import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {environment} from "../environments/environment";
import {CookieService} from "ngx-cookie-service";
import {LocalStorageService} from "ngx-localstorage";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public error: string | boolean = false
  public loginUrl = `${environment.api}/auth/login-youtube`

  constructor(private route: ActivatedRoute, private cookieService: CookieService, private local: LocalStorageService) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(({error}) => {
        if(error){
          console.log('___ERROR__',error)
          this.error = error;
          this.cookieService.delete('token')
          this.local.remove('user')
        }
      // this.
    })
  }
}
