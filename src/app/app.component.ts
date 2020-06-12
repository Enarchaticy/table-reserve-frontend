import { UserMenuComponent } from './shared/dialogs/user-menu/user-menu.component';
import { DialogService } from './shared/dialogs/dialog.service';
import { TableService } from './services/table.service';
import { PlaceService } from './services/place.service';
import { UserService } from './services/user.service';
import { ReservationService } from './services/reservation.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('userMenu', { static: false }) userMenuButton: ElementRef;
  title = 'table-reserve';

  constructor(
    private reservationService: ReservationService,
    public userService: UserService,
    private placeService: PlaceService,
    private tableService: TableService,
    public router: Router,
    private dialogService: DialogService
  ) {
    /*  --------------------------CREATE---------------------------
    this.reservationService.createReservation({userId: 'asd', date: new Date().toISOString()}).subscribe();
    this.userService.createUser({name: 'asd'}).subscribe(x => console.log(x));
    this.placeService.createPlace({description: 'asd'}).subscribe(x => console.log(x));
    this.tableService.createTables([{placeId: 'asd'}, {placeId: 'asd'}]).subscribe(x => console.log(x)); */
    /* ---------------------------DELETES----------------------

    this.tableService.deleteTablesByPlace('asd').subscribe(x => console.log(x));
    this.userService.deleteUser('5e8707ef79ed2a0075f97707').subscribe(x => console.log(x));
    this.placeService.deletePlace('5e87094179ed2a0075f9770d').subscribe(x => console.log(x));
    this.reservationService.deleteReservation('5e850911b8f66100ad707992').subscribe();
    */
    /* ---------------------------UPDATES----------------------

    this.userService.updateUser({ id: '5e87085579ed2a0075f97708', name: ' qwe' }).subscribe();
    this.placeService.updatePlace({ id: '5e86062071bb1f0184c3afd3', name: ' qwe' }).subscribe();
    this.reservationService.updateReservation({ id: '5e84d56a8428ce0040e14f68', userId: 'qwertzio' }).subscribe(
      x => console.log(x),
    ); */
    /*   --------------------------GET ONE---------------------------
    this.userService.getUser('5e8707ef79ed2a0075f97707').subscribe(x => console.log(x));
    this.placeService.getPlace('5e86062071bb1f0184c3afd3').subscribe(x => console.log(x));
    this.tableService.getTable('5e862b1270546601dc57c42e').subscribe(x => console.log(x));
    this.reservationService.getReservationByUser('asdasdasd').subscribe(
      (x: any[]) => {
        if (x.length !== 0) {
          console.log(x);
          console.log(x[0].date);
        }
      },
      err => {
        console.log(err);
      }
    );
    */
    /*   --------------------------GET MORE---------------------------
    this.placeService.getPlaces().subscribe(x => console.log(x));
    this.tableService.getTablesByPlace('asd').subscribe(x => console.log(x));
    this.reservationService.getReservationsByUser('string').subscribe(
      x => console.log(x),
      err => console.error(err),
      () => {}
    );
    */
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  userDataDialog() {
    this.dialogService.openDialog<UserMenuComponent>(new ComponentPortal(UserMenuComponent), this.userMenuButton);
  }
}
