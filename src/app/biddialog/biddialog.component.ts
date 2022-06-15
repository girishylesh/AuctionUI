import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-biddialog',
  templateUrl: './biddialog.component.html',
  styleUrls: ['./biddialog.component.css']
})
export class BiddialogComponent implements OnInit {
  bidForm: FormGroup;
  
  constructor(private bf: FormBuilder,
    private dialogRef: MatDialogRef<BiddialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) { 
      let bidAmt: number;
      if(data['isUpdate']) {
        bidAmt = data['bidAmount']
      } else {
        bidAmt = data['startingPrice']
      }
      this.bidForm = bf.group({
        productName:  new FormControl({value: data['name'], disabled: true}, [Validators.required]),
        bidAmount: new FormControl({value: bidAmt, disabled: false}, [Validators.required, Validators.pattern('^[0-9]*$')])
      });
  }

  ngOnInit() {
  }

  save() {
    const {value, valid} = this.bidForm;
    if(valid) {
        this.dialogRef.close(value);
    }
  }

  close() {
      this.dialogRef.close();
  }

}
