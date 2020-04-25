import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateWithDay',
})
export class DatePipe implements PipeTransform {
  constructor() {}

  transform(value: string): string {
    for (let i = -1; i <= 6; i++) {
      if (this.areEqualDays(new Date(new Date().setDate(new Date().getDate() + i)), value)) {
        if (i === -1) {
          return 'tegnap';
        } else if (i === 0) {
          return 'ma';
        } else if (i === 1) {
          return 'holnap';
        } else {
          return new Date(value).toLocaleDateString('hu-HU', { weekday: 'long' });
        }
      }
    }
    return value.substr(0, 10);
  }

  areEqualDays(first: Date, second: string) {
    return this.getRealIsoDate(first).substr(0, 10) === second.substr(0, 10);
  }

  getRealIsoDate(date = new Date()) {
    const tzoffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - tzoffset).toISOString().slice(0, -1);
  }
}
