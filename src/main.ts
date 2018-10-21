import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'hammerjs';

export function _window(): any {
  return window;
}
export function main() {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
}
export function _domReadyHandler() {
  document.removeEventListener('DOMContentLoaded', _domReadyHandler, false);
  main();
}
if (environment.production) {
  enableProdMode();
}
if (_window().cordova) {
  document.addEventListener('deviceready', main, false);
} else {
  switch (document.readyState) {
    case 'loading':
      document.addEventListener('DOMContentLoaded', _domReadyHandler, false);
      break;
    case 'interactive':
    case 'complete':
    default:
      main();
  }
}
