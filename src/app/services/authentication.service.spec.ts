import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';

describe('AuthenticationService', () => {
  let injector: TestBed;
  let service: AuthenticationService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [ AuthenticationService ]
  });
  injector = getTestBed();
  service = injector.get(AuthenticationService);
  httpMock = injector.get(HttpTestingController);
});

  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });

  describe('#authenticateUser', () => {
    it('should return an Observable<string>', () => {
      const dummyResponse: any = {};
      service.authenticateUser({}).subscribe(data => {
        expect(data).toEqual(dummyResponse);
      });
  
      const req = httpMock.expectOne(`${environment.apiEndpoint}/auth/login`);
      expect(req.request.method).toBe("POST");
      req.flush(dummyResponse);
      httpMock.verify();
    });
  });

  describe('#registerUser', () => {
    it('should return an Observable<any>', () => {
      const dummyResponse: any = '';
      service.registerUser({}).subscribe(data => {
        expect(data).toEqual(dummyResponse);
      });
  
      const req = httpMock.expectOne(`${environment.apiEndpoint}/auth/register`);
      expect(req.request.method).toBe("POST");
      req.flush(dummyResponse);
      httpMock.verify();
    });
  });

  describe('#other', () => {
    it('should call methods', () => {
      service.setBearerToken('');
      service.setCurrentUser('');
      service.setCurrentUserDetail('', '');
      expect(service.getBearerToken()).toEqual('');
      expect(service.getCurrentUser()).toEqual('');
      expect(service.getCurrentUserId()).toEqual('');
      expect(service.getCurrentUserType()).toEqual('');
      service.removeUserData();
      expect(service.getCurrentUser()).toEqual(null);
      expect(service.isLoggedInUser()).toEqual(false);
      service.getHeaders();
      service.setIsUserLoggedIn(true);
      expect(service.isUserLoggedIn.value).toEqual(true);
    });
  });
})
