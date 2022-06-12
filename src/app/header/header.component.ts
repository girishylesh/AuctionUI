import { Component, OnInit } from '@angular/core';

import { RouterService } from '../services/router.service';
import { AuthenticationService} from '../services/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn: Boolean = false;

  constructor( private authService: AuthenticationService, private routerService: RouterService) {
    this.authService.isUserLoggedIn.subscribe(value =>{
       this.isUserLoggedIn= value;
    });
  }

  ngOnInit() {
    this.isUserLoggedIn= this.authService.isLoggedInUser();
  }

  logout() {
    this.authService.removeUserData();
    this.routerService.routeToLogin();
  }

}
