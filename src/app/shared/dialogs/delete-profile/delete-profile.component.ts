import { HelperMethodsService } from './../../../services/helper-methods.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { DialogService } from './../dialog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.scss'],
})
export class DeleteProfileComponent implements OnInit {
  passwordForm: FormGroup;

  constructor(
    public dialogService: DialogService,
    private userService: UserService,
    private router: Router,
    private helperMethodsService: HelperMethodsService
  ) {}

  ngOnInit() {
    this.passwordForm = new FormGroup({ password: new FormControl('', Validators.required) });
  }

  deleteProfile() {
    this.userService.deleteUser(this.passwordForm.controls.password.value).subscribe(
      (res) => {
        localStorage.clear();
        this.dialogService.closeDialog();
        this.router.navigateByUrl('authentication');
      },
      (err) => {
        console.log(err);
        this.dialogService.closeDialog();
        this.helperMethodsService.openSnackBar('Törlés sikertelen, hibás jelszót adott meg!');
      }
    );
  }
}
