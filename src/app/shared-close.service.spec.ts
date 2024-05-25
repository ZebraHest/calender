import { TestBed } from '@angular/core/testing';

import { SharedCloseService } from './shared-close.service';

describe('SharedCloseService', () => {
  let service: SharedCloseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedCloseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
