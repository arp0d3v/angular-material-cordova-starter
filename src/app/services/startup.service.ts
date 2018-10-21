import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { SettingDto } from 'src/shared/models';
import { SharedService } from 'src/shared/services';
import { environment } from 'src/environments';
@Injectable()
export class StartupService {
    constructor(private http: HttpClient, private sharedService: SharedService) {

    }
    headers = new HttpHeaders({
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'If-Modified-Since': 'Mon, 26 Jul 1997 05:00:00 GMT'
    });
    getSettings() {
        const promise = this.http.get<SettingDto>(`${environment.apiServerAddress}api/v100/Setting/GetSetting`,
        { headers: this.headers }).toPromise()
            .then(result => {
                this.sharedService.settings = result;
                return result;
            }, err => {
                this.sharedService.onHttpRequestError.emit(err);
            });
        return promise;
    }
}
