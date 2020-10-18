import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSnackBarModule,
        MatIconModule,
        MatCardModule,
        HttpClientModule,
        RouterTestingModule,
      ],
      declarations: [AuthComponent],
      providers: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSnackBarModule,
        MatIconModule,
        MatCardModule,
        HttpClientModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should changeFunction set the correct form', () => {
    expect(component.isLogin).toBeTruthy();
    expect(component.loginForm.value).toEqual({ email: '', password: '' });
    expect(component.signInForm).toBe(undefined);
    component.changeFunction();
    expect(component.isLogin).toBeFalsy();
    expect(component.signInForm.value).toEqual({ email: '', name: '', password: '', passwordAgain: '' });
    component.changeFunction();
    expect(component.isLogin).toBeTruthy();
  });

  it('should signIn check if passwords the same', () => {
    component.changeFunction();
    component.signInForm.value.email = 'asd@asd.asd';
    component.signInForm.value.name = 'asd';
    component.signInForm.value.password = 'asdasd';
    component.signInForm.value.passwordAgain = 'asdasd';

    component.signIn();
    expect(component.signInForm.value.passwordAgain).toBe(undefined);
    component.signInForm.value.passwordAgain = 'asdqwe';
    component.signIn();
    expect(component.signInForm.value.passwordAgain).toBe('asdqwe');
  });
});
