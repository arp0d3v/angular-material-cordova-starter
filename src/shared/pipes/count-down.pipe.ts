import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'toCountDown'
})
export class ToCountDownPipe implements PipeTransform {

    transform(value: number): string {
        const minutes: number = +('00' + Math.floor(value / 60)).slice(-2);
        return minutes.toString() + ':' + ('00' + Math.floor(value - minutes * 60)).slice(-2);
    }

}
