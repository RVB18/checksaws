import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateFieldsSubmitFormComponent } from './validate-fields-submit-form.component';

describe('ValidateFieldsSubmitFormComponent', () => {
  let component: ValidateFieldsSubmitFormComponent;
  let fixture: ComponentFixture<ValidateFieldsSubmitFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateFieldsSubmitFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateFieldsSubmitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
