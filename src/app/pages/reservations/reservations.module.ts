import { ReservationsComponent } from './reservations.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceDetailsCardModule } from '../../shared/place-details-card/place-details-card.module';
import { DatePipe } from './date-pipe/date.pipe';
import { NoDataAlertModule } from './../../shared/no-data-alert/no-data-alert.module';

const routes: Routes = [
  {
    path: '',
    component: ReservationsComponent,
  },
];

@NgModule({
  declarations: [ReservationsComponent, DatePipe],
  imports: [
    CommonModule,
    PlaceDetailsCardModule,
    NoDataAlertModule,
    RouterModule.forChild(routes),
  ],
})
export class ReservationsModule {}
