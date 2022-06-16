import { Component, OnInit } from '@angular/core';

import { RouterService } from '../services/router.service';
import { AuthenticationService} from '../services/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: Boolean = false;

  constructor( private authService: AuthenticationService, private routerService: RouterService) {
    this.authService.isUserLoggedIn.subscribe(value =>{
       this.isLoggedIn= value;
    });
  }

  ngOnInit() {
    this.isLoggedIn= this.authService.isLoggedInUser();
  }

  logout() {
    this.authService.removeUserData();
    this.routerService.routeToLogin();
  }

}
