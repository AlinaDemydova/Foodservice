import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientMenuComponent } from './client-menu/client-menu.component';
import { ClientMenuItemComponent } from './client-menu-item/client-menu-item.component';
import { ClientCartComponent } from './client-cart/client-cart.component';
import { StaffOrdersQueueComponent } from './staff-orders-queue/staff-orders-queue.component';
import { StaffOrdersQueueItemComponent } from './staff-orders-queue-item/staff-orders-queue-item.component';
import { AdminListMenuItemsComponent } from './admin-list-menu-items/admin-list-menu-items.component';
import { AdminListEmployeesComponent } from './admin-list-employees/admin-list-employees.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartService } from './services/cart.service';
import { OrderService } from './services/order.service';
import { DatePipe } from '@angular/common';
import { CustomFormsModule } from 'ng2-validation';
import { LoginComponent } from './login/login.component';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatMenuModule,
  MatIconModule,
  MatBadgeModule,
  MatRadioModule,
  MatCheckboxModule
 } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ClientMenuComponent,
    ClientMenuItemComponent,
    ClientCartComponent,
    StaffOrdersQueueComponent,
    StaffOrdersQueueItemComponent,
    AdminListMenuItemsComponent,
    AdminListEmployeesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatMenuModule,
    MatIconModule,
    MatBadgeModule,
    MatRadioModule,
    MatCheckboxModule,
    HttpClientModule,
    CustomFormsModule
  ],
  providers: [
    CartService,
    OrderService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
