import { TimeInputModule } from './shared/time-input/time-input.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserMenuComponent } from './shared/dialogs/user-menu/user-menu.component';
import { CreateReservationComponent } from './shared/dialogs/create-reservation/create-reservation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { OVERLAY_PROVIDERS } from '@angular/cdk/overlay';
import { Interceptor } from './interceptor/interceptor';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { DeleteProfileComponent } from './shared/dialogs/delete-profile/delete-profile.component';
@NgModule({
  declarations: [AppComponent, UserMenuComponent, CreateReservationComponent, DeleteProfileComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    TimeInputModule,
  ],
  entryComponents: [UserMenuComponent, CreateReservationComponent, DeleteProfileComponent],
  providers: [
    OVERLAY_PROVIDERS,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
