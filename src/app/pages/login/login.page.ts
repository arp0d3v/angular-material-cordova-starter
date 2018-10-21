import { Component, ViewChild, OnInit } from '@angular/core';
import { SharedService, AuthService, CordovaService } from 'src/shared/services';
import { Router } from '@angular/router';
import { AuthFaliedDto } from 'src/shared/models';
@Component({
  selector: 'app-login-page',
  templateUrl: 'login.page.html'
})
export class LoginPageComponent implements OnInit {
  username = '';
  password = '';
  ajaxCall = false;
  failModel: AuthFaliedDto;
  failMessage = '';
  constructor(
    private router: Router,
    public sharedService: SharedService,
    private authService: AuthService,
    private cordovaService: CordovaService
  ) {
    this.authService.onAuthenticated.subscribe(result => {
      this.sharedService.hideSpinner();
      this.router.navigateByUrl('/profile');
    });

    this.authService.onAuthenticationFailed.subscribe((err: AuthFaliedDto) => {
      setTimeout(() => { // to show you spinner
      this.sharedService.hideSpinner();
      }, 3000);
    });
  }

  ngOnInit(): void {
  }
  login() {
    let platformId = 'browser';
    let platformVersion = '1';
    if (this.cordovaService.isActive) {
      platformId = this.cordovaService.platformId;
      platformVersion = this.cordovaService.platformVersion;
    }
    this.sharedService.showSpinner();
    this.authService.login(this.username, this.password, platformId, platformVersion);
  }

}
