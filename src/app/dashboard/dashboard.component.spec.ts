import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    const routerServiceStub = () => ({
      routeToLogin: () => ({})
    });
    const authenticationServiceStub = () => ({
      isLoggedInUser: () => ({}),
      removeUserData: () => ({}),
      getCurrentUserId : () => ({}),
      getCurrentUser : () => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DashboardComponent],
      imports: [MatMenuModule],
      providers: [
        { provide: RouterService, useFactory: routerServiceStub },
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
