import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlaceDetailsCardModule } from './../../shared/place-details-card/place-details-card.module';
import { NoDataAlertModule } from './../../shared/no-data-alert/no-data-alert.module';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule,
        RouterTestingModule,
        PlaceDetailsCardModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NoDataAlertModule,
      ],
      declarations: [HomeComponent],
      providers: [
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule,
        RouterTestingModule,
        PlaceDetailsCardModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NoDataAlertModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onNameChange filter places by name', () => {
    component.places = [
      { name: 'asdasd' },
      { name: 'asdqwe' },
      { name: 'qweqwe' },
      { name: 'oooo' },
      { name: 'oosss' },
    ];
    component.name = '';
    component.onNameChange();
    expect(component.placesToShow).toEqual(component.places);
    component.name = 'asd';
    component.onNameChange();
    expect(component.placesToShow).toEqual([component.places[0], component.places[1]]);
    component.name = 's';
    component.onNameChange();
    expect(component.placesToShow).toEqual([component.places[0], component.places[1], component.places[4]]);
    component.name = 'abc';
    component.onNameChange();
    expect(component.placesToShow).toEqual([]);
  });
});
