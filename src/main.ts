import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
  if (window) {
    window.console.log = window.console.warn = window.console.info = () => {
      // Don't log anything.
    };
    window.console.error = ($event, more) => {};
  }

}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
