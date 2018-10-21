import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenDto, ResultDto, AuthFaliedDto } from 'src/shared/models';
import { SharedService } from 'src/shared/services/shared.service';
import { VersionService } from 'src/shared/services/version.service';
import { environment } from 'src/environments';
@Injectable()
export class AuthService {
  cachedRequests: Array<HttpRequest<any>> = [];
  onAuthenticated = new EventEmitter<TokenDto>();
  onAuthenticationFailed = new EventEmitter<AuthFaliedDto>();
  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private versionService: VersionService
  ) {

  }
  loadToken() {
    const token = this.getToken();
    if (token) {
      this.sharedService.token = token;
      this.sharedService.user = token.user;
      this.sharedService.isUserAuthenticated = true;
    } else {
      this.sharedService.token = null;
      this.sharedService.user = null;
      this.sharedService.isUserAuthenticated = false;
    }
  }
  login(username: string, password: string, platformId: string, platformVersion: string) {
    this.logout();
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-PlatformId' : platformId,
      'X-PlatformVersion': platformVersion,
      'X-ClientVersion': this.versionService.versionNumber.toString()
    });

    const httpParams = new HttpParams()
      .append('grant_type', 'password')
      .append('username', username)
      .append('password', password);

    this.http.post<TokenDto>(`${environment.apiServerAddress}oauth/token`, httpParams, { headers: headers })
      .subscribe(result => {
          result.username = username;
          result.issued_time = new Date();
          localStorage.setItem('currentToken', JSON.stringify(result));
          this.loadToken();
          this.onAuthenticated.emit(result);
      }, err => {
        this.onAuthenticationFailed.emit(err.error);
      });

  }

  logout(): void {
    // clear token remove user from local storage to log user out
    localStorage.removeItem('currentToken');
    this.sharedService.user = null;
    this.sharedService.token = null;
    this.sharedService.isUserAuthenticated = false;
  }

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }
  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }
  getToken(): TokenDto {
    const token: TokenDto = JSON.parse(localStorage.getItem('currentToken'));
    if (token && token.issued_time) {
      // Convert both dates to milliseconds
      const date1_ms = new Date(token.issued_time).getTime();
      const date2_ms = new Date().getTime();
      // Calculate the difference in milliseconds
      const difference_ms = date2_ms - date1_ms;
      const difference_seconds = Math.round(difference_ms / 1000);
      if (difference_seconds < token.expires_in) {
        return token;
      }
    }
    return null;
  }
  public validateUserName(username: string): Observable<ResultDto> {
    return this.http.get<ResultDto>(
      `${environment.apiServerAddress}api/v100/User/ValidateUserName?username=${username}`);
  }
}
