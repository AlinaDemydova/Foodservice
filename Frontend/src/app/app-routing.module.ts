import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ClientMenuComponent } from './client-menu/client-menu.component';
import { ClientMenuItemComponent } from './client-menu-item/client-menu-item.component';
import { ClientCartComponent } from './client-cart/client-cart.component';
import { StaffOrdersQueueComponent } from './staff-orders-queue/staff-orders-queue.component';
import { StaffOrdersQueueItemComponent } from './staff-orders-queue-item/staff-orders-queue-item.component';
import { AdminListMenuItemsComponent } from './admin-list-menu-items/admin-list-menu-items.component';
import { AdminListEmployeesComponent } from './admin-list-employees/admin-list-employees.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '',   redirectTo: 'client/menu', pathMatch: 'full' },
  { path: 'client/menu', component: ClientMenuComponent },
  { path: 'client/menu/:id', component: ClientMenuItemComponent },
  { path: 'client/cart', component: ClientCartComponent },
  { path: 'staff/ordersqueue', component: StaffOrdersQueueComponent},
  { path: 'staff/ordersqueue/:id', component: StaffOrdersQueueItemComponent},
  { path: 'admin/menulist', component: AdminListMenuItemsComponent },
  { path: 'admin/menulist/:id', component: AdminListMenuItemsComponent },
  { path: 'admin/employees', component: AdminListEmployeesComponent },
  { path: 'admin/employees/:id', component: AdminListEmployeesComponent },
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
