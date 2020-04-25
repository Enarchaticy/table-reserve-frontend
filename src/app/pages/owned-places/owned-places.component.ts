import { LocalStorageService } from './../../shared/services/local-storage.service';
import { HelperMethodsService } from './../../shared/services/helper-methods.service';
import { PlaceService } from './../../shared/services/place.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-owned-places',
  templateUrl: './owned-places.component.html',
  styleUrls: ['./owned-places.component.scss'],
})
export class OwnedPlacesComponent implements OnInit, OnDestroy {
  placeSub: Subscription;
  places: any;

  constructor(
    private placeService: PlaceService,
    private helperMethodsService: HelperMethodsService,
    private localStorageService: LocalStorageService
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
    this.placeSub = this.placeService.getPlacesByOwner(this.localStorageService.get('userId')).subscribe(
      (placesRes) => {
        this.places = this.helperMethodsService.convertPlacesData(placesRes);
      },
      (err) => console.error(err)
    );
  }
}
