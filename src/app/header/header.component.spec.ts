import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    const routerServiceStub = () => ({ routeToLogin: () => ({}) });
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MatMenuModule],
      providers: [
        { provide: RouterService, useFactory: routerServiceStub },
        { provide: AuthenticationService, useValue: {
          isUserLoggedIn: { subscribe: () => ({}) },
          isLoggedInUser: () => ({}),
          removeUserData: () => ({}),
        } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
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
      spyOn(authenticationServiceStub, 'isLoggedInUser').and.callThrough();
      component.ngOnInit();
      expect(authenticationServiceStub.isLoggedInUser).toHaveBeenCalled();
    });
  });
  
  describe('logout', () => {
    it('makes expected calls', () => {
      const routerServiceStub: RouterService = fixture.debugElement.injector.get(
        RouterService
      );
      const authenticationServiceStub: AuthenticationService = fixture.debugElement.injector.get(
        AuthenticationService
      );
      spyOn(routerServiceStub, 'routeToLogin').and.callThrough();
      spyOn(authenticationServiceStub, 'removeUserData').and.callThrough();
      component.logout();
      expect(routerServiceStub.routeToLogin).toHaveBeenCalled();
      expect(authenticationServiceStub.removeUserData).toHaveBeenCalled();
    });
  });
});
