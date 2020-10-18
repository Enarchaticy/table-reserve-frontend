import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { OVERLAY_PROVIDERS } from '@angular/cdk/overlay';
import { RouterTestingModule } from '@angular/router/testing';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProfileComponent } from './delete-profile.component';

describe('DeleteProfileComponent', () => {
  let component: DeleteProfileComponent;
  let fixture: ComponentFixture<DeleteProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        RouterTestingModule,
        HttpClientModule,
        MatSnackBarModule,
      ],
      declarations: [DeleteProfileComponent],
      providers: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        RouterTestingModule,
        HttpClientModule,
        MatSnackBarModule,
        OVERLAY_PROVIDERS,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
