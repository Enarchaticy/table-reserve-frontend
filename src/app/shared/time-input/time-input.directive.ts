import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appTimeInput]',
})
export class TimeInputDirective {
  constructor() {}

  @HostListener('keypress', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.timeController(event);
  }

  timeController(event: any): void {
    const length = event.target.value.length;
    const key = Number(event.key);

    if (event.key !== 'Backspace') {
      if (length === 2) {
        event.target.value += ':';
      }
      if (Number.isNaN(key) || length >= 5 || (length === 0 && key >= 3) || (length === 3 && key >= 6)) {
        event.preventDefault();
      }
    }
  }
}
