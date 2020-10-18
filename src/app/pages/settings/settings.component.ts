import { ComponentPortal } from '@angular/cdk/portal';
import { DeleteProfileComponent } from './../../shared/dialogs/delete-profile/delete-profile.component';
import { DialogService } from './../../shared/dialogs/dialog.service';
import { HelperMethodsService } from './../../services/helper-methods.service';
import { Subscription } from 'rxjs';
import { ApiResponse, LoginResponse } from './../../models/api-response';
import { User } from './../../models/user';
import { UserService } from '../../services/user.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  nameForm: FormGroup;
  passwordChangeForm: FormGroup;
  user: User = {};
  userUpdateSubs: Subscription;
  getUserSubs: Subscription;

  constructor(
    private userService: UserService,
    private helperMethodsService: HelperMethodsService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.getUser(localStorage.getItem('name'));
    this.resetPasswordChangeForm();
  }

  ngOnDestroy(): void {
    if (this.userUpdateSubs) {
      this.userUpdateSubs.unsubscribe();
    }
    if (this.getUserSubs) {
      this.getUserSubs.unsubscribe();
    }
  }

  resetNameForm() {
    this.nameForm = new FormGroup({ name: new FormControl(this.user.name, Validators.required) });
  }

  submitName() {
    const name = this.nameForm.value.name;
    this.userUpdateSubs = this.userService.updateUser({ name }).subscribe((res: ApiResponse) => {
      this.getUser(name);
      localStorage.setItem('name', name);
    });
  }

  getUser(name: string) {
    this.user.name = name;
    this.resetNameForm();
  }

  resetPasswordChangeForm() {
    this.passwordChangeForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      newPasswordAgain: new FormControl('', Validators.required),
    });
  }

  checkNewPasswords() {
    if (this.passwordChangeForm.value.newPassword === this.passwordChangeForm.value.newPasswordAgain) {
      this.checkOldPassword();
    } else {
      this.helperMethodsService.openSnackBar('Az új jelszavaknak meg kell egyezniük!');
      this.resetPasswordChangeForm();
    }
  }

  checkOldPassword() {
    this.getUserSubs = this.userService
      .loginUser({ email: localStorage.getItem('email'), password: this.passwordChangeForm.value.oldPassword })
      .subscribe(
        (res: LoginResponse) => this.changePassword(),
        (err) => {
          this.helperMethodsService.openSnackBar('Hibás jelszavak!');
          this.resetPasswordChangeForm();
        }
      );
  }

  changePassword() {
    this.userUpdateSubs = this.userService
      .updateUser({ password: this.passwordChangeForm.value.newPassword })
      .subscribe(
        (res: ApiResponse) => this.helperMethodsService.openSnackBar('Sikeresen megváltoztatta a jelszavát!'),
        (err) => {
          this.helperMethodsService.openSnackBar('Valami hiba történt!');
          this.resetPasswordChangeForm();
        }
      );
  }

  deleteProfileDialog() {
    this.dialogService.openDeleteProfileDialog<DeleteProfileComponent>(new ComponentPortal(DeleteProfileComponent));
  }
}
