import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
declare var versionMajor;
declare var versionMinor;
declare var versionPatch;
@Injectable()
export class VersionService {
    installedMajor = 0;
    installedMinor = 0;
    installedPatch = 0;
    installedNumber = 0;
    versionMajor = 0;
    versionMinor = 0;
    versionPatch = 0;
    versionNumber = 0;
    constructor() {
        this.versionMajor = +versionMajor;
        this.versionMinor = +versionMinor;
        this.versionPatch = +versionPatch;
        this.installedMajor = +localStorage.getItem('installedMajor') || 0;
        this.installedMinor = +localStorage.getItem('installedMinor') || 0;
        this.installedPatch = +localStorage.getItem('installedPatch') || 0;
        this.versionNumber = (this.versionMajor * 100) + (this.versionMinor * 10) + this.versionPatch;
        this.installedNumber = (this.installedMajor * 100) + (this.installedMinor * 10) + this.installedPatch;
    }

    get forceLogin(): boolean {
        return this.versionMajor > this.installedMajor;
    }

    updateLocalVersion() {
        localStorage.setItem('installedMajor', this.versionMajor.toString());
        localStorage.setItem('installedMinor', this.versionMinor.toString());
        localStorage.setItem('installedPatch', this.versionPatch.toString());
    }
    get isNewVersion(): boolean {
        const isNew = this.versionNumber > this.installedNumber;
        return isNew;
    }
}
