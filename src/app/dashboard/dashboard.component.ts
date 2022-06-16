import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthenticationService} from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isUserLoggedIn: Boolean = true;
  user: String;

  constructor(private breakpointObserver: BreakpointObserver, 
    private authService: AuthenticationService, private routerService: RouterService) {
      if(!this.authService.getCurrentUserId()) {
        this.routerService.routeToUser();
      }
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

  ngOnInit() {
    this.isUserLoggedIn= this.authService.isLoggedInUser();
    this.user = this.authService.getCurrentUser();
  }

  logout() {
    this.authService.removeUserData();
    this.routerService.routeToLogin();
  }

}
