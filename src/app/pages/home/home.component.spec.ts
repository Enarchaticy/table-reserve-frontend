import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlaceDetailsCardModule } from './../../shared/place-details-card/place-details-card.module';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
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
        RouterTestingModule,
        PlaceDetailsCardModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
      ],
      declarations: [HomeComponent],
      providers: [
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        RouterTestingModule,
        PlaceDetailsCardModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
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
});
