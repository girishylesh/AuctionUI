import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  beforeEach(() => {
    const authenticationServiceStub = () => ({
      getCurrentUser: () => ({}),
      getBearerToken: () => ({})
    });
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], providers: [
      {
        provide: AuthenticationService,
        useFactory: authenticationServiceStub
      }
    ]
  })});

  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });

  
});
