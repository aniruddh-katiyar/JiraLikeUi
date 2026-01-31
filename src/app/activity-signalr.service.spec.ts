import { TestBed } from '@angular/core/testing';

import { ActivitySignalrService } from './activity-signalr.service';

describe('ActivitySignalrService', () => {
  let service: ActivitySignalrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivitySignalrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
