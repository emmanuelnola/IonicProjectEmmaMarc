import { TestBed } from '@angular/core/testing';

import { GadgetsService } from './gadgets.service';

describe('GadgetsService', () => {
  let service: GadgetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GadgetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
