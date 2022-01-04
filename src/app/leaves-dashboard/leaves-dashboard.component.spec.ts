import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesDashboardComponent } from './leaves-dashboard.component';

describe('LeavesDashboardComponent', () => {
  let component: LeavesDashboardComponent;
  let fixture: ComponentFixture<LeavesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeavesDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
