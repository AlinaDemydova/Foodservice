import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffOrdersQueueComponent } from './staff-orders-queue.component';

describe('StaffOrdersQueueComponent', () => {
  let component: StaffOrdersQueueComponent;
  let fixture: ComponentFixture<StaffOrdersQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffOrdersQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffOrdersQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
