import {
  Component, OnInit, ViewEncapsulation, ElementRef,
  ViewChild
} from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, NavigationStart } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { AuthService, CordovaService, SharedService, VersionService } from 'src/shared/services';
import { filter, map, mergeMap } from 'rxjs/operators';
import { MatDrawer, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { MessageDto } from 'src/shared/models';
@Component({
  selector: 'app-main',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'arp0d3v';
  contentHeight = '100vh';
  showSpinner = false;
  @ViewChild('drawer') drawer: MatDrawer;
  @ViewChild('spinnerWrapper') spinnerWrapper: ElementRef;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private authService: AuthService,
    private cordovaService: CordovaService,
    private versionService: VersionService,
    private titleService: Title,
    private locationService: Location,
    private snackBar: MatSnackBar,

  ) {
    this.sharedService.onSpinnerToggle.subscribe((e) => { this.showSpinner = e; });
    this.sharedService.onMessageError.subscribe((e) => { this.messageError(e); });
    this.sharedService.onMessageInfo.subscribe((e) => { this.messageInfo(e); });
    this.sharedService.onMessageSuccess.subscribe((e) => { this.messageSuccess(e); });
    this.sharedService.onMessageWarning.subscribe((e) => { this.messageWarning(e); });
    this.sharedService.onHttpRequestError.subscribe((e) => { this.httpRequestErrorHandler(e); });
    this.authService.loadToken();
  }
  ngOnInit() {
    if (this.versionService.forceLogin) {
      this.authService.logout();
    }
    if (this.versionService.isNewVersion) {
      this.versionService.updateLocalVersion();
    }
    if (this.cordovaService.isActive) {
      this.cordovaService.onPause.subscribe(() => { });
      if (this.sharedService.settings.ShowUpdateModal) {
      }
    }

    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map(route => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }))
      .pipe(filter(route => route.outlet === 'primary'))
      .pipe(mergeMap(route => route.data))
      .subscribe((event) => {
        if (event['title']) {
          this.title = event['title'];
          this.titleService.setTitle(event['title']);
        }
      });
    this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe((event) => {
      this.drawer.close();
    });
    this.onResize(null);
  }
  onResize(e: any) {
    this.contentHeight = (window.innerHeight - 82) + 'px';
    const spinnerLeft = (window.innerWidth - 50) / 2;
    const spinnerTop = (window.innerHeight - 50) / 2;
    this.spinnerWrapper.nativeElement.style.left = spinnerLeft + 'px';
    this.spinnerWrapper.nativeElement.style.top = spinnerTop + 'px';
  }
  showMessage(messageDto: MessageDto): MatSnackBarRef<SimpleSnackBar> {
    if (messageDto.ActionTitle) {
      messageDto.Duration = null;
    } else {
      messageDto.Duration = 5000;
    }
    return this.snackBar.open(messageDto.Message, messageDto.ActionTitle, {
      duration: messageDto.Duration,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: `snack-${messageDto.CssClass}`
    });
  }
  messageSuccess(messageDto: MessageDto): MatSnackBarRef<SimpleSnackBar> {
    messageDto.CssClass = 'success';
    return this.showMessage(messageDto);
  }
  messageError(messageDto: MessageDto): MatSnackBarRef<SimpleSnackBar> {
    messageDto.CssClass = 'error';
    return this.showMessage(messageDto);
  }
  messageWarning(messageDto: MessageDto): MatSnackBarRef<SimpleSnackBar> {
    messageDto.CssClass = 'warning';
    return this.showMessage(messageDto);
  }
  messageInfo(messageDto: MessageDto): MatSnackBarRef<SimpleSnackBar> {
    messageDto.CssClass = 'info';
    return this.showMessage(messageDto);
  }
  httpRequestErrorHandler(err: any) {
    console.log(err);
    const name: string = err.name;
    const ok: boolean = err.ok;
    const status: number = err.status;
    const statusText: string = err.statusText;
    const message: string = err.message;
    if (status > 0) {
      // const result: ResultDto = err.error;
      // this.toastAll(result.Toasts);
    } else {
      this.messageError(new MessageDto('server unavailable.'));
    }
  }
  goBack() {
    this.locationService.back();
  }
}
