import {
    Directive, ElementRef
    , HostListener, Renderer, EventEmitter, Output
} from '@angular/core';
import { standardizeNumbers } from 'src/shared/helpers';
@Directive({
    selector: '[appStandardNumber]'
})
export class StandardNumberDirective {
    constructor(protected el: ElementRef, public renderer: Renderer) { }
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter(false);
    @HostListener('keyup', ['$event.target'])
    public onChange(targetElement: ElementRef) {
        let newValue = this.el.nativeElement.value;
        if (newValue) {
            newValue = standardizeNumbers(newValue);
        }
        this.ngModelChange.emit(newValue);
    }
}
