import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MattabledeleteComponent } from './mattabledelete.component';

describe('MattabledeleteComponent', () => {
  let component: MattabledeleteComponent;
  let fixture: ComponentFixture<MattabledeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MattabledeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MattabledeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
