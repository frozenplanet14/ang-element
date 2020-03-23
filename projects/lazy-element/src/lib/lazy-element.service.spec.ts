import { TestBed } from '@angular/core/testing';

import { LazyElementService } from './lazy-element.service';

describe('LazyElementService', () => {
  let service: LazyElementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LazyElementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
