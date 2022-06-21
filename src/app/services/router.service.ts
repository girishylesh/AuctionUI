import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class RouterService {

  constructor(private router: Router,private authService: AuthenticationService) { }

  routeToLogin() {
    this.authService.isUserLoggedIn.next(false);
    this.router.navigate(['login']);
  }

  routeToDashboard() {
    this.router.navigate(['dashboard']);
  }

  routeToUser() {
    this.router.navigate(['user']);
  }

  routeToProduct() {
    this.router.navigate(['dashboard/product']);
  }

}
