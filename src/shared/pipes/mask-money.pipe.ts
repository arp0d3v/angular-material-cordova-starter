import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'maskMoney'
})
export class MaskMoneyPipe implements PipeTransform {

  transform(val: number): string {
    if (val !== undefined && val !== null) {
      return val.toLocaleString(/*arguments you need*/);
    } else {
      return '';
    }
  }
}
