import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuctionService } from './auction.service';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';
import { ProductBid } from '../models/productbids';

describe('AuctionService', () => {
  let injector: TestBed;
  let service: AuctionService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    const authServiceStub = () => ({
      getCurrentUser: () => ({}),
      getBearerToken: () => ({}),
      getHeaders: () => ({}),
      getCurrentUserId: () => ({})
    });
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], providers: [
      AuctionService,
      {
        provide: AuthenticationService,
        useFactory: authServiceStub
      }
    ]
  });
  injector = getTestBed();
  service = injector.get(AuctionService);
  httpMock = injector.get(HttpTestingController);
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getUsers', () => {
    it('should return an Observable<User>', () => {
      const authServiceStub: AuthenticationService = TestBed.get(
        AuthenticationService
      );
      const dummyUser = [
        { uid: 'uid1', userType: 'SELLER'}
      ];
      spyOn(authServiceStub, 'getCurrentUser').and.callThrough();
      service.getUser().subscribe(users => {
        expect(users).toEqual(dummyUser);
      });
  
      const req = httpMock.expectOne(`${environment.apiEndpoint}/query/user/${authServiceStub.getCurrentUser()}`);
      expect(req.request.method).toBe("GET");
      req.flush(dummyUser);
      httpMock.verify();
    });
  });

  describe('#getProducts', () => {
    it('should return an Observable<Array<Product>>', () => {
      const authServiceStub: AuthenticationService = TestBed.get(
        AuthenticationService
      );
      const dummyProducts:Array<Product> = [
        { productId: 0, uid: '', name:'', shortDesc: '',
         detailedDesc:'', startingPrice:0, category: '', bidEndDate: null, user: null}
      ];
      spyOn(authServiceStub, 'getCurrentUserId').and.callThrough();
      service.getProducts().subscribe(products => {
        expect(products).toEqual(dummyProducts);
      });
  
      const req = httpMock.expectOne(`${environment.apiEndpoint}/query/products/${authServiceStub.getCurrentUserId()}`);
      expect(req.request.method).toBe("GET");
      req.flush(dummyProducts);
      httpMock.verify();
    });
  });

  describe('#getBids', () => {
    it('should return an Observable<Array<ProductBid>>', () => {
      const dummyBids:Array<ProductBid> = [
        { bids: [], product: null}
      ];
      service.getBids('1').subscribe(bids => {
        expect(bids).toEqual(dummyBids);
      });
  
      const req = httpMock.expectOne(`${environment.apiEndpoint}/query/show-bids/1`);
      expect(req.request.method).toBe("GET");
      req.flush(dummyBids);
      httpMock.verify();
    });
  });

  describe('#addAuctionUser', () => {
    it('should return an Observable<string>', () => {
      const dummyResponse: any = '';
      service.addAuctionUser({}).subscribe(data => {
        expect(data).toEqual(dummyResponse);
      });
  
      const req = httpMock.expectOne(`${environment.apiEndpoint}/cmd/add-user`);
      expect(req.request.method).toBe("POST");
      req.flush(dummyResponse);
      httpMock.verify();
    });
  });

  describe('#createProduct', () => {
    it('should return an Observable<string>', () => {
      const dummyResponse: any = '';
      service.createProduct({}).subscribe(data => {
        expect(data).toEqual(dummyResponse);
      });
  
      const req = httpMock.expectOne(`${environment.apiEndpoint}/cmd/seller/add-product`);
      expect(req.request.method).toBe("POST");
      req.flush(dummyResponse);
      httpMock.verify();
    });
  });

  describe('#deleteProduct', () => {
    it('should return an Observable<string>', () => {
      const dummyResponse: any = '';
      service.deleteProduct('1').subscribe(data => {
        expect(data).toEqual(dummyResponse);
      });
  
      const req = httpMock.expectOne(`${environment.apiEndpoint}/cmd/seller/delete/1`);
      expect(req.request.method).toBe("DELETE");
      req.flush(dummyResponse);
      httpMock.verify();
    });
  });

  describe('#placeUserBid', () => {
    it('should return an Observable<string>', () => {
      const dummyResponse: any = '';
      service.placeUserBid({}).subscribe(data => {
        expect(data).toEqual(dummyResponse);
      });
  
      const req = httpMock.expectOne(`${environment.apiEndpoint}/cmd/buyer/place-bid`);
      expect(req.request.method).toBe("POST");
      req.flush(dummyResponse);
      httpMock.verify();
    });
  });

  describe('#updateUserBid', () => {
    it('should return an Observable<string>', () => {
      const dummyResponse: any = '';
      service.updateUserBid('1','email.com', 100).subscribe(data => {
        expect(data).toEqual(dummyResponse);
      });
  
      const req = httpMock.expectOne(`${environment.apiEndpoint}/cmd/buyer/update-bid/1/email.com/100`);
      expect(req.request.method).toBe("PUT");
      req.flush(dummyResponse);
      httpMock.verify();
    });
  });

});
