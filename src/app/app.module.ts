import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UserMenuComponent } from './shared/dialogs/user-menu/user-menu.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OVERLAY_PROVIDERS } from '@angular/cdk/overlay';
import { StorageServiceModule } from 'ngx-webstorage-service';

@NgModule({
  declarations: [AppComponent, UserMenuComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    StorageServiceModule,
  ],
  entryComponents: [UserMenuComponent],
  providers: [OVERLAY_PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
