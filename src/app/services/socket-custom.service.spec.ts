import { TestBed } from '@angular/core/testing';

import { SocketCustomService } from './socket-custom.service';

describe('SocketCustomService', () => {
  let service: SocketCustomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketCustomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
