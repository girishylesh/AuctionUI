import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddialogComponent } from './biddialog.component';

describe('BiddialogComponent', () => {
  let component: BiddialogComponent;
  let fixture: ComponentFixture<BiddialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiddialogComponent ]
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
});
