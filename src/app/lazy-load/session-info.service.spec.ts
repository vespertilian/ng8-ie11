import { TestBed } from '@angular/core/testing';

import { SessionInfoService } from './session-info.service';

describe('SessionInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessionInfoService = TestBed.get(SessionInfoService);
    expect(service).toBeTruthy();
  });
});
