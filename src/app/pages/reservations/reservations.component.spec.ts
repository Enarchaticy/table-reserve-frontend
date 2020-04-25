import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from './date-pipe/date.pipe';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationsComponent } from './reservations.component';
import { PlaceDetailsCardModule } from '../../shared/place-details-card/place-details-card.module';

describe('ReservationsComponent', () => {
  let component: ReservationsComponent;
  let fixture: ComponentFixture<ReservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PlaceDetailsCardModule, HttpClientModule],
      declarations: [ReservationsComponent, DatePipe],
      providers: [PlaceDetailsCardModule, HttpClientModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
