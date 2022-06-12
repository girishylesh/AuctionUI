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
    @Inject(MAT_DIALOG_DATA) data) { 

      this.bidForm = bf.group({
        productName:  new FormControl({value: data['name'], disabled: true}, [Validators.required, Validators.pattern("^[0-9]*$")]),
        bidAmount: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")])
      });
  }

  ngOnInit() {
  }

  save() {
    const {value, valid} = this.bidForm;
    console.log(valid);
    if(valid) {
        this.dialogRef.close(value);
    }
  }

  close() {
      this.dialogRef.close();
  }

}
