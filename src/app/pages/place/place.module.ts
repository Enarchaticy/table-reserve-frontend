import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlaceComponent } from './place.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

const routes: Routes = [
  {
    path: '',
    component: PlaceComponent,
  },
];

@NgModule({
  declarations: [PlaceComponent],
  imports: [
    CommonModule,
    MatDatepickerModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    RouterModule.forChild(routes),
  ],
})
export class PlaceModule {}
