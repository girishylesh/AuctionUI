import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AuthenticationService} from './services/authentication.service';
import { RouterService} from './services/router.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private routerService: RouterService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const promiseResult = this.authenticationService.isUserAuthenticated(this.authenticationService.getBearerToken());

    return promiseResult
    .then((authenticated) => {
      if (!authenticated) {
        this.routerService.routeToLogin();
      }
      return authenticated;
    });
  }
}
