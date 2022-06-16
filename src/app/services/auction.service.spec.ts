import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuctionService } from './auction.service';
import { AuthenticationService } from './authentication.service';

describe('AuctionService', () => {
  beforeEach(() => {
    const authenticationServiceStub = () => ({
      getCurrentUser: () => ({}),
      getBearerToken: () => ({})
    });
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], providers: [
      AuctionService,
      {
        provide: AuthenticationService,
        useFactory: authenticationServiceStub
      }
    ]
  })});

  it('should be created', () => {
    const service: AuctionService = TestBed.get(AuctionService);
    expect(service).toBeTruthy();
  });
});
