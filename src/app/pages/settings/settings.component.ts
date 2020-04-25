import { LocalStorageService } from './../../shared/services/local-storage.service';
import { UserService } from './../../shared/services/user.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  nameForm: FormGroup;
  user: { id: string; name: string };
  constructor(private userService: UserService, private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.getUser();
  }

  resetNameForm() {
    this.nameForm = new FormGroup({ name: new FormControl(this.user.name, Validators.required) });
  }

  submitName() {
    this.userService.updateUser({ id: this.user.id, name: this.nameForm.value.name }).subscribe(() => {
      this.getUser();
    });
  }

  getUser() {
    this.userService.getUser(this.localStorageService.get('userId')).subscribe((res: any) => {
      this.user = res;
      this.resetNameForm();
    });
  }
}
