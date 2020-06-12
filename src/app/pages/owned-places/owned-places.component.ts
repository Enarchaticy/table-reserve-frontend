import { Place } from './../../models/place';
import { HelperMethodsService } from '../../services/helper-methods.service';
import { PlaceService } from '../../services/place.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-owned-places',
  templateUrl: './owned-places.component.html',
  styleUrls: ['./owned-places.component.scss'],
})
export class OwnedPlacesComponent implements OnInit, OnDestroy {
  placeSub: Subscription;
  places: Place[];

  constructor(
    private placeService: PlaceService,
    private helperMethodsService: HelperMethodsService,
  ) {}

  ngOnInit() {
    this.getPlaces();
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }

  getPlaces() {
    this.placeSub = this.placeService.getPlacesByOwner().subscribe(
      (placesRes: Place[]) => {
        this.places = this.helperMethodsService.convertPlacesData(placesRes);
      },
      (err) => console.error(err)
    );
  }
}
