import { TestBed } from '@angular/core/testing';

import { ParyService } from './pary.service';

describe('ParyService', () => {
  let service: ParyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
