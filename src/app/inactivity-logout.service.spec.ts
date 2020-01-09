import { TestBed } from '@angular/core/testing';

import { InactivityLogoutService } from './inactivity-logout.service';

describe('InactivityLogoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InactivityLogoutService = TestBed.get(InactivityLogoutService);
    expect(service).toBeTruthy();
  });
});
