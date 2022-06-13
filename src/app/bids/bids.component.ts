import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSnackBar, MatTableDataSource } from '@angular/material';
import { AuthenticationService} from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { AuctionService } from '../services/auction.service'
import { Product } from '../models/product';
import { DatePipe } from '@angular/common'
import { BiddialogComponent } from '../biddialog/biddialog.component';
import { ProductBid } from '../models/productbids';

@Component({
  selector: 'app-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.css']
})
export class BidsComponent implements OnInit {

  dataSource = new MatTableDataSource();

  bids: Array<ProductBid> = [];
  product: Product;
  errorMessage: string;
  displayedColumns: string[] = ['sellerName', 'productName', 'bidEndDate', 'startingPrice', 'bidAmount'];
  isSeller: boolean;
  isBuyer: boolean;

  constructor(private authService: AuthenticationService, private routerService: RouterService,
    private auctionService: AuctionService,  private _snackBar: MatSnackBar, private datepipe: DatePipe,
    public dialog: MatDialog) { 
      this.isSeller = auctionService.isSeller();
      this.isBuyer = auctionService.isBuyer();
      if(this.isBuyer) {
        this.displayedColumns.push('updateBid');
      }
    }

    ngOnInit() {
      this.auctionService.getBids(this.authService.getCurrentUserId()).subscribe(
        data => {
          console.log(data);
          this.bids = data['bids'];
          this.product = data['product'];
          this.dataSource.data=this.bids;
        },
        error => {
          this.errorMessage = error.message;
          this.bids = [];
          this.dataSource.data=this.bids;
        }
      );
    }

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 3000
      });
    }
  
    updateBid(product: any) {
      const dialogConfig = new MatDialogConfig();
  
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = product;
  
      const dialogRef = this.dialog.open(BiddialogComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe(
        data => {
          this.auctionService.updateBid(product['uid'], this.authService.getCurrentUserId(), data['bidAmount']).subscribe(
            data => {
              this.openSnackBar("Bid updated","Close");
            },
            error => {
              this.errorMessage = error.status + " : " + error.error;
              this.openSnackBar(this.errorMessage,"Close");
            }
          );
        }    
      );
   }
}
