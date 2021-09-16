import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentapplicationComponent } from './studentapplication.component';

describe('StudentapplicationComponent', () => {
  let component: StudentapplicationComponent;
  let fixture: ComponentFixture<StudentapplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentapplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
