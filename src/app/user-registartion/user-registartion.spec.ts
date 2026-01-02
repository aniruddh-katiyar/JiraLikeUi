import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegistartion } from './user-registartion';

describe('UserRegistartion', () => {
  let component: UserRegistartion;
  let fixture: ComponentFixture<UserRegistartion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRegistartion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRegistartion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
