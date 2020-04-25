import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
    /* canActivate: [AuthGuard], */
  },
  {
    path: 'place',
    loadChildren: () => import('./pages/place/place.module').then((m) => m.PlaceModule),
    /* canActivate: [AuthGuard], */
  },
  {
    path: 'myplaces',
    loadChildren: () => import('./pages/owned-places/owned-places.module').then((m) => m.OwnedPlacesModule),
    /* canActivate: [AuthGuard], */
  },
  {
    path: 'reservations',
    loadChildren: () => import('./pages/reservations/reservations.module').then((m) => m.ReservationsModule),
    /* canActivate: [AuthGuard], */
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then((m) => m.SettingsModule),
    /* canActivate: [AuthGuard], */
  },
  {
    path: 'placeadd',
    loadChildren: () => import('./pages/place-add/place-add.module').then((m) => m.PlaceAddModule),
    /* canActivate: [AuthGuard], */
  },
  /* { path: '**', redirectTo: 'home' }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
