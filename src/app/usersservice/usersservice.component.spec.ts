import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersserviceComponent } from './usersservice.component';

describe('UsersserviceComponent', () => {
  let component: UsersserviceComponent;
  let fixture: ComponentFixture<UsersserviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersserviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
