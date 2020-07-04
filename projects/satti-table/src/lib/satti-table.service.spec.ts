import { TestBed } from '@angular/core/testing';

import { SattiTableService } from './satti-table.service';

describe('SattiTableService', () => {
  let service: SattiTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SattiTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
