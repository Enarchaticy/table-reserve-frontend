import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { TableService } from './table.service';

describe('TableService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: TableService = TestBed.get(TableService);
    expect(service).toBeTruthy();
  });
});
