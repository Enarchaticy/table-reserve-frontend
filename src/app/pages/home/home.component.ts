import { HelperMethodsService } from './../../shared/services/helper-methods.service';
import { PlaceService } from '../../shared/services/place.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  places: any;
  placesToShow: any;
  placeSub: Subscription;
  name = '';
  constructor(private placeService: PlaceService, private helperMethodsService: HelperMethodsService) {}

  ngOnInit() {
    this.getPlaces();
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }

  getPlaces() {
    this.placeSub = this.placeService.getPlaces().subscribe(
      (placesRes) => {
        this.places = this.helperMethodsService.convertPlacesData(placesRes);
      },
      (err) => console.error(err),
      () => {
        this.onNameChange();
      }
    );
  }

  onNameChange() {
    this.placesToShow = this.places.filter((place) => place.name.toLowerCase().search(this.name.toLowerCase()) !== -1);
  }

  createMockData() {
    this.helperMethodsService.createMockData();
  }
}
