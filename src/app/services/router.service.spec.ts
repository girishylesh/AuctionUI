import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { RouterService } from './router.service';
describe('RouterService', () => {
  let service: RouterService;
  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const authenticationServiceStub = () => ({
      isUserLoggedIn: { next: () => ({}) }
    });
    TestBed.configureTestingModule({
      providers: [
        RouterService,
        { provide: Router, useFactory: routerStub },
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        }
      ]
    });
    service = TestBed.get(RouterService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
