import { TestBed } from '@angular/core/testing';
import { OverlayModule } from '@angular/cdk/overlay';
import { DialogService } from './dialog.service';

describe('DialogService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [OverlayModule],
      providers: [OverlayModule],
    })
  );

  it('should be created', () => {
    const service: DialogService = TestBed.get(DialogService);
    expect(service).toBeTruthy();
  });
});
