import { DatePipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MatSnackBar, MatTableModule } from '@angular/material';
import { of, throwError } from 'rxjs';
import { AuctionService } from '../services/auction.service';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  const dialogMock = {
    open: () => { },
    afterClosed: () => { }
  };
  beforeEach(async(() => {
    const routerServiceStub = () => ({ routeToLogin: () => ({}),
    routeToDashboard: () =>({}) }),
     authenticationServiceStub = () => ({
      isUserLoggedIn: { subscribe: () => ({}) },
      isLoggedInUser: () => ({}),
      removeUserData: () => ({}),
      getCurrentUserId : () => ({})
    }),
    auctionServiceStub = () => ({
      getUser: () => of([]),
      isSeller: () => ({}),
      isBuyer: () => ({}),
      getProducts: () => of([]),
      createProduct: () => of([]),
      placeUserBid: () => of([]),
      deleteProduct: () => of([])
    }),
    matSnackBarStub = () => ({ open: (message, action, object) => ({}) }),
    datePipeStub = () => ({
      transform: () => of([])
    }),
    matDialogStub = () => ({})
    TestBed.configureTestingModule({
      declarations: [ ProductComponent ],
      imports: [MatTableModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MatSnackBar, useFactory: matSnackBarStub },
        { provide: RouterService, useFactory: routerServiceStub },
        { provide: AuctionService, useFactory: auctionServiceStub },
        { provide: AuthenticationService, useFactory: authenticationServiceStub },
        { provide: DatePipe, useFactory: datePipeStub },
        { provide: MatDialog, useValue: dialogMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('productSubmitSuccess', () => {
    it('makes expected calls', () => {
      const auctionServiceStub: AuctionService = fixture.debugElement.injector.get(
        AuctionService
      );
      const data: any = '';
      spyOn(auctionServiceStub, 'createProduct').and.returnValue(of(data))

      component.productSubmit();
      expect(auctionServiceStub.createProduct).toHaveBeenCalled();
    });
  });

  describe('productSubmitError', () => {
    it('makes expected calls', () => {
      const auctionServiceStub: AuctionService = fixture.debugElement.injector.get(
        AuctionService
      );
      const data: any = '';
      spyOn(auctionServiceStub, 'createProduct').and.returnValue(throwError({status: 400}));

      component.productSubmit();
      expect(auctionServiceStub.createProduct).toHaveBeenCalled();
    });
  });

  describe('PlaceBid', () => {
    it('makes expected calls', () => {
      const auctionServiceStub: AuctionService = fixture.debugElement.injector.get(
        AuctionService
      );

      const matDialogStub: MatDialog = fixture.debugElement.injector.get(
        MatDialog
      );
      const bid: any = {product: {}, bidAmount: 100}
      spyOn(matDialogStub, 'open').and.returnValue({afterClosed: () => of(true)
        } as MatDialogRef<typeof component>);
      const data: any='';
      spyOn(auctionServiceStub, 'placeUserBid').and.returnValue(of(data))
      component.placeBid(bid);
      expect(auctionServiceStub.placeUserBid).toHaveBeenCalled();
    });
  });

  describe('RemoveProduct', () => {
    it('makes expected calls', () => {
      const auctionServiceStub: AuctionService = fixture.debugElement.injector.get(
        AuctionService
      );
      const data: any = '';
      spyOn(auctionServiceStub, 'deleteProduct').and.returnValue(of(data))

      component.removeProduct('uid1');
      expect(auctionServiceStub.deleteProduct).toHaveBeenCalled();
    });
  });

});
