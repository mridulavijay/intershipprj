import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseapplyComponent } from './courseapply.component';

describe('CourseapplyComponent', () => {
  let component: CourseapplyComponent;
  let fixture: ComponentFixture<CourseapplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseapplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseapplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
