import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { HelperMethodsService } from './helper-methods.service';

describe('HelperMethodsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [HttpClientModule],
  }));

  it('should be created', () => {
    const service: HelperMethodsService = TestBed.get(HelperMethodsService);
    expect(service).toBeTruthy();
  });
});
