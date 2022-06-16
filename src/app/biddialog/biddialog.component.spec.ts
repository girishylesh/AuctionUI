import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MatTableModule, MAT_DIALOG_DATA } from '@angular/material';

import { BiddialogComponent } from './biddialog.component';

describe('BiddialogComponent', () => {
  let component: BiddialogComponent;
  let fixture: ComponentFixture<BiddialogComponent>;
  const dialogMock = {
    close: () => { },
    save: () => { }
  };
    
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatTableModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ BiddialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('saveAndClose', () => {
    it('makes expected calls', () => {
      component.save();
      component.close();
    });
  });

});
