import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material';
import { of, throwError } from 'rxjs';
import { AuctionService } from '../services/auction.service';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    const routerServiceStub = () => ({ routeToLogin: () => ({}),
    routeToDashboard: () =>({}) });
    const authenticationServiceStub = () => ({
      isUserLoggedIn: { subscribe: () => ({}) },
      isLoggedInUser: () => ({}),
      removeUserData: () => ({}),
      setCurrentUserDetail: () => ({}),
      getCurrentUserId : () => ({})
    });
    const auctionServiceStub = () => ({
      getUser: () => of([]),
      addAuctionUser: () => of([])
    });
    const matSnackBarStub = () => ({ open: (message, action, object) => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ UserComponent ],
      providers: [
        { provide: MatSnackBar, useFactory: matSnackBarStub },
        { provide: RouterService, useFactory: routerServiceStub },
        { provide: AuctionService, useFactory: auctionServiceStub },
        { provide: AuthenticationService, useFactory: authenticationServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('AddAuctionUser', () => {
    it('makes expected calls', () => {
      const auctionServiceStub: AuctionService = fixture.debugElement.injector.get(
        AuctionService
      );
      const response: any = {};
      const data: any = {uuid: '', userType: ''};
      spyOn(auctionServiceStub, 'addAuctionUser').and.returnValue(of(response))
      spyOn(auctionServiceStub, 'getUser').and.returnValue(of(data))

      component.userSubmit();
      expect(auctionServiceStub.addAuctionUser).toHaveBeenCalled();
      expect(auctionServiceStub.getUser).toHaveBeenCalled();
    });
  });

  describe('loginSubmitError', () => {
    it('makes expected calls', () => {
      const auctionServiceStub: AuctionService = fixture.debugElement.injector.get(
        AuctionService
      );
      spyOn(auctionServiceStub, 'addAuctionUser').and.returnValue(throwError({status: 400}));
      component.userSubmit();
      expect(auctionServiceStub.addAuctionUser).toHaveBeenCalled();      
    });
  });
});
