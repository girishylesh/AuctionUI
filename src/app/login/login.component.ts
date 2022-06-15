import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService} from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { AuctionService } from '../services/auction.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  toggleDiv: Boolean = true;
  submitMessage: string;
  errorMessage: string;
  showSpinner: Boolean = false;
  auctionUser: any;
  minLen = 8;

  constructor(private _snackBar: MatSnackBar, private formBuilder: FormBuilder, 
    private authService: AuthenticationService, private routerService: RouterService,
    private auctionService: AuctionService) { }

  ngOnInit() {
    if(this.authService.isLoggedInUser() && this.authService.getCurrentUserId()) {
      this.routerService.routeToDashboard();
    } else {
      this.routerService.routeToUser();
    }
  }

  loginForm: FormGroup = new FormGroup(
    {
      userId: new FormControl(),
      userPassword: new FormControl(),
    }
  );

  registerForm: FormGroup =this.formBuilder.group({
    userId: new FormControl(),
    userPassword: ['', [Validators.required, Validators.minLength(this.minLen)]],
    confirmPassword: ['', [Validators.required]],
    userRole: new FormControl()
  }, {validator: passwordMatchValidator});

  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  /* Called on each input in either password field */
  onPasswordInput() {
    if (this.registerForm.hasError('passwordMismatch'))
      this.confirmPassword.setErrors([{'passwordMismatch': true}]);
    else
      this.confirmPassword.setErrors(null);
  }

  showHideContent()
  {
    this.errorMessage ="";
    this.submitMessage ="";
    this.toggleDiv=this.toggleDiv?false:true;
  }

  loginSubmit() {
    this.showSpinner=true;
    this.authService.authenticateUser(this.loginForm.value).subscribe(
      data => {
        this.errorMessage = '';
        this.authService.setBearerToken(data['token']);
        this.authService.setCurrentUser(data['currentUser']);
        this.authService.isUserLoggedIn.next(true);       
      },
      error => {
        if (error.status === 401) {
          this.errorMessage = "Invalid credentials";
        } if (error.status === 0) {
          this.errorMessage = "Could not connect to backend server";
        } else {
          this.errorMessage = error.message;
        }
        this.loginForm.reset();
        Object.keys(this.loginForm.controls).forEach(key => {
          this.loginForm.controls[key].setErrors(null)
        });
        this.openSnackBar(this.errorMessage,"Close");
      }
    ).add(() => {
      this.showSpinner = false;
      if(this.errorMessage === '') {
        this.showSpinner = true;
        this.auctionService.getUser().subscribe(
          data => {
            this.authService.setCurrentUserDetail(data['uid'], data['userType']);
            this.routerService.routeToDashboard();
          },
          error => {
            if (error.status === 404) {
              this.routerService.routeToUser();
            } else {
              this.openSnackBar(error.message,"Close");
            }
          }
        ).add(() => {
          this.showSpinner = false;
        });
      }
    });
  }

  registerSubmit() {
    this.showSpinner=true;
    this.authService.registerUser(this.registerForm.value).subscribe(
      data => {
        this.submitMessage = "Registered succesfully. Login to continue.";
        this.registerForm.reset();
        this.toggleDiv=true;
        this.openSnackBar(this.submitMessage,"Close");
      },
      error => {
        if (error.status === 409) {
          this.errorMessage = "User already exist.";
        }else {
          this.errorMessage = error.message;
        }
        this.openSnackBar(this.errorMessage,"Close");
      }
    ).add(() => {
      this.showSpinner=false;
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }  
  
}

export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  return formGroup.get('userPassword').value === formGroup.get('confirmPassword').value ?
    null : { 'passwordMismatch': true };
}
