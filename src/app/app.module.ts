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
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";

const config: SocketIoConfig = {url: 'http://localhost:3000', options: {}};

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
    NgxLocalStorageModule.forRoot(),
    SocketIoModule.forRoot(config)
  ],
  providers: [
    CookieService,
    {provide: HTTP_INTERCEPTORS, useClass: SessionInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
