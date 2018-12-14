import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorchecksdetailsComponent } from './vendorchecksdetails.component';

describe('VendorchecksdetailsComponent', () => {
  let component: VendorchecksdetailsComponent;
  let fixture: ComponentFixture<VendorchecksdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorchecksdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorchecksdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
