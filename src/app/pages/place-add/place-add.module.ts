import { MatCardModule } from '@angular/material/card';
import { TimeInputModule } from './../../shared/time-input/time-input.module';
import { PlaceAddComponent } from './place-add.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceDetailsCardModule } from '../../shared/place-details-card/place-details-card.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const routes: Routes = [
  {
    path: '',
    component: PlaceAddComponent,
  },
];

@NgModule({
  declarations: [PlaceAddComponent],
  imports: [
    CommonModule,
    PlaceDetailsCardModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    TimeInputModule,
    RouterModule.forChild(routes),
  ],
})
export class PlaceAddModule {}
