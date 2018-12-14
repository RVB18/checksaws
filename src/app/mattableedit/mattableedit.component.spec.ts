import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MattableeditComponent } from './mattableedit.component';

describe('MattableeditComponent', () => {
  let component: MattableeditComponent;
  let fixture: ComponentFixture<MattableeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MattableeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MattableeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
