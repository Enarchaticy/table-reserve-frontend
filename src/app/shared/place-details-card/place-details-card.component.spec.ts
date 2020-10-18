import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceDetailsCardComponent } from './place-details-card.component';
import { MatCardModule } from '@angular/material/card';

describe('PlaceDetailsCardComponent', () => {
  let component: PlaceDetailsCardComponent;
  let fixture: ComponentFixture<PlaceDetailsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, RouterTestingModule],
      declarations: [PlaceDetailsCardComponent],
      providers: [MatCardModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceDetailsCardComponent);
    component = fixture.componentInstance;
    component.place = { id: 'asd', name: 'asd', time: 'asd' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigateToThePlace set localStorage date correctly', () => {
    component.navigateToThePlace();
    expect(localStorage.getItem('placeId')).toBe('asd');
    expect(localStorage.getItem('date')).toBe('undefined');
    component.date = '2020.06.18T15:11:00.000';
    component.navigateToThePlace();
    expect(localStorage.getItem('date')).toBe('2020.06.18T15:11:00.000');
  });
});
