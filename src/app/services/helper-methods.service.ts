import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperMethodsService {
  constructor(
    private snackBar: MatSnackBar
  ) {}

  convertPlacesData(places: any) {
    return places.map((place) => {
      return {
        id: place.id,
        name: place.name,
        time: this.getTodayOpeningHours(place.openingHours),
      };
    });
  }

  getTodayOpeningHours(openingHours: any[], date = new Date()) {
    const hours = openingHours.find(
      (openingHour) => openingHour.day === date.toLocaleDateString('hu-HU', { weekday: 'long' })
    );
    if (hours) {
      return hours.from + ' - ' + hours.to;
    }
    return 'ZÁRVA';
  }

  getRealIsoDate(date = new Date()) {
    const tzoffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - tzoffset).toISOString().slice(0, -1);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 2000,
    });
  }
}
