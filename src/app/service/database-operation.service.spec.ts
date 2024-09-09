import { TestBed } from '@angular/core/testing';

import { DatabaseOperationService } from './database-operation.service';

describe('DatabaseOperationService', () => {
  let service: DatabaseOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
