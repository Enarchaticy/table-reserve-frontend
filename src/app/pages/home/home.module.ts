import { NoDataAlertModule } from './../../shared/no-data-alert/no-data-alert.module';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceDetailsCardModule } from '../../shared/place-details-card/place-details-card.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    PlaceDetailsCardModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    NoDataAlertModule,
    RouterModule.forChild(routes),
  ],
})
export class HomeModule {}
