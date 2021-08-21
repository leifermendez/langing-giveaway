import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {YouTubePlayerModule} from '@angular/youtube-player';
import {CountUpModule} from "ngx-countup";
import {FacebookModule} from "ngx-facebook";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CookieService} from 'ngx-cookie-service';
import {SessionInterceptor} from "./core/interceptors/session.interceptor";
import {NgxLocalStorageModule} from 'ngx-localstorage';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    YouTubePlayerModule,
    CountUpModule,
    HttpClientModule,
    FacebookModule.forRoot(),
    AppRoutingModule,
    NgxLocalStorageModule.forRoot()
  ],
  providers: [
    CookieService,
    {provide: HTTP_INTERCEPTORS, useClass: SessionInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
