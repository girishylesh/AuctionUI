import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService} from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { User } from '../models/user';
import { AuctionService } from '../services/auction.service';
import { MatSnackBar } from '@angular/material';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;
  errorMessage: string;
  showSpinner: boolean;
  types: string[] = ['SELLER', 'BUYER'];
  regComplete: boolean = false;
  userForm: FormGroup = new FormGroup(
    {
      firstName: new FormControl(),
      lastName: new FormControl(),
      address: new FormControl(),
      state: new FormControl(),
      city: new FormControl(),
      pin: new FormControl(),
      phone: new FormControl({value: '', disabled: false}, [Validators.required, Validators.pattern('^[0-9]*$')]),
      email: new FormControl({value: '', disabled: true}, Validators.email),
      userType: new FormControl()
    }
  );

  constructor(private authService: AuthenticationService, 
    private auctionService: AuctionService,  private routerService: RouterService,
    private _snackBar: MatSnackBar,) { 
    if(this.authService.getCurrentUserId()) {
      this.regComplete = true;
    }
  }


  ngOnInit() {
    if(!this.authService.getCurrentUserId()) {
      this.userForm.patchValue(
        {
          email: this.authService.getCurrentUser()
        }
      );
    } else {
      this.showSpinner=true;
      this.auctionService.getUser().subscribe(
        data => {
          this.userForm.patchValue(
          {
            firstName: data['firstName'],
            lastName: data['lastName'],
            address: data['address'],
            city: data['city'],
            state: data['city'],
            pin: data['pin'],
            phone: data['phone'],
            email: data['email'],
            userType: data['userType']
          });
        },
        error => {
          this.openSnackBar(this.errorMessage,"Close");
        }        
      ).add(() => {
        this.showSpinner=false;
      });
    }  
  }

  userSubmit() {   
    this.showSpinner=true;
    this.auctionService.addAuctionUser(this.userForm.getRawValue()).subscribe(
      data => {
        this.openSnackBar("User registration completed","Close");
        this.errorMessage = '';
      },
      error => {
        if (error.status === 400) {
          this.errorMessage = "User already exist";
        }else if (error.status === 404) {
          this.errorMessage = "User not found";
        }else {
          this.errorMessage = error.message;
        }
        this.openSnackBar(this.errorMessage,"Close");
      }
    ).add( () => {
      this.showSpinner=false;
      if(this.errorMessage === '') {
        delay(2000);
        this.auctionService.getUser().subscribe(
          data => {
            this.authService.setCurrentUserDetail(data['uid'], data['userType']);
            this.routerService.routeToDashboard();
          },
          error => {
            this.authService.removeUserData();
            this.routerService.routeToLogin();
          }
        );
      }

    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  } 
}
