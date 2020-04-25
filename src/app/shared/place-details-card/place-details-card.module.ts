import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PlaceDetailsCardComponent } from './place-details-card.component';

@NgModule({
  declarations: [PlaceDetailsCardComponent],
  imports: [CommonModule, MatCardModule],
  exports: [PlaceDetailsCardComponent],
})
export class PlaceDetailsCardModule {}
