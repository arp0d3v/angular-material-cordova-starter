import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

export function mobileNumberValidatorFn(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const mobileNumber = control.value;
        const mobilenumberRgx = new RegExp('^((\\+\\d{2})|(0(0\\d{2})?))?9\\d{9}$', 'g');
        const no = mobilenumberRgx.test(mobileNumber);
        return no ? null : { 'mobilenumber': { mobileNumber } };
    };
}

@Directive({
    selector: '[appValidMobileNumber]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MobileNumberValidator, multi: true }]
})
export class MobileNumberValidator implements Validator, OnChanges {
    @Input() appValidMobileNumber: string;
    private valFn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges): void {
        const change = changes['appValidMobileNumber'];
        if (change) {
            this.valFn = mobileNumberValidatorFn();
        } else {
            this.valFn = Validators.nullValidator;
        }
    }

    validate(control: AbstractControl): { [key: string]: any } {
        return this.valFn(control);
    }
}
