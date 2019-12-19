import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffOrdersQueueItemComponent } from './staff-orders-queue-item.component';

describe('StaffOrdersQueueItemComponent', () => {
  let component: StaffOrdersQueueItemComponent;
  let fixture: ComponentFixture<StaffOrdersQueueItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffOrdersQueueItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffOrdersQueueItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
