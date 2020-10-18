import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoDataAlertComponent } from './no-data-alert.component';

@NgModule({
  declarations: [NoDataAlertComponent],
  imports: [CommonModule],
  exports: [NoDataAlertComponent],
})
export class NoDataAlertModule {}
