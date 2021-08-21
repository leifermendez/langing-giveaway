import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiRestService} from "../../../services/api-rest.service";
import {CookieService} from "ngx-cookie-service";
import {LocalStorageService} from "ngx-localstorage";


@Component({
  selector: 'app-call-back',
  templateUrl: './call-back.component.html',
  styleUrls: ['./call-back.component.scss']
})
export class CallBackComponent implements OnInit {
  private token = ''

  constructor(private authService: AuthService, private route: ActivatedRoute, private apiRestService: ApiRestService,
              private cookieService: CookieService, private router: Router, private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('tok')
    this.cookieService.delete('token')
    this.loadData()
    setTimeout(() => {
      this.cookieService.set('token', this.token, 4, '/')
      this.router.navigate(['/', 'participants'])
    }, 1000)
  }

  loadData(): void {
    this.authService.getMe().subscribe(({data}) => {
      this.localStorage.set('user', JSON.stringify(data))
    })
  }
}
