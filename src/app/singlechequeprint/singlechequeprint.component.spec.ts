import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglechequeprintComponent } from './singlechequeprint.component';

describe('SinglechequeprintComponent', () => {
  let component: SinglechequeprintComponent;
  let fixture: ComponentFixture<SinglechequeprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglechequeprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglechequeprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
