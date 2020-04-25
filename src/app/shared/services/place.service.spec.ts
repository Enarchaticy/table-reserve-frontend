import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PlaceService } from './place.service';

describe('PlaceService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: PlaceService = TestBed.get(PlaceService);
    expect(service).toBeTruthy();
  });
});
