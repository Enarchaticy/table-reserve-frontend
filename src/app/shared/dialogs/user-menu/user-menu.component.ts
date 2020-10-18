import { Router } from '@angular/router';
import { DialogService } from '../dialog.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent {
  constructor(private router: Router, private dialogService: DialogService) {}

  navigateTo(url: string) {
    this.dialogService.closeDialog();
    this.router.navigateByUrl(url);
  }

  logout() {
    localStorage.clear();
    this.dialogService.closeDialog();
    this.router.navigateByUrl('authentication');
  }
}
