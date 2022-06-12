import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { MatDialog, MatDialogConfig, MatSnackBar, MatTableDataSource } from '@angular/material';
import { AuthenticationService} from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { AuctionService } from '../services/auction.service'
import { Product } from '../models/product';
import { DatePipe } from '@angular/common'
import { BiddialogComponent } from '../biddialog/biddialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  dataSource = new MatTableDataSource();

  productsArr: Array<Product> = [];
  errorMessage: string;
  submitMessage: string;
  categories: string[] = ['PAINTING', 'SCULPTOR', 'ORNAMENT'];
  displayedColumns: string[] = ['name','shortDesc', 'detailedDesc', 'startingPrice', 'category', 'bidEndDate', 'placebid'];
  
  constructor(private authService: AuthenticationService, private routerService: RouterService,
    private auctionService: AuctionService,  private _snackBar: MatSnackBar, private datepipe: DatePipe,
    public dialog: MatDialog) { }
  
  productForm: FormGroup = new FormGroup(
    {
      productId: new FormControl(),
      uid: new FormControl(),
      name: new FormControl(),
      shortDesc: new FormControl(),
      detailedDesc: new FormControl(),
      startingPrice: new FormControl(),
      category: new FormControl(),
      bidEndDate: new FormControl(),
    }
  );  

  ngOnInit() {
    this.auctionService.getProducts().subscribe(
      data => {
        this.productsArr = data;
        this.dataSource.data=this.productsArr;
      },
      error => {
        this.errorMessage = error.message;
        this.productsArr = [];
        this.dataSource.data=this.productsArr;
      }
    );
  }

  productSubmit(){
    this.productForm.patchValue({uid: this.authService.getCurrentUserId()});
    this.productForm.patchValue({bidEndDate: this.datepipe.transform(this.productForm.get('bidEndDate').value, 'yyyy-MM-dd')});
    this.auctionService.createProduct(this.productForm.value).subscribe(
      data => {
        this.productsArr.push(this.productForm.value);
        this.dataSource.data=this.productsArr;
        this.productForm.reset();
        Object.keys(this.productForm.controls).forEach(key => {
          this.productForm.controls[key].setErrors(null)
        });
        this.openSnackBar("Product added.","Close");
      },
      error => {
        if (error.status === 409) {
          this.errorMessage = "Product already exist";
        } else {
          this.errorMessage = error.status + " : " + error.message;
        }
        this.openSnackBar(this.errorMessage,"Close");
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  placeBid(product: any) {
    console.log(product);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = product;

    const dialogRef = this.dialog.open(BiddialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog output:", data)
    );

  }

}