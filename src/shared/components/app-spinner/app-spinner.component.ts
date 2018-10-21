import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
  <mat-spinner [diameter]="50"></mat-spinner>
  `
})
export class SpinnerComponent {
    @Input() message = 'please wait...';
}
