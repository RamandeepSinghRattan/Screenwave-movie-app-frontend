import { TestBed } from '@angular/core/testing';

import { TmdbOperationService } from './tmdb-operation.service';

describe('TmdbOperationService', () => {
  let service: TmdbOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmdbOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
