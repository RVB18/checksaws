import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MulticheckComponent } from './multicheck.component';

describe('MulticheckComponent', () => {
  let component: MulticheckComponent;
  let fixture: ComponentFixture<MulticheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MulticheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MulticheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
