import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './user.service';
import { ReservationService } from './reservation.service';
import { TableService } from './table.service';
import { PlaceService } from './place.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperMethodsService {
  constructor(
    private placeService: PlaceService,
    private tableService: TableService,
    private reservationService: ReservationService,
    private userService: UserService,
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

  getTodayOpeningHours(openingHours: any[]) {
    const hours = openingHours.find(
      (openingHour) => openingHour.day === new Date().toLocaleDateString('hu-HU', { weekday: 'long' })
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

  async createMockData() {
    const userIds = this.createUsers();
    setTimeout(() => {
      this.createPlaces(userIds);

      let places;
      setTimeout(() => {
        localStorage.setItem('userId', userIds[1]);
        this.placeService.getPlaces().subscribe(async (res) => {
          places = res;
          this.createTables(places);
          setTimeout(() => {
            this.tableService.getTablesByPlace(places[0].id).subscribe((tab) => {
              console.log(tab);
              this.createReservations(tab, places[0], userIds);
            });
            this.tableService.getTablesByPlace(places[1].id).subscribe((tab) => {
              this.createReservations(tab, places[1], userIds);
            });
            this.tableService.getTablesByPlace(places[2].id).subscribe((tab) => {
              this.createReservations(tab, places[2], userIds);
            });
          }, 1000);
        });
      }, 1000);
    }, 1000);
  }

  createUsers() {
    const userId = [];
    this.userService.createUser({ name: 'Zsolt' }).subscribe((res: any) => {
      userId.push(res.id);
      if (userId.length === 3) {
        return userId;
      }
    });
    this.userService.createUser({ name: 'Ádám' }).subscribe((res: any) => {
      userId.push(res.id);
      if (userId.length === 3) {
        return userId;
      }
    });
    this.userService.createUser({ name: 'Béla Gyuri' }).subscribe((res: any) => {
      userId.push(res.id);
      if (userId.length === 3) {
        return userId;
      }
    });
    return userId;
  }

  createPlaces(userIds: any[]) {
    const description =
      'asgdjhasgdzjagsdzgasudfasudftasf tasfdt afzd fastzd fatsfd tzasfd tzaftzasftz asjhd ajskd asjdl ajsld';
    const openingHours = [
      { day: 'hétfő', from: '12:00', to: '23:00' },
      { day: 'kedd', from: '12:00', to: '23:00' },
      { day: 'csütörtök', from: '12:00', to: '23:00' },
      { day: 'péntek', from: '12:00', to: '23:00' },
      { day: 'szombat', from: '12:00', to: '23:00' },
    ];
    let asd = 0;
    this.placeService.createPlace({ ownerId: userIds[0], name: 'Kocsma', description, openingHours }).subscribe(() => {
      asd++;
      if (asd === 3) {
        return;
      }
    });
    this.placeService.createPlace({ ownerId: userIds[0], name: 'Campus', description, openingHours }).subscribe(() => {
      asd++;
      if (asd === 3) {
        return;
      }
    });
    this.placeService.createPlace({ ownerId: userIds[0], name: 'Nyugi', description, openingHours }).subscribe(() => {
      asd++;
      if (asd === 3) {
        return;
      }
    });
  }

  createTables(places: any) {
    const tables = [
      { placeId: places[0].id, seats: 4, shape: 'circle', x: 40, y: 40, radius: 40 },
      { placeId: places[0].id, seats: 6, shape: 'circle', x: 230, y: 40, radius: 30 },
      { placeId: places[0].id, seats: 5, shape: 'circle', x: 40, y: 300, radius: 20 },
      { placeId: places[1].id, seats: 5, shape: 'circle', x: 55, y: 69, radius: 60 },
      { placeId: places[1].id, seats: 4, shape: 'circle', x: 420, y: 88, radius: 50 },
      { placeId: places[2].id, seats: 2, shape: 'circle', x: 234, y: 1200, radius: 30 },
      { placeId: places[0].id, seats: 4, shape: 'rectangle', x: 234, y: 40, width: 40, height: 30 },
      { placeId: places[0].id, seats: 3, shape: 'rectangle', x: 420, y: 88, width: 60, height: 70 },
      { placeId: places[1].id, seats: 6, shape: 'rectangle', x: 40, y: 126, width: 34, height: 45 },
      { placeId: places[2].id, seats: 7, shape: 'rectangle', x: 230, y: 40, width: 30, height: 30 },
      { placeId: places[2].id, seats: 1, shape: 'rectangle', x: 40, y: 40, width: 40, height: 30 },
    ];
    this.tableService.createTables(tables).subscribe();
  }

  createReservations(tables: any, place: any, userId: any) {
    const date = this.getRealIsoDate();
    tables.map((table) => {
      const rand = Math.random();
      console.log(rand);
      if (rand > 0.3) {
        if (rand > 0.65) {
          this.reservationService
            .createReservation({
              tableId: table.id,
              placeId: table.placeId,
              userId: userId[1],
              userName: 'Ádám',
              placeName: place.name,
              date,
            })
            .subscribe();
        } else {
          this.reservationService
            .createReservation({
              tableId: table.id,
              placeId: table.placeId,
              userId: userId[2],
              userName: 'Béla Gyuri',
              placeName: place.name,
              date,
            })
            .subscribe();
        }
      }
    });
  }
}
