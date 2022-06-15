import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule,MatMenuModule, MatIconModule, MatInputModule, MatButtonModule, 
  MatDialogModule, MatSidenavModule, MatListModule, MatDatepickerModule, MatSelectModule,
  MatNativeDateModule, MatExpansionModule, MatTableModule, MatDividerModule, MatProgressBarModule, 
  MatTooltipModule, MatChipsModule, MatSnackBarModule, MatFormFieldModule, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { AuthenticationService} from './services/authentication.service';
import { RouterService} from './services/router.service';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { BidsComponent } from './bids/bids.component';
import { DatePipe } from '@angular/common';
import { BiddialogComponent } from './biddialog/biddialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    UserComponent,
    ProductComponent,
    BidsComponent,
    BiddialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatExpansionModule,
    MatDividerModule,
    MatTableModule,
    MatChipsModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthenticationService,
    RouterService,
    CanActivateRouteGuard,
    DatePipe,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  entryComponents: [
    BiddialogComponent
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
