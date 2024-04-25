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
        rValue = 'This field is required';
        break;
      case 'maxlength':
        rValue = 'This field is to long';
        break;
      case 'minlength':
        rValue = 'This field is to short';
        break;
      case 'email':
        rValue = 'This field must be an email';
        break;
      case 'date':
        rValue = 'This field must be a valid date';
        break;
    }

    return rValue;
  }

}
