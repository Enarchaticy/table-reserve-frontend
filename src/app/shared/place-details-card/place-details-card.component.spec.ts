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
});
