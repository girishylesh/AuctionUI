import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MatSnackBar, MatTableModule } from '@angular/material';
import { of, throwError } from 'rxjs';
import { AuctionService } from '../services/auction.service';
import { AuthenticationService } from '../services/authentication.service';

import { BidsComponent } from './bids.component';

describe('BidsComponent', () => {
  let component: BidsComponent;
  let fixture: ComponentFixture<BidsComponent>;
  const dialogMock = {
    open: () => { },
    afterClosed: () => { }
  };

  beforeEach(async(() => {
    const authenticationServiceStub = () => ({
      isUserLoggedIn: () => of([]),
      isLoggedInUser: () => ({}),
      removeUserData: () => ({}),
      getCurrentUserId: () => ({}),
      getCurrentUser: () => ({}) 
    });
    const auctionServiceStub = () => ({
      isSeller: () => ({}),
      isBuyer: () => ({}),
      getBids: () => of([]),
      updateUserBid: () => of([])
    });
    const matSnackBarStub = () => ({ open: (message, action, object) => ({}) });
    TestBed.configureTestingModule({
      imports: [
        MatTableModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ BidsComponent ],
      providers: [
        { provide: MatSnackBar, useFactory: matSnackBarStub },
        { provide: AuthenticationService, useFactory: authenticationServiceStub },
        { provide: AuctionService, useFactory: auctionServiceStub },
        { provide: MatDialog, useValue: dialogMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Update Bid', () => {
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
      spyOn(auctionServiceStub, 'updateUserBid').and.returnValue(of(data))
      component.updateBid(bid);
      expect(auctionServiceStub.updateUserBid).toHaveBeenCalled();
    });
  });

  describe('Load Bid', () => {
    it('makes expected calls', () => {
      const auctionServiceStub: AuctionService = fixture.debugElement.injector.get(
        AuctionService
      );
      spyOn(auctionServiceStub, 'getBids').and.returnValue(throwError({status: 500}));
      component.loadBids();
      expect(auctionServiceStub.getBids).toHaveBeenCalled(); 
    });
  });
});
