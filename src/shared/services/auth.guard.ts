import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { SharedService } from 'src/shared/services/shared.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private sharedService: SharedService,
    private router: Router) {}
  canActivate(): boolean {
    if (!this.sharedService.isUserAuthenticated) {
      this.router.navigateByUrl('/home');
      return false;
    }
    return true;
  }
}
