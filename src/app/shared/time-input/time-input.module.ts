import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeInputDirective } from './time-input.directive';

@NgModule({
  declarations: [TimeInputDirective],
  imports: [CommonModule],
  exports: [TimeInputDirective],
})
export class TimeInputModule {}
