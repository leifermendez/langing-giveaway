import { TestBed } from '@angular/core/testing';

import { GetRaffleService } from './get-raffle.service';

describe('GetRaffleService', () => {
  let service: GetRaffleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetRaffleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
