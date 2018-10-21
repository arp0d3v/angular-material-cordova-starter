import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/shared/services';
import { Router } from '@angular/router';
@Component({
    selector: 'app-home-page',
    templateUrl: 'home.page.html'
})
export class HomePageComponent implements OnInit {
    title = 'angular 6 and cordova starter pack';
    constructor(
        private router: Router,
        public sharedService: SharedService,
    ) {
    }

    ngOnInit(): void {
        this.sharedService.messageSuccess('Hello! it is a sample message :)');
    }

}
