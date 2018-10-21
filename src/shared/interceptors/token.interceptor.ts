import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { SharedService } from 'src/shared/services';
import { Observable } from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public sharedService: SharedService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.sharedService.token;
        let access_token = '';
        if (token) {
            access_token = token.access_token;
        }
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${access_token}`
            }
        });
        return next.handle(request);
    }
}
