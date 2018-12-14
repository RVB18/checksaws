import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Multicheck2Component } from './multicheck2.component';

describe('Multicheck2Component', () => {
  let component: Multicheck2Component;
  let fixture: ComponentFixture<Multicheck2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Multicheck2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Multicheck2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
