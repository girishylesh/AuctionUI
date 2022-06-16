import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { MatSnackBar } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';
import { AuctionService } from '../services/auction.service';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    const routerServiceStub = () => ( {routeToLogin: () => ({}),
    routeToDashboard: () => ({})});
    const authenticationServiceStub = () => ({
      isLoggedInUser: () => ({}),
      removeUserData: () => ({}),
      getCurrentUserId : () => ({}),
      setBearerToken: () => ({}),
      setCurrentUser: () => ({}),
      setCurrentUserDetail: () => ({}),
      setIsUserLoggedIn: () => ({}),
      registerUser: () => ({ subscribe: () => ({ add: () => ({}) }) }),
      authenticateUser: () => ({ subscribe: () => ({ add: () => ({}) }) })
    });
    const auctionServiceStub = () => ({
      getUser: () => of([])
    });
    const matSnackBarStub = () => ({ open: (message, action, object) => ({}) });
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      providers: [
        { provide: MatSnackBar, useFactory: matSnackBarStub },
        { provide: RouterService, useFactory: routerServiceStub },
        { provide: AuthenticationService, useFactory: authenticationServiceStub },
        { provide: AuctionService, useFactory: auctionServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const authenticationServiceStub: AuthenticationService = fixture.debugElement.injector.get(
        AuthenticationService
      );
      const routerServiceStub: RouterService = fixture.debugElement.injector.get(
        RouterService
      );
      spyOn(authenticationServiceStub, 'isLoggedInUser').and.callThrough();
      spyOn(routerServiceStub, 'routeToDashboard').and.callThrough();
      component.ngOnInit();
      expect(authenticationServiceStub.isLoggedInUser).toHaveBeenCalled();
      expect(routerServiceStub.routeToDashboard).toHaveBeenCalled();
    });
  });

  describe('loginSubmitSuccess', () => {
    it('makes expected calls', () => {
      const authenticationServiceStub: AuthenticationService = fixture.debugElement.injector.get(
        AuthenticationService
      );
      const auctionServiceStub: AuctionService = fixture.debugElement.injector.get(
        AuctionService
      );
      const response: any = {token: '', currentUser: ''};
      spyOn(authenticationServiceStub, 'authenticateUser').and.returnValue(of(response))
      spyOn(authenticationServiceStub, 'setBearerToken').and.callThrough();
      spyOn(authenticationServiceStub, 'setCurrentUser').and.callThrough();
      const data: any = {uuid: '', userType: ''};
      spyOn(auctionServiceStub, 'getUser').and.returnValue(of(data))

      component.loginSubmit();
      expect(authenticationServiceStub.authenticateUser).toHaveBeenCalled();
      expect(auctionServiceStub.getUser).toHaveBeenCalled();
    });
  });

  describe('loginSubmitError', () => {
    it('makes expected calls', () => {
      const authenticationServiceStub: AuthenticationService = fixture.debugElement.injector.get(
        AuthenticationService
      );
      spyOn(authenticationServiceStub, 'authenticateUser').and.returnValue(throwError({status: 404}));
      component.loginSubmit();
      expect(authenticationServiceStub.authenticateUser).toHaveBeenCalled();      
    });
  });

  describe('registerSubmit', () => {
    it('makes expected calls', () => {
      const authenticationServiceStub: AuthenticationService = fixture.debugElement.injector.get(
        AuthenticationService
      );
      const response: any = ''
      spyOn(authenticationServiceStub, 'registerUser').and.returnValue(of(response))
      component.registerSubmit();
      expect(authenticationServiceStub.registerUser).toHaveBeenCalled();
    });
  });

  describe('registerSubmitError', () => {
    it('makes expected calls', () => {
      const authenticationServiceStub: AuthenticationService = fixture.debugElement.injector.get(
        AuthenticationService
      );
      spyOn(authenticationServiceStub, 'registerUser').and.returnValue(throwError({status: 409}));
      component.registerSubmit();
      expect(authenticationServiceStub.registerUser).toHaveBeenCalled();
    });
  });

  describe('otherMethods', () => {
    it('makes expected calls', () => {
      component.showHideContent();
      component.onPasswordInput();
    });
  });
});
