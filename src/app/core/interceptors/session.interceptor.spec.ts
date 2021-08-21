import { TestBed } from '@angular/core/testing';

import { SessionInterceptor } from './session.interceptor';

describe('SessionInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SessionInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SessionInterceptor = TestBed.inject(SessionInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
