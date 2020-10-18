import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCardModule,
        MatSnackBarModule,
        HttpClientModule,
      ],
      declarations: [SettingsComponent],
      providers: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCardModule,
        MatSnackBarModule,
        HttpClientModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the form if the new passwords aren\' the same', () => {
    component.passwordChangeForm.value.newPassword = 'asdasd';
    component.passwordChangeForm.value.newPasswordAgain = 'asdasd';
    component.checkNewPasswords();
    expect(component.passwordChangeForm.value.newPassword).toBe('asdasd');
    component.passwordChangeForm.value.newPasswordAgain = 'qweqwe';
    component.checkNewPasswords();
    expect(component.passwordChangeForm.value.newPassword).toBe('');
  });
});
