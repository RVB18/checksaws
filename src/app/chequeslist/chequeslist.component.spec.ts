import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeslistComponent } from './chequeslist.component';

describe('ChequeslistComponent', () => {
  let component: ChequeslistComponent;
  let fixture: ComponentFixture<ChequeslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequeslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequeslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
