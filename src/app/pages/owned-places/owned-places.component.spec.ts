import { NoDataAlertModule } from './../../shared/no-data-alert/no-data-alert.module';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaceDetailsCardModule } from './../../shared/place-details-card/place-details-card.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { OwnedPlacesComponent } from './owned-places.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('OwnedPlacesComponent', () => {
  let component: OwnedPlacesComponent;
  let fixture: ComponentFixture<OwnedPlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule,
        PlaceDetailsCardModule,
        NoDataAlertModule,
        HttpClientModule
      ],
      declarations: [ OwnedPlacesComponent ],
      providers: [
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule,
        PlaceDetailsCardModule,
        NoDataAlertModule,
        HttpClientModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnedPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
