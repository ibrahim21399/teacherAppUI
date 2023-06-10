import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedStudentsComponent } from './blocked-students.component';

describe('BlockedStudentsComponent', () => {
  let component: BlockedStudentsComponent;
  let fixture: ComponentFixture<BlockedStudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockedStudentsComponent]
    });
    fixture = TestBed.createComponent(BlockedStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
