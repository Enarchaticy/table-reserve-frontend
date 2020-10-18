import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-place-details-card',
  templateUrl: './place-details-card.component.html',
  styleUrls: ['./place-details-card.component.scss'],
})
export class PlaceDetailsCardComponent {
  @Input() place: { id?: string; name?: string; time?: string };
  @Input() date?: string;
  constructor(private router: Router) {}

  navigateToThePlace() {
    localStorage.setItem('placeId',  this.place.id);
    localStorage.setItem('date', this.date);
    this.router.navigateByUrl('place');
  }
}
