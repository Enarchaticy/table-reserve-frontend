import { Subscription } from 'rxjs';
import { ApiResponse } from './../../models/api-response';
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
  user: User = {};
  userSubs: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUser(localStorage.getItem('name'));
  }

  ngOnDestroy(): void {
    if (this.userSubs) {
      this.userSubs.unsubscribe();
    }
  }

  resetNameForm() {
    this.nameForm = new FormGroup({ name: new FormControl(this.user.name, Validators.required) });
  }

  submitName() {
    const name = this.nameForm.value.name;
    this.userSubs = this.userService.updateUser({ name }).subscribe((res: ApiResponse) => {
      this.getUser(name);
      localStorage.setItem('name', name);
    });
  }

  getUser(name: string) {
    this.user.name = name;
    this.resetNameForm();
  }
}
