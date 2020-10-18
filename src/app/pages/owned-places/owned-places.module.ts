import { OwnedPlacesComponent } from './owned-places.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceDetailsCardModule } from '../../shared/place-details-card/place-details-card.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NoDataAlertModule } from './../../shared/no-data-alert/no-data-alert.module';

const routes: Routes = [
  {
    path: '',
    component: OwnedPlacesComponent,
  },
];

@NgModule({
  declarations: [OwnedPlacesComponent],
  imports: [
    CommonModule,
    PlaceDetailsCardModule,
    MatButtonModule,
    MatIconModule,
    NoDataAlertModule,
    RouterModule.forChild(routes),
  ],
})
export class OwnedPlacesModule {}
