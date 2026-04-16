import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSprint } from './add-sprint';

describe('AddSprint', () => {
  let component: AddSprint;
  let fixture: ComponentFixture<AddSprint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSprint]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSprint);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
