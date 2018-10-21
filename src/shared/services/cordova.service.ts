import { Injectable, NgZone, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';
import { SharedService } from 'src/shared/services/shared.service';

function _window(): any {
    return window;
}
@Injectable()
export class CordovaService {
    onResume = new EventEmitter();
    onPause = new EventEmitter();
    onBackButton = new EventEmitter();
    constructor(
        private zone: NgZone,
        private sharedService: SharedService,
    ) {
    }
    init() {
        if (!this.isActive) {
            return;
        }
        if (this.platformId === 'android') {
        }
        fromEvent(document, 'resume').subscribe(event => {
            this.zone.run(() => {
                this.onResumeHandler();
            });
        });
        fromEvent(document, 'pause').subscribe(event => {
            this.zone.run(() => {
                this.onPauseHandler();
            });
        });
        // fromEvent(document, 'backbutton').subscribe(event => {
        //     this.zone.run(() => {
        //         this.onBackButtonHandler();
        //     });
        // });
    }
    get cordova(): any {
        return _window().cordova;
    }
    get isActive(): Boolean {
        return !!_window().cordova;
    }
    get platformId(): string {
        return this.cordova.platformId;
    }
    get platformVersion(): string {
        return this.cordova.platformVersion;
    }

    private onResumeHandler(): void {
        this.onResume.emit();
    }
    private onPauseHandler(): void {
        this.onPause.emit();
    }
    private onBackButtonHandler(): void {
        this.onBackButton.emit();
    }
}
