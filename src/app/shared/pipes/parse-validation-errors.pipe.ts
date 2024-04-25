import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseValidationErrors',
  standalone: true
})
export class ParseValidationErrorsPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): string {
    let rValue: string = '';
    // take one error at a time for each field
    switch (Object.keys(value)[0]) {
      case 'required':
        rValue = 'The field is required';
        break;
      case 'maxlength':
        rValue = 'The field is to long';
        break;
      case 'minlength':
        rValue = 'The field is to short';
        break;
    }

    return rValue;
  }

}
