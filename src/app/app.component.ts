import { UserMenuComponent } from './shared/dialogs/user-menu/user-menu.component';
import { DialogService } from './shared/dialogs/dialog.service';
import { UserService } from './services/user.service';
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
    public userService: UserService,
    public router: Router,
    private dialogService: DialogService
  ) { }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  setCircleInitial() {
    return localStorage.getItem('name').substring(0, 1)[0].toUpperCase();
  }

  userDataDialog() {
    this.dialogService.openUserMenuDialog<UserMenuComponent>(
      new ComponentPortal(UserMenuComponent),
      this.userMenuButton
    );
  }
}
