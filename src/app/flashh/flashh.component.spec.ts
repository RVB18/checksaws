import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashhComponent } from './flashh.component';

describe('FlashhComponent', () => {
  let component: FlashhComponent;
  let fixture: ComponentFixture<FlashhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
