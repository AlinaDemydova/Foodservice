import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListMenuItemsComponent } from './admin-list-menu-items.component';

describe('AdminListMenuItemsComponent', () => {
  let component: AdminListMenuItemsComponent;
  let fixture: ComponentFixture<AdminListMenuItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListMenuItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListMenuItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
