import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { translateError } from 'src/shared/helpers';
@Pipe({ name: 'translateError', pure: false })
export class TranslateErrorPipe implements PipeTransform {
    constructor() { }
    transform(control: AbstractControl, inputTitle: string): string {
        if (control.dirty === false) {
            return '';
        }
        let errorMessage = '';
        const errorKeys = Object.keys(control.errors);
        if (errorKeys && errorKeys.length > 0) {
            errorMessage = translateError(errorKeys[0], inputTitle);
        }
        return errorMessage;
    }
}
