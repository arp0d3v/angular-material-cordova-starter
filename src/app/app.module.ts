import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatSidenavModule, MatListModule, MatIconModule,
  MatInputModule, MatFormFieldModule, MAT_LABEL_GLOBAL_OPTIONS,
  MatProgressSpinnerModule, MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS
} from '@angular/material';

import { AppComponent } from './components/app.component';
import { TranslateErrorPipe, MaskMoneyPipe, ToCountDownPipe } from 'src/shared/pipes';
import { MobileNumberValidator } from 'src/shared/validators';
import { StandardNumberDirective } from 'src/shared/directives';
import {
  HomePageComponent, LoginPageComponent, NoContentPageComponent
} from './pages';
import {
  SpinnerComponent
} from 'src/shared/components';
import { ROUTES } from './app.routes';
import {
  AuthService, CordovaService,
  SharedService, AuthGuard, VersionService
} from 'src/shared/services';
import { StartupService } from './services';
import { TokenInterceptor } from 'src/shared/interceptors';
export function init_app(startupService: StartupService) {
  return () => startupService.getSettings();
}
@NgModule({
  declarations: [
    AppComponent,

    TranslateErrorPipe,
    MaskMoneyPipe,
    ToCountDownPipe,

    StandardNumberDirective,
    MobileNumberValidator,

    SpinnerComponent,

    HomePageComponent,
    LoginPageComponent,
    NoContentPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    RouterModule.forRoot(ROUTES, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    }),
  ],
  providers: [
    SharedService,
    VersionService,
    StartupService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [StartupService], multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      deps: [SharedService],
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'always' } },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000, verticalPosition: 'top' } },
    AuthService,
    AuthGuard,
    CordovaService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
